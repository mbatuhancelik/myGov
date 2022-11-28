pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GOVToken is ERC20 {
    address owner;
    mapping(address => bool) givenFaucets;
    constructor(uint256 initialSupply) ERC20("MyGov", "MGV") {
        owner = msg.sender;
        _mint(owner, initialSupply * (10**18));
    }

    function Faucet() public {
        require(!(givenFaucets[msg.sender]));
        givenFaucets[msg.sender] = true;
        super._transfer(owner, msg.sender, 10**18);
    }
}
