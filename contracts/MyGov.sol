pragma solidity ^0.8.0;

import "./mygovtoken.sol";


contract myGOVV is mygovtoken  {

    uint256 projectCounter; //for project id 
    mapping(uint256 => projectProposal)public  proposals; //Proposal id => Proposal
    mapping(uint256 => bool) isFunded; //Project id => funded?
    uint256 fundedProjects;
    mapping(address => uint256) public votedContent;

    mapping(uint256 => projectProposal) projects;
    struct projectProposal {
        string ipfshash; 
        uint256 votedeadline;
        uint256[] paymentamounts;
        uint256[] payschedule;
        address proposer;
        bool isFunded;
        bool isReserved;
        uint256 requiredFund;
        uint256 id;
        uint256 currentPhase;
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
        mapping(address => bool) votedBefore;
    }

    constructor()
        mygovtoken(1e7)
    {
        surveyCounter = 0;
        projectCounter = 0;
        totalFaucets = 0;
        nonReservedBalance = 0;
    }


    function submitProjectProposal(
        string memory ipfshash,
        uint256 votedeadline,
        uint256[] memory paymentamounts,
        uint256[] memory payschedule
    ) public payable returns (uint256 projectid) {
        require(
            msg.value == 100000000000000000,
            "You must send 100000000000000000 wei"
        );
        ERC20.transfer(owner, 5);

        proposals[projectCounter].ipfshash = ipfshash;
        proposals[projectCounter].votedeadline = votedeadline;
        proposals[projectCounter].paymentamounts = paymentamounts;
        proposals[projectCounter].payschedule = payschedule;
        proposals[projectCounter].proposer = msg.sender;
        proposals[projectCounter].id = projectCounter;

        uint256 requiredBalance = 0;
        for (uint256 i = 0; i < paymentamounts.length; i++) {
            requiredBalance += paymentamounts[i];
        }
        proposals[projectCounter].requiredFund = requiredBalance;
        proposals[projectCounter].currentPhase = 0;

        projectCounter += 1;
        nonReservedBalance += msg.value;
        return proposals[projectCounter - 1].id;
    }

    function submitSurvey(
        string memory ipfshash,
        uint256 surveydeadline,
        uint256 numchoices,
        uint256 atmostchoice
    ) public payable returns (uint256 surveyid) {
        require(
            msg.value == 40000000000000000,
            "You must send 40000000000000000 wei"
        );
        ERC20.transfer(owner, 2);

        surveys[surveyCounter].ipfshash = ipfshash;
        surveys[surveyCounter].surveydeadline = surveydeadline;
        surveys[surveyCounter].numChoices = numchoices;
        surveys[surveyCounter].atmostchoice = atmostchoice;
        surveys[surveyCounter].results = new uint256[](numchoices);
        surveys[surveyCounter].owner = msg.sender;
        surveys[surveyCounter].id = surveyCounter;

        surveyCounter += 1;
        nonReservedBalance += msg.value;
        return surveys[surveyCounter - 1].id;
    }

    function voteForProjectProposal(uint256 projectid, bool choice) public {
        require(
            ERC20.balanceOf(msg.sender) > 0,
            "You must be a member to vote for project proposals."
        );
        if (!proposals[projectid].votedBefore[msg.sender]) {
            proposals[projectid].votedBefore[msg.sender] = true;
            proposals[projectid].votedAddresses.push(msg.sender);
        }
        proposals[projectid].voteContent[msg.sender] = choice;
    }

    //these data structures must be cleared at each step
    function voteForProjectPayment(uint256 projectid, bool choice) public {
        require(
            ERC20.balanceOf(msg.sender) > 0,
            "You must be a member to vote for project payments."
        );
        if (!proposals[projectid].votedBefore[msg.sender]) {
            proposals[projectid].votedBefore[msg.sender] = true;
            proposals[projectid].votedAddresses.push(msg.sender);
        }
        proposals[projectid].voteContent[msg.sender] = choice;
    }

    function clearProjectVotes(uint256 projectid) private {
        projectProposal storage project = proposals[projectid];
        for (uint256 i = 0; i < project.votedAddresses.length; i++) {
            project.votedBefore[project.votedAddresses[i]] = false;
            project.voteContent[project.votedAddresses[i]] = false;
        }
        delete project.votedAddresses;
    }

    function reserveProjectGrant(uint256 projectid) public {
        require(projectid < projectCounter, "This project does not exists");
        projectProposal storage project = proposals[projectid];
        require(!project.isReserved, "Fund is already reserved");
        require(
            project.votedeadline > block.timestamp,
            "This proposal has expired."
        );
        require(
            msg.sender == project.proposer,
            "Only the project owner can reserve project grant."
        );
        require(getIsProjectPassed(projectid), "This project has not passed.");
        require(
            project.requiredFund < nonReservedBalance,
            "MyGov currently does not have the financial power to support this project."
        );
        project.isFunded = true;
        fundedProjects += 1;
        project.currentPhase = 0;
        project.isReserved= true;
        nonReservedBalance -= project.requiredFund;
        clearProjectVotes(projectid);
    }

    function withdrawProjectPayment(uint256 projectid) public {
        require(projectid < projectCounter, "This project does not exists");
        projectProposal storage project = proposals[projectid];
        require(project.isFunded, "This project is not funded by the MyGov.");
        require(
            project.payschedule[project.currentPhase] < block.timestamp,
            "This payment has expired."
        );
        require(
            msg.sender == project.proposer,
            "Only the project owner can withdraw the project payment."
        );

        (bool sent, bytes memory data) = msg.sender.call{
            value: project.paymentamounts[project.currentPhase]
        }("");
        require(sent, "Failed to send Ether");
        project.currentPhase += 1;
        clearProjectVotes(projectid);
    }

    function getIsProjectPassed(uint256 projectid)
        public
        view
        returns (bool funded)
    {
        require(
            projectid < projectCounter,
            "There is no project with the given projct id"
        );
        projectProposal storage project = proposals[projectid];
        if(project.isFunded){
            return true;
        }
        uint256 yays;
        uint256 treshold = totalFaucets / 10;
        address voter;
        for (uint256 i = 0; i < 10000000; i++) {
            voter = project.votedAddresses[0];
            if (project.voteContent[voter]) {
                yays += votingPower[voter];
                if (yays > treshold) {
                    return true;
                }
            }
        }
        return false;
    }

    function takeSurvey(uint256 surveyid, uint256[] calldata choices) public {
        require(
            surveys[surveyid].surveydeadline > block.timestamp,
            "This survey has come to an end"
        );
        require(
            balanceOf(msg.sender) > 0,
            "Only members can use survey service."
        );
        require(
            choices.length <= surveys[surveyid].atmostchoice,
            "max choice limit exceeded"
        );
        require(
            !surveys[surveyid].votedBefore[msg.sender],
            "You already voted for this survey."
        );
        surveys[surveyid].numtaken += 1;
        for (uint256 i = 0; i < choices.length; i++) {
            require(
                choices[i] < surveys[surveyid].numChoices,
                "Invalid choice"
            );
            surveys[surveyid].results[choices[i]] += 1;
        }
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
    function getIsProjectFunded(uint projectid) public view
    returns(bool funded){
          require(
            projectid < projectCounter,
            "There is no project with the given projct id"
        );
        return proposals[projectid].isFunded;
    }

    function getProjectNextPayment(uint projectid) public view
    returns(uint next){
          require(
            projectid < projectCounter,
            "There is no project with the given projct id"
        );

          require(
            proposals[projectid].isFunded,
            "Project is not funded"
        );        
        return proposals[projectid].paymentamounts[proposals[projectid].currentPhase];
    }
function getProjectOwner(uint projectid) public view
    returns(address projectowner){
          require(
            projectid < projectCounter,
            "There is no project with the given projct id"
        );
       
        return proposals[projectid].proposer;
    }

    function getProjectInfo(uint activityid) public view returns(string memory ipfshash,
 uint votedeadline,uint [] memory paymentamounts, uint [] memory payschedule) {
     require(
            activityid < projectCounter,
            "There is no project with the given projct id"
        );

    return(
        proposals[activityid].ipfshash,
        proposals[activityid].votedeadline,
        proposals[activityid].paymentamounts,
        proposals[activityid].payschedule
    );
 }
 function getNoOfProjectProposals() public view returns(uint numproposals) {
     return projectCounter;
 }
 function getNoOfFundedProjects () public view returns(uint numfunded){
     return fundedProjects;
 }
 function getEtherReceivedByProject (uint projectid) public view returns(uint amount){
     uint256 res = 0;
     for(uint i = 0; i < proposals[projectid].currentPhase; i ++){
         res += proposals[projectid].paymentamounts[i];
     }
     return res;
 }
 function getNoOfSurveys() public view returns(uint numsurveys){
     return surveyCounter;
 }

function getVoteContent(uint projectid, address sender) public view returns (bool choice){
    return proposals[projectid].voteContent[sender];
}
}
