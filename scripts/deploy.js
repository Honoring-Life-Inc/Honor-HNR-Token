const hre = require( "hardhat" );
const { ethers } = hre;

async function main() {
   // Get the deployer's account
   const [ deployer ] = await ethers.getSigners();
   console.log( "Deploying contract with the account:", deployer.address );

   const balance = await ethers.provider.getBalance( deployer.address );
   console.log( "Deployer balance:", ethers.formatEther( balance ), "ZIL");

   const gasPrice = ethers.parseUnits( "5000", "gwei" );
   const gasLimit = 5000000n;

   const HNRToken = await ethers.getContractFactory( "HNRToken" );
   console.log( "Contract factory initialized." );

   // Deploy the contract
   console.log( "Deploying HNRToken contract..." );
   const hnrToken = await HNRToken.deploy(); // No constructor arguments needed

   // Wait for the contract to be deployed
   await hnrToken.waitForDeployment();
   console.log( "HNRToken deployed to:", hnrToken.target );
}


main()
   .then( () => process.exit( 0 ) )
   .catch( ( error ) => {
      console.error( "Error deploying contract:", error );
      process.exit( 1 );
   } );