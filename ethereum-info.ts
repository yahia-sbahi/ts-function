import { createAlchemyWeb3, AlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";

// Define the USDT contract address and ABI
const USDT_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const USDT_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Create a contract object
const web3: AlchemyWeb3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/3PliT9gqAm8SyLvfubebuLCUO3qnbi-4"
);
const usdt = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT);

// Define the address you want to query
const address = "0x3D55CCb2a943d88D39dd2E62DAf767C69fD0179F";

// Get USDT balance and decimals
export const getUSDTBalance = async () => {
  try {
    // Call the balanceOf function
    const balance = await usdt.methods.balanceOf(address).call();

    // Call the decimals function
    const decimals = await usdt.methods.decimals().call();

    // Convert the balance from wei to USDT
    const balanceInUsdt = balance / 10 ** decimals;

    // Return the result
    return { address, balance: balanceInUsdt, decimals };
  } catch (error) {
    console.error("Error fetching USDT balance:", error.message);
    throw error;
  }
};

// Get the latest block number
export const getLatestBlockNumber = async () => {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    return blockNumber;
  } catch (error) {
    console.error("Error fetching latest block number:", error.message);
    throw error;
  }
};

// Example usage
(async () => {
  try {
    const usdtBalance = await getUSDTBalance();
    console.log(
      `USDT Balance of ${usdtBalance.address}: ${usdtBalance.balance} USDT`
    );

    const latestBlockNumber = await getLatestBlockNumber();
    console.log("Latest Block Number:", latestBlockNumber);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
