// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./FurchillToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TokenFactory
 * @dev Factory contract for deploying Furchill tokens with customizable parameters
 */
contract TokenFactory is Ownable, ReentrancyGuard {
    // Events
    event TokenCreated(
        address indexed token,
        address indexed owner,
        string name,
        string symbol,
        uint256 totalSupply,
        uint256 buyTax,
        uint256 sellTax
    );

    // State variables
    mapping(address => address[]) public userTokens;
    address[] public allTokens;
    uint256 public deploymentFee = 0.01 ether; // 0.01 ETH deployment fee
    uint256 public totalDeployments;

    // Constructor
    constructor() {
        // Set deployer as owner
    }

    /**
     * @dev Deploy a new token with specified parameters
     * @param name Token name
     * @param symbol Token symbol
     * @param totalSupply Total token supply
     * @param buyTax Buy tax in basis points (100 = 1%)
     * @param sellTax Sell tax in basis points (100 = 1%)
     * @param lpPercentage LP percentage in basis points (100 = 1%)
     * @param marketingWallet Marketing wallet address
     * @param marketingPercentage Marketing percentage in basis points
     * @param wallets Array of additional wallet addresses
     * @param percentages Array of percentages for additional wallets
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 buyTax,
        uint256 sellTax,
        uint256 lpPercentage,
        address marketingWallet,
        uint256 marketingPercentage,
        address[] memory wallets,
        uint256[] memory percentages
    ) external payable nonReentrant returns (address) {
        require(msg.value >= deploymentFee, "Insufficient deployment fee");
        require(buyTax <= 2500, "Buy tax cannot exceed 25%");
        require(sellTax <= 2500, "Sell tax cannot exceed 25%");
        require(lpPercentage >= 5000 && lpPercentage <= 9500, "LP percentage must be between 50% and 95%");
        require(marketingPercentage <= 1000, "Marketing percentage cannot exceed 10%");
        require(wallets.length == percentages.length, "Wallets and percentages arrays must match");

        // Calculate total percentage allocation
        uint256 totalAllocation = marketingPercentage;
        for (uint256 i = 0; i < percentages.length; i++) {
            require(percentages[i] <= 2000, "Individual wallet percentage cannot exceed 20%");
            totalAllocation += percentages[i];
        }
        require(totalAllocation <= 5000, "Total allocation cannot exceed 50%");

        // Deploy new token
        FurchillToken newToken = new FurchillToken(
            name,
            symbol,
            totalSupply,
            buyTax,
            sellTax,
            lpPercentage,
            marketingWallet,
            marketingPercentage,
            wallets,
            percentages,
            msg.sender
        );

        address tokenAddress = address(newToken);

        // Update state
        userTokens[msg.sender].push(tokenAddress);
        allTokens.push(tokenAddress);
        totalDeployments++;

        // Emit event
        emit TokenCreated(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            totalSupply,
            buyTax,
            sellTax
        );

        return tokenAddress;
    }

    /**
     * @dev Get all tokens deployed by a user
     * @param user User address
     * @return Array of token addresses
     */
    function getUserTokens(address user) external view returns (address[] memory) {
        return userTokens[user];
    }

    /**
     * @dev Get all deployed tokens
     * @return Array of all token addresses
     */
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }

    /**
     * @dev Get token count for a user
     * @param user User address
     * @return Number of tokens deployed by user
     */
    function getUserTokenCount(address user) external view returns (uint256) {
        return userTokens[user].length;
    }

    /**
     * @dev Get total number of deployed tokens
     * @return Total number of tokens
     */
    function getTotalTokenCount() external view returns (uint256) {
        return allTokens.length;
    }

    /**
     * @dev Update deployment fee (owner only)
     * @param newFee New deployment fee in wei
     */
    function setDeploymentFee(uint256 newFee) external onlyOwner {
        deploymentFee = newFee;
    }

    /**
     * @dev Withdraw collected fees (owner only)
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Emergency pause (owner only)
     */
    function pause() external onlyOwner {
        // This would require implementing Pausable from OpenZeppelin
        // For now, we'll just revert
        revert("Pause functionality not implemented");
    }

    /**
     * @dev Get deployment fee
     * @return Current deployment fee
     */
    function getDeploymentFee() external view returns (uint256) {
        return deploymentFee;
    }

    // Receive function to accept ETH
    receive() external payable {
        // Accept ETH payments
    }
}

