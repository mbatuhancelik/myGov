pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GOVToken is ERC20, ERC20Permit, ERC20Votes {
    address owner;
    mapping(address => bool) givenFaucets;

    uint256 projectCounter;
    mapping(uint256 => projectProposal) proposals ; //Proposal id => Proposal
    mapping(uint256 => bool) isFunded; //Project id => funded?
    

    struct projectProposal {
        string ipfshash;
        uint256 votedeadline;
        uint256[] paymentamounts;
        uint256[] payschedule;
        address proposer;
        uint256 id;
        address[] votedAddresses;
        mapping(address => bool) voteContent;
        mapping(address => bool) votedBefore;
    }

    uint256 surveyCounter;
    mapping(uint256 => survey) surveys;
    struct survey {
        string ipfshash;
        uint256 surveydeadline;
        uint256 numChoices;
        uint256 atmostchoice;
        uint256[] choices;
        address owner;
        uint256 id;
        uint256[] results; 
        uint256 numtaken;
        address[] votedAddresses;
        mapping(address => bool) voteContent;
        mapping(address => bool) votedBefore;
    }

     constructor(uint256 initialSupply)
        ERC20("MyGov", "MGV")
        ERC20Permit("MyGov")
    {
        //requires solidity 5
        owner = address(this);
        _mint(owner, initialSupply);
        surveyCounter = 0;
        projectCounter= 0;
    }

    function faucet() public {
        require(!(givenFaucets[msg.sender]));
        //TODO: change this back to 5
        ERC20._transfer(owner, msg.sender, 5);
        ERC20Votes.delegate(msg.sender);

        givenFaucets[msg.sender] = true;
    }

    function donateEther() public payable {}

    function donateMyGovToken(uint256 amount) public {
        ERC20._transfer(msg.sender, owner, amount);
    }

    function submitProjectProposal(
        string memory ipfshash,
        uint256 votedeadline,
        uint256[] memory paymentamounts,
        uint256[] memory payschedule
    ) public payable returns (uint256 projectid) {
        require(msg.value == 100000000000000000, "You must send 100000000000000000 wei");
        ERC20.transfer(owner, 5);

        proposals[projectCounter].ipfshash = ipfshash;
        proposals[projectCounter].votedeadline = votedeadline;
        proposals[projectCounter].paymentamounts = paymentamounts;
        proposals[projectCounter].payschedule = payschedule;
        proposals[projectCounter].proposer = msg.sender;
        proposals[projectCounter].id = projectCounter;

        projectCounter += 1;
        return proposals[projectCounter - 1].id;
    }
    function delegateVoteTo(address memberaddr, uint projectid) public {
        ERC20Votes.delegate(memberaddr);
    }


    function submitSurvey(
        string memory ipfshash,
        uint256 surveydeadline,
        uint256 numchoices,
        uint256 atmostchoice
    ) public payable returns (uint256 surveyid) {
        require(msg.value == 40000000000000000, "You must send 40000000000000000 wei");
        ERC20.transfer(owner, 2);

        surveys[surveyCounter].ipfshash = ipfshash;
        surveys[surveyCounter].surveydeadline = surveydeadline;
        surveys[surveyCounter].numChoices = numchoices;
        surveys[surveyCounter].atmostchoice = atmostchoice;
        surveys[surveyCounter].owner = msg.sender;
        surveys[surveyCounter].id = surveyCounter;

        surveyCounter += 1;
        return proposals[projectCounter - 1].id;
    }

    function voteForProjectProposal(uint projectid,bool choice) public{
        require(ERC20.balanceOf(msg.sender) > 0, "You must be a member to vote for project proposals.");
        if(!proposals[projectid].votedBefore[msg.sender]){
            proposals[projectid].votedBefore[msg.sender] = true;
            proposals[projectid].votedAddresses.push(msg.sender);
        }
        proposals[projectid].voteContent[msg.sender] = choice;

    }
    //these data structures must be cleared at each step
    function voteForProjectPayment(uint projectid,bool choice) public {
        require(ERC20.balanceOf(msg.sender) > 0, "You must be a member to vote for project payments.");
        if(!proposals[projectid].votedBefore[msg.sender]){
            proposals[projectid].votedBefore[msg.sender] = true;
            proposals[projectid].votedAddresses.push(msg.sender);
        }
        proposals[projectid].voteContent[msg.sender] = choice;
    }


    function  _delegate(address delegator, address delegatee)  override(ERC20Votes) internal{
        require(ERC20.balanceOf(delegatee) > 0, "You cannot delegate votes to a non member address.");
        ERC20Votes._delegate(delegator,  delegatee);
        super._transfer(owner, msg.sender, 1);
    }


    function takeSurvey(uint256 surveyid, uint256[] calldata choices) public {
        require(surveys[surveyid].surveydeadline > block.timestamp, "This survey has come to an end");
        require(ERC20.balanceOf(msg.sender) > 0, "You must be a member to take surveys.");
        require(choices.length <= surveys[surveyid].atmostchoice, "max choice limit exceeded");
        surveys[surveyid].numtaken += 1;
        //?   
    }

    function getSurveyResults(uint256 surveyid)
        public
        view
        returns (uint256 numtaken, uint256[] memory results)
    {
        return (surveys[surveyid].numtaken, surveys[surveyid].results);
    }

    function getSurveyInfo(uint256 surveyid) 
        public
        view
        returns (
            string memory ipfshash,
            uint256 surveydeadline,
            uint256 numchoices,
            uint256 atmostchoice
        )
    {
        return (
            surveys[surveyid].ipfshash,
            surveys[surveyid].surveydeadline,
            surveys[surveyid].numChoices,
            surveys[surveyid].atmostchoice
        );
    }

    function getSurveyOwner(uint256 surveyid)
        public
        view
        returns (address surveyowner)
    {
        return (surveys[surveyid].owner);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
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
        require(amount == ERC20.balanceOf(Allowner), "You cannot use all tokens of another member");

        ERC20._spendAllowance(Allowner, spender, amount);
    }
}
