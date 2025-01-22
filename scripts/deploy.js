const hre = require("hardhat"); // Import Hardhat Runtime Environment
const { ethers } = hre; // Extract ethers from Hardhat runtime
// console.log("ethers", ethers );

async function main() {

   const [ deployer ] = await ethers.getSigners();
   console.log( "Deploying contract with the account:", deployer.address );


   const balance = await ethers.provider.getBalance( deployer.address );
   console.log( "Deployer balance:", ethers.formatEther( balance ), "ZIL" );

   // Set the minimum gas price required by the network
   //  const minimumGasPrice = ethers.BigNumber.from( "4761904761904" ); // Minimum gas price in wei
   const minimumGasPrice = ethers.parseUnits( "5000", "gwei" ); // Minimum gas price in gwei
   console.log( "Gas price (wei):", minimumGasPrice.toString() );

   const HNRToken = await ethers.getContractFactory( "HNRToken" );
   console.log( "Contract factory initialized." );


   // Deploy the contract
   const tx = await HNRToken.getDeployTransaction(); // Get deployment transaction
   console.log( "Deployment transaction created:", tx );

   const txResponse = await deployer.sendTransaction( tx );
   console.log( "Deployment transaction sent. Waiting for confirmation..." );
   const receipt = await txResponse.wait(); // Wait for transaction confirmation
   console.log( "Transaction confirmed:", receipt );

   console.log( "HNRToken deployed to:", receipt.contractAddress );
}

main()
   .then( () => process.exit( 0 ) )
   .catch( ( error ) => {
      console.error( error );
      process.exit( 1 );
} );