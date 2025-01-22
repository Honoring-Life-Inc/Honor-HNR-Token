require( "@nomicfoundation/hardhat-toolbox" );

// OpenZeppelin v.5.2.0
module.exports = {
   solidity: {
     version  : "0.8.28",
     settings : {
       optimizer  : {
         enabled : true,
         runs    : 200,
       },
       // evmVersion : "cancun", // current
       // evmVersion : "shanghai",
       evmVersion : "paris", // the merge
     },
   },
   paths: {
       sources   : "./contracts", // Default: './contracts'
       tests     : "./test",      // Default: './test'
       cache     : "./cache",     // Default: './cache'
       artifacts : "./artifacts"  // Default: './artifacts'
   },
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
   sourcify: {
     enabled    : true,
     apiUrl     : "https://sourcify.dev/server",
     browserUrl : "https://repo.sourcify.dev",
   }
};