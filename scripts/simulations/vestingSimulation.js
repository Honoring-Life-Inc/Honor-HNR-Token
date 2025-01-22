// Example Usage
const vesting = new VestingContract( {
   Q_total   : 1000,            // Total tokens promised
   T_start   : Date.now(),      // Start date (now)
   T_cliff   : 3600 * 24 * 30,  // Cliff period: 30 days
   T_vesting : 3600 * 24 * 365, // Vesting period: 1 year
   T_freq    : 3600 * 24 * 30   // Monthly releases
} );

console.log( vesting.getVestedAmount( 1700000000 + 3600 * 24 * 60 ) ); // Tokens vested after 60 days
vesting.triggerChangeOfContractOwner(); // Releases all tokens