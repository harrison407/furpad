import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenFactory } from "../typechain-types";
import { FurchillToken } from "../typechain-types";

describe("TokenFactory", function () {
  let tokenFactory: TokenFactory;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    tokenFactory = await TokenFactory.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await tokenFactory.owner()).to.equal(owner.address);
    });

    it("Should have correct deployment fee", async function () {
      expect(await tokenFactory.deploymentFee()).to.equal(ethers.parseEther("0.01"));
    });
  });

  describe("Token Creation", function () {
    it("Should create a token with correct parameters", async function () {
      const tokenName = "Test Token";
      const tokenSymbol = "TEST";
      const totalSupply = ethers.parseEther("1000000");
      const buyTax = 500; // 5%
      const sellTax = 500; // 5%
      const lpPercentage = 8000; // 80%
      const marketingWallet = user1.address;
      const marketingPercentage = 200; // 2%
      const wallets: string[] = [];
      const percentages: number[] = [];

      const deploymentFee = await tokenFactory.deploymentFee();

      await expect(
        tokenFactory.connect(user2).createToken(
          tokenName,
          tokenSymbol,
          totalSupply,
          buyTax,
          sellTax,
          lpPercentage,
          marketingWallet,
          marketingPercentage,
          wallets,
          percentages,
          { value: deploymentFee }
        )
      ).to.emit(tokenFactory, "TokenCreated");

      const userTokens = await tokenFactory.getUserTokens(user2.address);
      expect(userTokens.length).to.equal(1);

      const tokenAddress = userTokens[0];
      const token = await ethers.getContractAt("FurchillToken", tokenAddress);

      expect(await token.name()).to.equal(tokenName);
      expect(await token.symbol()).to.equal(tokenSymbol);
      expect(await token.buyTax()).to.equal(buyTax);
      expect(await token.sellTax()).to.equal(sellTax);
      expect(await token.lpPercentage()).to.equal(lpPercentage);
      expect(await token.marketingWallet()).to.equal(marketingWallet);
      expect(await token.marketingPercentage()).to.equal(marketingPercentage);
    });

    it("Should fail with insufficient deployment fee", async function () {
      const deploymentFee = await tokenFactory.deploymentFee();
      const insufficientFee = deploymentFee - ethers.parseEther("0.001");

      await expect(
        tokenFactory.connect(user1).createToken(
          "Test",
          "TEST",
          ethers.parseEther("1000000"),
          500,
          500,
          8000,
          user2.address,
          200,
          [],
          [],
          { value: insufficientFee }
        )
      ).to.be.revertedWith("Insufficient deployment fee");
    });

    it("Should fail with tax too high", async function () {
      const deploymentFee = await tokenFactory.deploymentFee();

      await expect(
        tokenFactory.connect(user1).createToken(
          "Test",
          "TEST",
          ethers.parseEther("1000000"),
          2600, // 26% - too high
          500,
          8000,
          user2.address,
          200,
          [],
          [],
          { value: deploymentFee }
        )
      ).to.be.revertedWith("Buy tax cannot exceed 25%");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to update deployment fee", async function () {
      const newFee = ethers.parseEther("0.02");
      await tokenFactory.setDeploymentFee(newFee);
      expect(await tokenFactory.deploymentFee()).to.equal(newFee);
    });

    it("Should not allow non-owner to update deployment fee", async function () {
      const newFee = ethers.parseEther("0.02");
      await expect(
        tokenFactory.connect(user1).setDeploymentFee(newFee)
      ).to.be.revertedWithCustomError(tokenFactory, "OwnableUnauthorizedAccount");
    });

    it("Should allow owner to withdraw fees", async function () {
      // First create a token to generate fees
      const deploymentFee = await tokenFactory.deploymentFee();
      await tokenFactory.connect(user1).createToken(
        "Test",
        "TEST",
        ethers.parseEther("1000000"),
        500,
        500,
        8000,
        user2.address,
        200,
        [],
        [],
        { value: deploymentFee }
      );

      const balanceBefore = await ethers.provider.getBalance(owner.address);
      await tokenFactory.withdrawFees();
      const balanceAfter = await ethers.provider.getBalance(owner.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });
  });
});

