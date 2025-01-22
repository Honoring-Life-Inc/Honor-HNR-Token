// Example Usage
const participants = [
   new RewardedSaleParticipant(  300,  300 ), // Fully holding
   new RewardedSaleParticipant( 1500, 1800 ), // Bought more later
   new RewardedSaleParticipant(  500,  400 ), // Sold some
   new RewardedSaleParticipant(  200,  100 ), // Sold half
   new RewardedSaleParticipant(  800,  400 ), // Sold half
   new RewardedSaleParticipant(  800,  800 ), // Fully holding
];

const rewardsContract = new AdjustedRewardsContract( participants, 500, 2 ); // Total rewards = 10,000, severity = 2
rewardsContract.calculateRewards();

console.log( "Final Rewards Distribution:" );
rewardsContract.participants.forEach( ( p, index ) => {
   console.log( `Participant ${index + 1}: ${p.balance_ratio.toFixed(2)} b:p | ${p.base_reward.toFixed(2)} tokens | ${p.reward.toFixed(2)} tokens` );
} );