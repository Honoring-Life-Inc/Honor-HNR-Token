class VestingContract {
   /**
    * Constructor for VestingContract
    * @param {Object} params - Configuration parameters
    * @param {number} params.Q_total   - Total tokens promised to the beneficiary
    * @param {number} params.T_start   - Start date of the cliff period (Unix Epoch)
    * @param {number} params.T_cliff   - Cliff period duration in seconds
    * @param {number} params.T_vesting - Vesting period duration in seconds
    * @param {number} params.T_freq    - Duration of each release frequency interval in seconds
    */
   constructor( { Q_total, T_start, T_cliff, T_vesting, T_freq } ) {
      if( T_freq <= 0 ) {
         throw new Error( 'Release Frequency must be greater than zero.' );
      }
      if( T_cliff < 0 || T_vesting < 0 ) {
         throw new Error( 'Cliff and Vesting Periods cannot be negative.' );
      }
      if( Q_total <= 0 ) {
         throw new Error( 'Promised Amount must be greater than zero.' );
      }

      this.Q_total   = Q_total;
      this.T_start   = T_start;
      this.T_cliff   = T_cliff;
      this.T_vesting = T_vesting;
      this.T_freq    = T_freq;
   }

   // Total number of steps in the vesting period
   get N_steps() { return this.T_vesting / this.T_freq; }

   // The number of tokens released at each step
   get Q_step() { return this.Q_total / this.N_steps; }

   /**
    * Calculate the vested amount at a given timestamp
    * @param {number} t Timestamp (Unix Epoch)
    */
   getVestedAmount( t ) {
      let cliff_end   = this.T_start + this.T_cliff;
      let vesting_end = cliff_end + this.T_vesting;

      if( t < cliff_end ) {
         // Before the cliff ends, no tokens are vested
         return 0;
      } else if( t >= cliff_end && t < vesting_end ) {
         // During the vesting period, calculate vested tokens
         return Math.floor( ( t - this.T_start ) / this.T_freq ) * this.Q_step;
      } else if( t >= vesting_end ) {
         // After the vesting period, all tokens are vested
         return this.Q_total;
      }
      return 0;
   }

   /**
    * Trigger a change of contract ownership event
    * Releases all unvested tokens immediately
    */
   triggerChangeOfContractOwner() {
      this.T_cliff   = 0;
      this.T_vesting = 0;
      console.log( 'Affector: Change of Contract Owner - All tokens released.' );
      return this;
   }
}