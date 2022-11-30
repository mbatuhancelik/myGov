pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GOVToken is ERC20 {
    address owner;
    mapping(address => bool) givenFaucets;

    struct projectProposal{
        string ipfshash;
        uint votedeadline;
        uint[] paymentamounts;
        uint[] payschedule;
        
        address proposer;
        uint id;

    }
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
    function donateMyGovToken(uint amount) public{
        super._transfer(msg.sender, owner, amount);
    }
    
    function submitProjectProposal() 
    public returns (uint projectid) 
    {
        super._transfer(msg.sender, owner, 5);
        return 0;

    }
    
    
    function decimals() public view virtual override returns (uint8){
        return 0;
    }

}
