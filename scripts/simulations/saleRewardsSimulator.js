class RewardedSaleParticipant {
   /**
    * @param {number} qty_purchased - Quantity of tokens purchased by the participant
    * @param {number} balance       - Quantity of tokens the participant is currently holding
    */
   constructor( qty_purchased, balance ) {
      this.purchased     = qty_purchased;
      this.balance       = balance;
      this.balance_ratio = Math.min( this.balance / this.purchased, 1.0 ); // capped at 1.0
      this.base_reward   = 0; // Initial reward before any adjustments
      this.reward        = 0; // Final calculated reward
   }
}

class BasicSaleRewardsContract {
   /**
    * @param {RewardedSaleParticipant[]} participants - List of participants in the token sale
    * @param {number} total_rewards                   - Total allocated tokens for rewards
    */
   constructor( participants = [], total_rewards = 0 ) {
      this.participants  = participants;
      this.total_rewards = total_rewards;
      // Calculate total tokens sold by summing up all purchased amounts
      this.total_sold    = participants.map( p => p.purchased ).reduce( ( a, b ) => a + b, 0 );
   }

   /**
    * Calculates and distributes rewards proportionally based on purchases.
    * Sets the `base_reward` and `reward` fields for each participant.
    */
   calculateRewards() {
      this.participants.forEach( p => {
         p.base_reward = ( p.purchased / this.total_sold ) * this.total_rewards;
         p.reward      = p.base_reward;
      } );
   }
}

class AdjustedRewardsContract extends BasicSaleRewardsContract {
   /**
    * @param {number} penalty_multiplier              - Severity of the penalty for low balance ratios
    */
   constructor( participants = [], total_rewards = 0, penalty_multiplier = 2 ) {
      super( participants, total_rewards );
      this.penalty_multiplier = penalty_multiplier;
   }

   /**
    * Calculates and adjusts rewards based on participants' balance ratios.
    * Applies a penalty severity exponent to reduce rewards for participants with lower balance ratios.
    * Ensures that the total distributed rewards match the total allocated rewards.
    */
   calculateRewards() {
      let total_adjusted_rewards = 0;

      // Step 1: Calculate individual adjusted rewards based on the balance ratio and severity
      this.participants.forEach( p => {
         let adjustment_factor = Math.pow( p.balance_ratio, this.penalty_multiplier );
         p.base_reward         = ( p.purchased / this.total_sold ) * this.total_rewards;
         p.reward              = p.base_reward * adjustment_factor;
         total_adjusted_rewards += p.reward; // Accumulate total adjusted rewards
      } );

      // Step 2: Calculate corrective factor to normalize rewards to match total allocated tokens
      let corrective_factor = this.total_rewards / total_adjusted_rewards;

      // Step 3: Apply corrective factor to all rewards
      this.participants.forEach( p => { p.reward = p.reward * corrective_factor; } );
   }
}