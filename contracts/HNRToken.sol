// contracts/HNRToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HNRToken is ERC20, Ownable {
    string public logoCID;

    constructor() ERC20("Honor", "HNR") {
        uint256 initialSupply = 1_000_000_000_000 * (10 ** decimals());
        logoCID = "bafkreif25gd6pjixd77od3tamgc5gfodrowmknbex6yqe525v3onqxtewq";
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Allows the owner to update the logo CID.
     * @param newCID The new logo CID.
     */
    function updateLogoCID(string memory newCID) external onlyOwner {
        logoCID = newCID;
    }
}