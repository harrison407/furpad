'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img 
              src="/furchill_logo.png" 
              alt="Furchill Logo" 
              className="h-8 w-auto mr-2"
            />
            <div className="text-2xl font-bold text-gradient">
              Furchill
            </div>
            <span className="ml-2 text-sm text-gray-300">Launchpad</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="https://furchill.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              Website
            </a>
            <a href="#launchpad" className="text-gray-300 hover:text-white transition-colors">
              Launchpad
            </a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </a>
            <ConnectButton />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col space-y-4">
              <a href="https://furchill.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                Website
              </a>
              <a href="#launchpad" className="text-gray-300 hover:text-white transition-colors">
                Launchpad
              </a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">
                Docs
              </a>
              <div className="pt-2">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}
