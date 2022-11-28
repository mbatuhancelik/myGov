pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GOVToken is ERC20 {
    address owner;
    mapping(address => bool) givenFaucets;
    constructor(uint256 initialSupply) ERC20("MyGov", "MGV") {
        owner = msg.sender;
        _mint(owner, initialSupply );
    }

    function Faucet() public {
        require(!(givenFaucets[msg.sender]));
        givenFaucets[msg.sender] = true;
        super._transfer(owner, msg.sender, 1);
    }

    function delegateVoteTo(address memberaddr, uint projectId) public {

    }
    function donateEther() payable public{

    }
    function decimals() public view virtual override returns (uint8){
        return 0;
    }
}
