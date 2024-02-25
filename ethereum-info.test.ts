// import { getLastBlockNumber, getUsdtBalance } from "./ethereum-info";

// describe("Ethereum Info", () => {
//   test("Get Last Block Number", async () => {
//     const blockNumber = await getLastBlockNumber();
//     expect(blockNumber).toBeGreaterThan(0);
//   });

//   test("Get USDT Balance", async () => {
//     const address = "0x00000000219ab540356cbb839cbe05303d7705fa"; // Replace with the desired Ethereum address
//     const balance = await getUsdtBalance(address);
//     expect(balance).toMatch(/^\d+$/); // Expects a positive integer as balance
//   });
// });

import { getUSDTBalance, getLatestBlockNumber } from "./ethereum-info"; // Adjust the path accordingly

describe("Ethereum Functions", () => {
  describe("getUSDTBalance", () => {
    it("should fetch USDT balance for a given address", async () => {
      const result = await getUSDTBalance();
      expect(result).toHaveProperty("address");
      expect(result).toHaveProperty("balance");
      expect(result).toHaveProperty("decimals");
    });
  });

  describe("getLatestBlockNumber", () => {
    it("should fetch the latest block number", async () => {
      const result = await getLatestBlockNumber();
      console.log("Latest Block Number:", result); // This is fine within a test

      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});
