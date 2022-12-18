pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract mygovtoken is ERC20 {
    address owner;

    uint256 maxTokens;

    uint256 totalFaucets;
    mapping(address => bool) givenFaucets;
    mapping(address => uint256) votingPower;
    mapping(address => address) delegetee;
    mapping(address => uint256) total_delegators;

    uint256 nonReservedBalance;

    constructor(uint256 maxTokenss)
        ERC20("MyGov", "MGV")
    {
        //requires solidity 5
        owner = address(this);
        maxTokens = maxTokenss - 1 ;
        ERC20._mint(owner,1);
    }

    function faucet() public {
        require(totalFaucets < maxTokens, "Maximum number of tokens reached.");
        require(!(givenFaucets[msg.sender]), "You already got your faucet!.");
        //TODO: change this back to 5
        // ERC20._transfer(owner, msg.sender, 1);
        ERC20._mint(msg.sender,1);


        givenFaucets[msg.sender] = true;
        votingPower[msg.sender] = 1;
        totalFaucets += 1;
    }

    function donateEther() public payable {
        nonReservedBalance += msg.value;
    }

    function donateMyGovToken(uint256 amount) public {
        ERC20._transfer(msg.sender, owner, amount);
    }
    function cancelDelegation() public{
        if(votingPower[msg.sender] != 0){
            return;
        }
        address current_delegetee = delegetee[msg.sender];
        if(current_delegetee != address(0)){
            while(votingPower[current_delegetee] == 0){
                current_delegetee = delegetee[current_delegetee];
            }
        }
        votingPower[current_delegetee] -= total_delegators[msg.sender] + 1;
        votingPower[msg.sender] = total_delegators[msg.sender] + 1;
        delegetee[msg.sender] = address(0);
    }

    function delegateVoteTo(address memberaddr, uint256 projectid) public {
        require(balanceOf(memberaddr) > 0, "You cannot delegate votes to a non member");
        cancelDelegation();
        delegetee[msg.sender] = memberaddr;
        address current_delegetee = delegetee[memberaddr];
        if(current_delegetee != address(0)){
            while(votingPower[current_delegetee] == 0){
                current_delegetee = delegetee[current_delegetee];
                
            }
        memberaddr = current_delegetee;
        }
        votingPower[memberaddr] += votingPower[msg.sender];
        total_delegators[memberaddr] += 1;
        votingPower[msg.sender] = 0;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
    function getVotes(address member) public view returns (uint256) {
        return votingPower[member];
    }


 

    function _mint(address to, uint256 amount)
        internal
        override(ERC20)
    {
        ERC20._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20)
    {
        super._burn(account, amount);
    }
    
    //sending all the balance equals to sending all the voting power too
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        if(balanceOf(from) == amount){
            delegateVoteTo(to, 0);
        }
     
        ERC20._transfer(from, to, amount);
    }

    //even if allowance is spent, spender cannot use all tokens of the owner
    function _spendAllowance(
        address Allowner,
        address spender,
        uint256 amount
    ) internal override(ERC20) {
        require(
            amount == ERC20.balanceOf(Allowner),
            "You cannot use all tokens of another member"
        );

        ERC20._spendAllowance(Allowner, spender, amount);
    }
}
