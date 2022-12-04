pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract mygovtoken is ERC20, ERC20Permit, ERC20Votes {
    address owner;

    uint256 maxTokens;

    uint256 totalFaucets;
    mapping(address => bool) givenFaucets;

    uint256 nonReservedBalance;

    constructor(uint256 maxTokens)
        ERC20("MyGov", "MGV")
        ERC20Permit("MyGov")
    {
        //requires solidity 5
        owner = address(this);
        maxTokens = maxTokens;
    }

    function faucet() public {
        require(totalFaucets < maxTokens, "Maximum number of tokens reached.");
        require(!(givenFaucets[msg.sender]), "You already got your faucet!.");
        //TODO: change this back to 5
        // ERC20._transfer(owner, msg.sender, 1);
        ERC20._mint(msg.sender,1);
        ERC20Votes._delegate(msg.sender,msg.sender);


        givenFaucets[msg.sender] = true;
        totalFaucets += 1;
    }

    function donateEther() public payable {
        nonReservedBalance += msg.value;
    }

    function donateMyGovToken(uint256 amount) public {
        ERC20._transfer(msg.sender, owner, amount);
    }

    function delegateVoteTo(address memberaddr, uint256 projectid) public {
        ERC20Votes.delegate(memberaddr);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function _delegate(address delegator, address delegatee)
        internal
        override(ERC20Votes)
    {
        require(
            ERC20.balanceOf(delegatee) > 0,
            "You cannot delegate votes to a non member address."
        );
        ERC20Votes._delegate(delegator, delegatee);
        super._transfer(owner, msg.sender, 1);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        if (amount == ERC20.balanceOf(from)) {
            ERC20Votes.delegate(to);
        }
        ERC20._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        ERC20Votes._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }

    //sending all the balance equals to sending all the voting power too
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        if (amount == ERC20.balanceOf(from)) {
            ERC20Votes.delegate(to);
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
