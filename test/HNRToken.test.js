const { expect } = require( "chai"    );
const { ethers } = require( "hardhat" );

describe( "HNRToken", function() {
  it( "Should deploy and mint the total supply to the owner", async function() {
    const [owner]  = await ethers.getSigners();
    const HNRToken = await ethers.getContractFactory( "HNRToken" );
    const hnrToken = await HNRToken.deploy();

    await hnrToken.deployed();
    expect( await hnrToken.balanceOf( owner.address ) ).to.equal(
      ethers.utils.parseUnits( "1000000000000", 18 )
    );
  } );

  it( "Should allow the owner to update the logo CID", async function() {
    const [owner]  = await ethers.getSigners();
    const HNRToken = await ethers.getContractFactory( "HNRToken" );
    const hnrToken = await HNRToken.deploy();

    await hnrToken.deployed();
    await hnrToken.updateLogoCID( "newCID" );
    expect( await hnrToken.logoCID() ).to.equal( "newCID" );
  } );
} );