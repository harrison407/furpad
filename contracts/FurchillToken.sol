// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title FurchillToken
 * @dev Customizable memecoin with configurable taxes and wallet distributions
 */
contract FurchillToken is ERC20, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    // Events
    event TaxUpdated(uint256 buyTax, uint256 sellTax);
    event MarketingWalletUpdated(address indexed oldWallet, address indexed newWallet);
    event WalletDistributionUpdated(address indexed wallet, uint256 percentage);
    event LPPercentageUpdated(uint256 oldPercentage, uint256 newPercentage);

    // State variables
    uint256 public buyTax;
    uint256 public sellTax;
    uint256 public lpPercentage;
    address public marketingWallet;
    uint256 public marketingPercentage;
    
    struct WalletDistribution {
        address wallet;
        uint256 percentage;
        bool exists;
    }
    
    mapping(address => WalletDistribution) public walletDistributions;
    address[] public distributionWallets;
    
    bool public tradingEnabled = false;
    mapping(address => bool) public isExcludedFromTax;
    
    // Constants
    uint256 private constant BASIS_POINTS = 10000;
    uint256 private constant MAX_TAX = 2500; // 25%
    uint256 private constant MIN_LP_PERCENTAGE = 5000; // 50%
    uint256 private constant MAX_LP_PERCENTAGE = 9500; // 95%

    // Constructor
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 _buyTax,
        uint256 _sellTax,
        uint256 _lpPercentage,
        address _marketingWallet,
        uint256 _marketingPercentage,
        address[] memory wallets,
        uint256[] memory percentages,
        address _owner
    ) ERC20(name, symbol) {
        require(_buyTax <= MAX_TAX, "Buy tax too high");
        require(_sellTax <= MAX_TAX, "Sell tax too high");
        require(_lpPercentage >= MIN_LP_PERCENTAGE && _lpPercentage <= MAX_LP_PERCENTAGE, "Invalid LP percentage");
        require(_marketingPercentage <= 1000, "Marketing percentage too high");
        require(wallets.length == percentages.length, "Arrays length mismatch");
        
        buyTax = _buyTax;
        sellTax = _sellTax;
        lpPercentage = _lpPercentage;
        marketingWallet = _marketingWallet;
        marketingPercentage = _marketingPercentage;
        
        // Set up wallet distributions
        for (uint256 i = 0; i < wallets.length; i++) {
            require(percentages[i] <= 2000, "Wallet percentage too high");
            walletDistributions[wallets[i]] = WalletDistribution({
                wallet: wallets[i],
                percentage: percentages[i],
                exists: true
            });
            distributionWallets.push(wallets[i]);
        }
        
        // Mint total supply to owner
        _mint(_owner, totalSupply);
        
        // Exclude owner and marketing wallet from taxes
        isExcludedFromTax[_owner] = true;
        isExcludedFromTax[_marketingWallet] = true;
        
        // Transfer ownership to the specified owner
        _transferOwnership(_owner);
    }

    /**
     * @dev Override transfer function to apply taxes
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        require(sender != address(0), "Transfer from zero address");
        require(recipient != address(0), "Transfer to zero address");
        require(amount > 0, "Transfer amount must be greater than zero");

        // Check if trading is enabled
        if (!tradingEnabled) {
            require(isExcludedFromTax[sender] || isExcludedFromTax[recipient], "Trading not enabled");
        }

        uint256 transferAmount = amount;
        
        // Apply taxes if not excluded
        if (!isExcludedFromTax[sender] && !isExcludedFromTax[recipient]) {
            uint256 taxAmount = 0;
            
            // Buy tax
            if (buyTax > 0 && recipient != address(0)) {
                taxAmount = amount.mul(buyTax).div(BASIS_POINTS);
            }
            // Sell tax
            else if (sellTax > 0 && sender != address(0)) {
                taxAmount = amount.mul(sellTax).div(BASIS_POINTS);
            }
            
            if (taxAmount > 0) {
                transferAmount = amount.sub(taxAmount);
                _distributeTax(taxAmount);
            }
        }

        super._transfer(sender, recipient, transferAmount);
    }

    /**
     * @dev Distribute tax to marketing wallet and LP
     */
    function _distributeTax(uint256 taxAmount) private {
        uint256 marketingAmount = taxAmount.mul(marketingPercentage).div(BASIS_POINTS);
        uint256 lpAmount = taxAmount.mul(lpPercentage).div(BASIS_POINTS);
        uint256 distributionAmount = taxAmount.sub(marketingAmount).sub(lpAmount);
        
        // Send to marketing wallet
        if (marketingAmount > 0 && marketingWallet != address(0)) {
            super._transfer(address(this), marketingWallet, marketingAmount);
        }
        
        // Send to LP (burn for now, can be modified for actual LP)
        if (lpAmount > 0) {
            _burn(address(this), lpAmount);
        }
        
        // Distribute to additional wallets
        if (distributionAmount > 0) {
            _distributeToWallets(distributionAmount);
        }
    }

    /**
     * @dev Distribute tokens to additional wallets
     */
    function _distributeToWallets(uint256 amount) private {
        uint256 totalPercentage = 0;
        
        // Calculate total percentage
        for (uint256 i = 0; i < distributionWallets.length; i++) {
            WalletDistribution storage dist = walletDistributions[distributionWallets[i]];
            if (dist.exists) {
                totalPercentage = totalPercentage.add(dist.percentage);
            }
        }
        
        // Distribute proportionally
        for (uint256 i = 0; i < distributionWallets.length; i++) {
            WalletDistribution storage dist = walletDistributions[distributionWallets[i]];
            if (dist.exists && dist.percentage > 0) {
                uint256 walletAmount = amount.mul(dist.percentage).div(totalPercentage);
                if (walletAmount > 0) {
                    super._transfer(address(this), dist.wallet, walletAmount);
                }
            }
        }
    }

    /**
     * @dev Enable trading (owner only)
     */
    function enableTrading() external onlyOwner {
        tradingEnabled = true;
    }

    /**
     * @dev Disable trading (owner only)
     */
    function disableTrading() external onlyOwner {
        tradingEnabled = false;
    }

    /**
     * @dev Exclude address from taxes (owner only)
     */
    function excludeFromTax(address account) external onlyOwner {
        isExcludedFromTax[account] = true;
    }

    /**
     * @dev Include address in taxes (owner only)
     */
    function includeInTax(address account) external onlyOwner {
        isExcludedFromTax[account] = false;
    }

    /**
     * @dev Update taxes (owner only)
     */
    function updateTaxes(uint256 _buyTax, uint256 _sellTax) external onlyOwner {
        require(_buyTax <= MAX_TAX, "Buy tax too high");
        require(_sellTax <= MAX_TAX, "Sell tax too high");
        
        buyTax = _buyTax;
        sellTax = _sellTax;
        
        emit TaxUpdated(_buyTax, _sellTax);
    }

    /**
     * @dev Update marketing wallet (owner only)
     */
    function updateMarketingWallet(address _marketingWallet) external onlyOwner {
        require(_marketingWallet != address(0), "Invalid marketing wallet");
        
        address oldWallet = marketingWallet;
        marketingWallet = _marketingWallet;
        isExcludedFromTax[_marketingWallet] = true;
        
        emit MarketingWalletUpdated(oldWallet, _marketingWallet);
    }

    /**
     * @dev Update LP percentage (owner only)
     */
    function updateLPPercentage(uint256 _lpPercentage) external onlyOwner {
        require(_lpPercentage >= MIN_LP_PERCENTAGE && _lpPercentage <= MAX_LP_PERCENTAGE, "Invalid LP percentage");
        
        uint256 oldPercentage = lpPercentage;
        lpPercentage = _lpPercentage;
        
        emit LPPercentageUpdated(oldPercentage, _lpPercentage);
    }

    /**
     * @dev Add wallet distribution (owner only)
     */
    function addWalletDistribution(address wallet, uint256 percentage) external onlyOwner {
        require(wallet != address(0), "Invalid wallet address");
        require(percentage <= 2000, "Percentage too high");
        require(!walletDistributions[wallet].exists, "Wallet already exists");
        
        walletDistributions[wallet] = WalletDistribution({
            wallet: wallet,
            percentage: percentage,
            exists: true
        });
        distributionWallets.push(wallet);
        
        emit WalletDistributionUpdated(wallet, percentage);
    }

    /**
     * @dev Remove wallet distribution (owner only)
     */
    function removeWalletDistribution(address wallet) external onlyOwner {
        require(walletDistributions[wallet].exists, "Wallet does not exist");
        
        delete walletDistributions[wallet];
        
        // Remove from array
        for (uint256 i = 0; i < distributionWallets.length; i++) {
            if (distributionWallets[i] == wallet) {
                distributionWallets[i] = distributionWallets[distributionWallets.length - 1];
                distributionWallets.pop();
                break;
            }
        }
        
        emit WalletDistributionUpdated(wallet, 0);
    }

    /**
     * @dev Get all distribution wallets
     */
    function getDistributionWallets() external view returns (address[] memory) {
        return distributionWallets;
    }

    /**
     * @dev Get wallet distribution info
     */
    function getWalletDistribution(address wallet) external view returns (uint256 percentage, bool exists) {
        WalletDistribution storage dist = walletDistributions[wallet];
        return (dist.percentage, dist.exists);
    }

    /**
     * @dev Emergency withdraw tokens (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = balanceOf(address(this));
        if (balance > 0) {
            _transfer(address(this), owner(), balance);
        }
    }
}

