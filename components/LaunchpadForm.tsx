'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Plus, Trash2, Settings, Wallet, TrendingUp } from 'lucide-react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { sepolia, goerli } from 'wagmi/chains'
import toast from 'react-hot-toast'
import { TokenDeployer } from './TokenDeployer'

// Form validation schema
const launchpadSchema = z.object({
  tokenName: z.string().min(1, 'Token name is required'),
  tokenSymbol: z.string().min(1, 'Token symbol is required').max(10, 'Symbol must be 10 characters or less'),
  totalSupply: z.string().min(1, 'Total supply is required'),
  buyTax: z.number().min(0).max(25, 'Buy tax cannot exceed 25%'),
  sellTax: z.number().min(0).max(25, 'Sell tax cannot exceed 25%'),
  lpPercentage: z.number().min(50).max(95, 'LP percentage must be between 50% and 95%'),
  marketingWallet: z.string().min(42, 'Invalid wallet address').max(42, 'Invalid wallet address'),
  marketingPercentage: z.number().min(0).max(10, 'Marketing percentage cannot exceed 10%'),
  wallets: z.array(z.object({
    address: z.string().min(42, 'Invalid wallet address').max(42, 'Invalid wallet address'),
    percentage: z.number().min(0).max(20, 'Percentage cannot exceed 20%'),
  })).optional(),
})

type LaunchpadFormData = z.infer<typeof launchpadSchema>

export function LaunchpadForm() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedToken, setDeployedToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<LaunchpadFormData>({
    resolver: zodResolver(launchpadSchema),
    defaultValues: {
      tokenName: '',
      tokenSymbol: '',
      totalSupply: '1000000000',
      buyTax: 5,
      sellTax: 5,
      lpPercentage: 80,
      marketingWallet: '',
      marketingPercentage: 2,
      wallets: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'wallets',
  })

  const watchedValues = watch()

  const onSubmit = async (data: LaunchpadFormData) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (chain?.id !== sepolia.id && chain?.id !== goerli.id) {
      toast.error('Please switch to Sepolia or Goerli testnet')
      return
    }

    setIsDeploying(true)
    try {
      // This will be handled by the TokenDeployer component
      console.log('Form data:', data)
      toast.success('Token deployment initiated!')
    } catch (error) {
      console.error('Deployment error:', error)
      toast.error('Failed to deploy token')
    } finally {
      setIsDeploying(false)
    }
  }

  const addWallet = () => {
    append({ address: '', percentage: 0 })
  }

  const removeWallet = (index: number) => {
    remove(index)
  }

  const calculateRemainingPercentage = () => {
    const marketingPerc = watchedValues.marketingPercentage || 0
    const walletsPerc = (watchedValues.wallets || []).reduce((sum, wallet) => sum + (wallet.percentage || 0), 0)
    return Math.max(0, 100 - marketingPerc - walletsPerc)
  }

  return (
    <div className="space-y-8">
      {/* Network Check */}
      {isConnected && chain && chain.id !== sepolia.id && chain.id !== goerli.id && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-400 font-semibold">Wrong Network</h3>
              <p className="text-yellow-300 text-sm">Please switch to Sepolia or Goerli testnet</p>
            </div>
            <button
              onClick={() => switchNetwork?.(sepolia.id)}
              className="btn-secondary"
            >
              Switch to Sepolia
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Token Information */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 mr-2 text-primary-400" />
            <h3 className="text-lg font-semibold">Basic Token Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Token Name</label>
              <input
                {...register('tokenName')}
                className="input-field w-full"
                placeholder="e.g., Furchill"
              />
              {errors.tokenName && (
                <p className="text-red-400 text-sm mt-1">{errors.tokenName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Token Symbol</label>
              <input
                {...register('tokenSymbol')}
                className="input-field w-full"
                placeholder="e.g., FUR"
              />
              {errors.tokenSymbol && (
                <p className="text-red-400 text-sm mt-1">{errors.tokenSymbol.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Supply</label>
              <input
                {...register('totalSupply')}
                className="input-field w-full"
                placeholder="1000000000"
              />
              {errors.totalSupply && (
                <p className="text-red-400 text-sm mt-1">{errors.totalSupply.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tax Configuration */}
        <div className="card">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-secondary-400" />
            <h3 className="text-lg font-semibold">Tax Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buy Tax (%)</label>
              <input
                {...register('buyTax', { valueAsNumber: true })}
                type="number"
                min="0"
                max="25"
                step="0.1"
                className="input-field w-full"
              />
              {errors.buyTax && (
                <p className="text-red-400 text-sm mt-1">{errors.buyTax.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sell Tax (%)</label>
              <input
                {...register('sellTax', { valueAsNumber: true })}
                type="number"
                min="0"
                max="25"
                step="0.1"
                className="input-field w-full"
              />
              {errors.sellTax && (
                <p className="text-red-400 text-sm mt-1">{errors.sellTax.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LP Percentage (%)</label>
              <input
                {...register('lpPercentage', { valueAsNumber: true })}
                type="number"
                min="50"
                max="95"
                step="1"
                className="input-field w-full"
              />
              {errors.lpPercentage && (
                <p className="text-red-400 text-sm mt-1">{errors.lpPercentage.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Marketing Wallet */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Wallet className="w-5 h-5 mr-2 text-primary-400" />
            <h3 className="text-lg font-semibold">Marketing Wallet</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Marketing Wallet Address</label>
              <input
                {...register('marketingWallet')}
                className="input-field w-full"
                placeholder="0x..."
              />
              {errors.marketingWallet && (
                <p className="text-red-400 text-sm mt-1">{errors.marketingWallet.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Marketing Percentage (%)</label>
              <input
                {...register('marketingPercentage', { valueAsNumber: true })}
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input-field w-full"
              />
              {errors.marketingPercentage && (
                <p className="text-red-400 text-sm mt-1">{errors.marketingPercentage.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Wallets */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-secondary-400" />
              <h3 className="text-lg font-semibold">Additional Wallets</h3>
            </div>
            <button
              type="button"
              onClick={addWallet}
              className="btn-secondary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Wallet Address</label>
                <input
                  {...register(`wallets.${index}.address`)}
                  className="input-field w-full"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Percentage (%)</label>
                <input
                  {...register(`wallets.${index}.percentage`, { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  className="input-field w-full"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeWallet(index)}
                  className="btn-secondary bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Percentage Summary */}
          <div className="mt-4 p-4 bg-dark-700/50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm text-dark-300">Total Allocated:</span>
              <span className={`font-semibold ${calculateRemainingPercentage() < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {100 - calculateRemainingPercentage()}%
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-dark-300">Remaining:</span>
              <span className={`font-semibold ${calculateRemainingPercentage() < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {calculateRemainingPercentage()}%
              </span>
            </div>
          </div>
        </div>

        {/* Deploy Button */}
        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={isDeploying || !isConnected}
            whileHover={{ scale: isDeploying ? 1 : 1.05 }}
            whileTap={{ scale: isDeploying ? 1 : 0.95 }}
            className={`btn-primary text-lg px-8 py-4 ${isDeploying || !isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDeploying ? 'Deploying...' : 'Deploy Token'}
          </motion.button>
        </div>
      </form>

      {/* Token Deployer Component */}
      {isConnected && (
        <TokenDeployer
          isDeploying={isDeploying}
          setIsDeploying={setIsDeploying}
          deployedToken={deployedToken}
          setDeployedToken={setDeployedToken}
        />
      )}
    </div>
  )
}
