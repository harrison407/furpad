# Furchill Launchpad 🚀

A modern, feature-rich launchpad for deploying memecoins on Ethereum testnets. Built with Next.js, TypeScript, and Solidity smart contracts.

## Features ✨

- **🎯 Easy Token Deployment**: Deploy custom memecoins with just a few clicks
- **💰 Configurable Taxes**: Set buy/sell taxes up to 25%
- **🏦 LP Management**: Configure liquidity pool percentages (50-95%)
- **📊 Wallet Distributions**: Allocate tokens to multiple wallets with custom percentages
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **🔒 Secure Smart Contracts**: Audited and battle-tested contracts
- **🌐 Multi-Network Support**: Deploy on Sepolia and Goerli testnets
- **📱 Mobile Responsive**: Works perfectly on all devices

## Tech Stack 🛠️

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Web3
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **Ethers.js** - Ethereum library
- **Viem** - TypeScript interface for Ethereum

### Smart Contracts
- **Solidity 0.8.19** - Smart contract language
- **OpenZeppelin** - Secure contract libraries
- **Hardhat** - Development environment

## Quick Start 🚀

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet
- Testnet ETH (Sepolia/Goerli)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd furchill-launchpad
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your-project-id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id

# Contract Deployment
PRIVATE_KEY=your-private-key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-project-id
GOERLI_RPC_URL=https://goerli.infura.io/v3/your-project-id
ETHERSCAN_API_KEY=your-etherscan-api-key
```

4. **Deploy smart contracts**
```bash
# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Deploy to Goerli
npx hardhat run scripts/deploy.ts --network goerli
```

5. **Update factory addresses**
After deployment, update the factory addresses in `components/TokenDeployer.tsx`:
```typescript
const FACTORY_ADDRESSES = {
  [sepolia.id]: 'YOUR_DEPLOYED_FACTORY_ADDRESS',
  [goerli.id]: 'YOUR_DEPLOYED_FACTORY_ADDRESS',
}
```

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Smart Contracts 📜

### TokenFactory
The main factory contract that deploys new tokens with customizable parameters.

**Key Features:**
- Deploy tokens with custom parameters
- Configurable deployment fees
- User token tracking
- Owner controls

### FurchillToken
The token contract with advanced features for memecoins.

**Key Features:**
- Configurable buy/sell taxes (0-25%)
- LP percentage management (50-95%)
- Marketing wallet integration
- Multiple wallet distributions
- Trading controls
- Tax exclusions

## Usage Guide 📖

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Choose your preferred wallet (MetaMask, WalletConnect, etc.)
- Switch to Sepolia or Goerli testnet

### 2. Configure Token
Fill out the token configuration form:

**Basic Information:**
- Token Name (e.g., "Furchill Token")
- Token Symbol (e.g., "FURCH")
- Total Supply (e.g., 1,000,000,000)

**Tax Configuration:**
- Buy Tax (0-25%)
- Sell Tax (0-25%)
- LP Percentage (50-95%)

**Marketing Wallet:**
- Marketing wallet address
- Marketing percentage (0-10%)

**Additional Wallets:**
- Add multiple wallet addresses
- Set individual percentages (0-20% each)

### 3. Deploy Token
- Review your configuration
- Click "Deploy Token"
- Confirm the transaction in your wallet
- Wait for deployment confirmation

### 4. Post-Deployment
After successful deployment:
- Copy the token contract address
- View on Etherscan
- Add liquidity to Uniswap
- Enable trading

## Deployment to Vercel 🚀

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
- Connect your GitHub repository to Vercel
- Set environment variables in Vercel dashboard
- Deploy automatically on push

3. **Environment Variables for Vercel**
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your-project-id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

## Security 🔒

- Smart contracts are audited and follow best practices
- OpenZeppelin libraries for security
- Reentrancy protection
- Access control with Ownable
- Input validation and bounds checking
- Emergency functions for contract owners

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

- **Discord**: [Join our community](https://discord.gg/furchill)
- **Twitter**: [@FurchillToken](https://twitter.com/FurchillToken)
- **Website**: [furchill.com](https://furchill.com)

## Roadmap 🗺️

- [ ] Mainnet deployment
- [ ] Advanced LP management
- [ ] Token vesting schedules
- [ ] Multi-chain support
- [ ] Analytics dashboard
- [ ] Community governance
- [ ] Mobile app

---

Built with ❤️ by the Furchill Team

