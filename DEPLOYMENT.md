# Furchill Launchpad - Deployment Guide 🚀

This guide will walk you through deploying the Furchill Launchpad to production.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- MetaMask or other Web3 wallet
- Testnet ETH (Sepolia/Goerli)
- Vercel account (for frontend deployment)

## Step 1: Local Setup

1. **Clone and install dependencies**
```bash
git clone <your-repo-url>
cd furchill-launchpad
npm install
```

2. **Set up environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID

# Contract Deployment
PRIVATE_KEY=YOUR_PRIVATE_KEY
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

## Step 2: Deploy Smart Contracts

1. **Compile contracts**
```bash
npx hardhat compile
```

2. **Deploy to Sepolia testnet**
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

3. **Deploy to Goerli testnet**
```bash
npx hardhat run scripts/deploy.ts --network goerli
```

4. **Save the deployed addresses**
Note down the factory addresses from the deployment output.

## Step 3: Update Frontend Configuration

1. **Update factory addresses**
Edit `components/TokenDeployer.tsx`:
```typescript
const FACTORY_ADDRESSES = {
  [sepolia.id]: 'YOUR_SEPOLIA_FACTORY_ADDRESS',
  [goerli.id]: 'YOUR_GOERLI_FACTORY_ADDRESS',
}
```

2. **Test locally**
```bash
npm run dev
```

Visit http://localhost:3000 and test the functionality.

## Step 4: Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure the project settings

3. **Set environment variables in Vercel**
In your Vercel project dashboard, add these environment variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
```

4. **Deploy**
Click "Deploy" in Vercel. Your app will be live at `https://your-project.vercel.app`

## Step 5: Post-Deployment

1. **Test the deployed application**
- Connect your wallet
- Switch to Sepolia testnet
- Try deploying a test token

2. **Verify contracts on Etherscan**
```bash
npx hardhat verify --network sepolia YOUR_FACTORY_ADDRESS
```

3. **Update documentation**
- Update README.md with your deployed URLs
- Add contract addresses to documentation

## Step 6: Mainnet Deployment (When Ready)

1. **Update environment variables**
```env
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

2. **Deploy contracts to mainnet**
```bash
npx hardhat run scripts/deploy.ts --network mainnet
```

3. **Update factory addresses for mainnet**

4. **Deploy frontend with mainnet configuration**

## Troubleshooting

### Common Issues

1. **"Insufficient funds" error**
   - Make sure you have testnet ETH in your wallet
   - Get Sepolia ETH from [faucet](https://sepoliafaucet.com/)

2. **"Invalid private key" error**
   - Check your `.env.local` file
   - Ensure private key starts with `0x`

3. **"Contract deployment failed"**
   - Check gas limits
   - Verify network connection
   - Ensure sufficient ETH for deployment

4. **"Wallet connection issues"**
   - Check WalletConnect project ID
   - Verify RPC URL is correct
   - Test with different wallets

### Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Test with a fresh wallet
4. Check network connectivity

## Security Checklist

- [ ] Private keys are not committed to Git
- [ ] Environment variables are properly set
- [ ] Contracts are verified on Etherscan
- [ ] Frontend is deployed with correct configuration
- [ ] All tests pass
- [ ] Security audit completed (recommended)

## Next Steps

After successful deployment:
1. Set up monitoring and analytics
2. Implement rate limiting
3. Add additional security measures
4. Plan for mainnet launch
5. Set up community channels

---

**Need help?** Join our Discord or check the documentation at [furchill.com](https://furchill.com)

