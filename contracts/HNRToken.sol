// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { ERC20   } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract HNRToken is ERC20( "Honor", "HNR" ), Ownable( msg.sender ) {
    string public logoCid;

    event NewLogo( string cid );
    event DonationAppreciated( address indexed sender, uint256 value );
    event Received( address indexed sender, uint256 value );
    event Fallback( address indexed sender, uint256 value );

    error DonationFailed();
    error CIDTooLong();
    error NoCID();
    error SameCID();

    /**
     * @dev Build the token
    */
    constructor() payable {
        uint256 initialSupply = 1_000_000_000_000 * 1e18;
        logoCid = "bafkreif25gd6pjixd77od3tamgc5gfodrowmknbex6yqe525v3onqxtewq";
        _mint( msg.sender, initialSupply );
    }

    /**
     * @dev Thank the curator
    */
    function _donate() public payable {
        if( msg.value == 0 ) { revert DonationFailed(); }
        emit DonationAppreciated( msg.sender, msg.value );
        ( bool success, ) = payable( owner() ).call{ value: msg.value }( "" );
        if( !success ) { revert DonationFailed(); }
    }
    receive()  external payable {
        emit Received( msg.sender, msg.value );
        _donate();
    }
    fallback() external payable {
        emit Fallback( msg.sender, msg.value );
        _donate();
    }

    /**
     * @dev Allows the owner to update the logo CID.
     * @param newCid The new logo CID.
     */
    function updateLogoCID( string memory newCid ) external payable onlyOwner {
        bytes memory newLogo = bytes( newCid );
        if( newLogo.length <= 46 ) {
            revert CIDTooLong();
        }

        if( newLogo.length == 0 ) {
            revert NoCID();
        }

        bytes memory oldLogo = bytes( logoCid );
        // Check if the new message is the same as the current message
        if( keccak256( newLogo ) == keccak256( oldLogo ) ) {
            revert SameCID();
        }

        logoCid = newCid;
        emit NewLogo( newCid );
    }

}