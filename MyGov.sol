pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GOVToken is ERC20 {
    address owner;
    mapping(address => bool) givenFaucets;
    mapping(uint256 => Survey) surveys; //Survey id => Survey
    mapping(uint256 => projectProposal) proposals ; //Proposal id => Proposal
    mapping(uint256 => bool) isFunded; //Project id => funded?
    mapping(address => bool) members;  //check member status for ii & iii

    struct projectProposal {
        string ipfshash;
        uint256 votedeadline;
        uint256[] paymentamounts;
        uint256[] payschedule;
        address proposer;
        uint256 id;
    }

    struct Survey {
        uint256 surveyid;
        address surveyowner;
        uint256 surveydeadline;
        uint256 numchoices;
        uint256 atmostchoice;
        uint256[] results; 
        uint256 numtaken;
    }

    constructor(uint256 initialSupply) ERC20("MyGov", "MGV") {
        owner = msg.sender;
        _mint(owner, initialSupply);
    }

    function Faucet() public {
        require(!(givenFaucets[msg.sender]));
        givenFaucets[msg.sender] = true;
        super._transfer(owner, msg.sender, 1);
        members[msg.sender] = true;
    }

    function delegateVoteTo(address memberaddr, uint256 projectId) public {}

    function donateEther() public payable {}

    function donateMyGovToken(uint256 amount) public {
        super._transfer(msg.sender, owner, amount);
    }

    function submitProjectProposal() public returns (uint256 projectid) {
        super._transfer(msg.sender, owner, 5);
        return 0;
    }
    
    function takeSurvey(uint256 surveyid, uint256[] calldata choices) public {
        //require(surveys[surveyid].surveydeadline > now, "This survey has come to an end");
        require(members[msg.sender], "Only members can use survey service.");
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

    function getSurveyInfo(uint256 surveyid) //missing: hash
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
            "",
            surveys[surveyid].surveydeadline,
            surveys[surveyid].numchoices,
            surveys[surveyid].atmostchoice
        );
    }

    function getSurveyOwner(uint256 surveyid)
        public
        view
        returns (address surveyowner)
    {
        return (surveys[surveyid].surveyowner);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}
