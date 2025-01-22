require( "@nomicfoundation/hardhat-toolbox" );

// OpenZeppelin v.4.9.6
module.exports = {
   solidity: "0.8.0",
   networks: {
      zilliqaTestnet : {
         url      : "https://dev-api.zilliqa.com", // Zilliqa EVM Testnet RPC
         chainId  : 33101,                         // Zilliqa EVM Testnet Chain ID
         accounts : [ "<PRIVATE_KEY>" ],           // Replace with your private key
      },
      zilliqaMainnet : {
         url      : "https://api.zilliqa.com",     // Zilliqa EVM Mainnet RPC
         chainId  : 32769,                         // Zilliqa EVM Mainnet Chain ID
         accounts : [ "<PRIVATE_KEY>" ],           // Replace with your private key
      },
   },
};