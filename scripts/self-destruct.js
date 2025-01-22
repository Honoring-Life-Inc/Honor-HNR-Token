// Import the Hardhat runtime environment
const hre = require("hardhat");
const { ethers } = hre; // Ensure ethers is directly available

async function main() {
   // Specify the deployed contract addresses
   const tokenContracts   = [];
   const burnAddress      = "0x000000000000000000000000000000000000dEaD";
   const blackholeAddress = "0x0000000000000000000000000000000000000000";

   // Get the signer (owner of the contract)
   const [ owner ] = await ethers.getSigners();

   for( const contractAddress of tokenContracts ) {
      try {
         // Attach the deployed contract
         const HNRToken = await ethers.getContractAt( "HNRToken", contractAddress );

         // Fetch total supply
         const totalSupply = await HNRToken.totalSupply();
         const decimals = await HNRToken.decimals();

         console.log( `Starting self-destruct process for contract: ${contractAddress}` );
         console.log( `Total Supply: ${ethers.utils.formatUnits(totalSupply, decimals)} tokens` );

         // Step 1: Transfer all tokens to the burn address
         console.log( "Burning all tokens..." );
         const burnTx = await HNRToken.transfer( burnAddress, totalSupply );
         await burnTx.wait();
         console.log( `Tokens sent to burn address (0x000...dEaD) for contract: ${contractAddress}` );

         // Step 2: Transfer contract ownership to the null address
         console.log( "Transferring ownership to the Blackhole..." );
         const transferOwnershipTx = await HNRToken.transferOwnership( blackholeAddress );
         await transferOwnershipTx.wait();
         console.log( `Ownership transferred to null address for contract: ${contractAddress}` );

         console.log( `Self-destruct process completed for contract: ${contractAddress}` );
      } catch (error) {
         console.error( `Error during self-destruct process for contract: ${contractAddress}`, error );
      }
   }
}

// Run the script and handle errors
main()
   .then( () => process.exit( 0 ) )
   .catch(( error ) => {
      console.error( "Error during script execution:", error );
      process.exit( 1 );
   } );
