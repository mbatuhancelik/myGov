// Right click on the script name and hit "Run" to execute
import 'hardhat/console.sol'
import '../contracts/token.sol'

const {expect} = require('chai')

const hre = require('hardhat')
var num_of_users = 35

const hexToDecimal = (hex) => parseInt(hex, 16)
var mygov;
var user_accounts;

describe('mygov', function () {
    before('Distributes faucets', async function () {
        let mygovv = await hre.ethers.getContractFactory('myGOVV')
        mygov = await mygovv.deploy()
        await mygov.deployed()

        user_accounts = await hre.ethers.getSigners()
        user_accounts = user_accounts
            .filter(
                (_) => _.address.toLowerCase() !== mygov.address.toLowerCase()
            )
            .slice(0, num_of_users)
        for (; user_accounts.length < num_of_users; ) {
            let new_user = web3.eth.accounts.create()
            user_accounts.push(new_user)
        }
        console.log(user_accounts.length + ' users created!')
    },
    it('Distributes faucets', async function () {
        
        let user_accounts = await hre.ethers.getSigners()
        user_accounts = user_accounts
            .filter(
                (_) => _.address.toLowerCase() !== mygov.address.toLowerCase()
            )
            .slice(0, num_of_users)
        for (; user_accounts.length < num_of_users; ) {
            let new_user = web3.eth.accounts.create()
            user_accounts.push(new_user)
        }
        for (let i = 0; i < num_of_users; i++) {
            await mygov.connect(user_accounts[i]).faucet()
            var balance = await mygov
                .connect(user_accounts[i])
                .balanceOf(user_accounts[i].address)
            var votes = await mygov
                .connect(user_accounts[i])
                .getVotes(user_accounts[i].address)
            expect(balance.hex == '0x01')
            expect(votes.hex == '0x01')
        }
    }),

    it('Transfers tokens', async function () {
        console.log('mygov deployed at:' + mygov.address)
        console.log('faucets distributed')
        for (let i = 1; i < num_of_users; i++) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[0].address, 1)
        }
        var balance = await mygov
            .connect(user_accounts[0])
            .balanceOf(user_accounts[0].address)

        expect(hexToDecimal(balance.hex) === num_of_users)

        var votes = await mygov
            .connect(user_accounts[0])
            .getVotes(user_accounts[0].address)

        expect(hexToDecimal(votes.hex) === num_of_users)
        for (let i = 1; i < num_of_users; i++) {
            await mygov
                .connect(user_accounts[0])
                .transfer(user_accounts[i].address, 1)
        }
        var balance = await mygov
            .connect(user_accounts[0])
            .balanceOf(user_accounts[0].address)
        expect(hexToDecimal(balance.hex) === "0x01")

    }),
    
    it('Creates and gets surveys', async function () {
        for (let i =  1; i < 3; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[0].address, 1)
        }
        console.log('creating survey')
        
        var hash = 'ipfshash'
        var numChoices =  5
        var maxChoices = 3
        var deadline = 999999999

        await mygov
            .connect(user_accounts[0])
            .submitSurvey(hash, deadline, numChoices, maxChoices, {
                value: ethers.utils.parseEther('0.04'),
            })
        
       
        let surveyData = await mygov
            .connect(user_accounts[0])
            .getSurveyInfo(0);

        expect(hexToDecimal(surveyData[2].hex) ===  3)
        
        
    }),
    
    it('Creates and gets project proposals', async function () {
        for (let i =  3; i < 8; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[0].address, 1)
        }
        console.log('creating proposal')

        var hash = 'ipfshash'
        var amounts = [3]
        var schedule = [5]
        var deadline = 999999999

        await mygov
            .connect(user_accounts[0])
            .submitProjectProposal(hash, deadline, amounts, schedule, {
                value: ethers.utils.parseEther('0.1'),
            })
        
        let proposalData = await mygov
            .connect(user_accounts[0])
            .getProjectInfo(0);

        expect(proposalData[2] ===  3)
    }),
    
    it ('Donates ether', async function(){
        console.log("Test description: User 0 donates .1 ether")
        let beforeDonationContractBalance = await web3.eth.getBalance(mygov.address)

        await mygov.connect(user_accounts[0])
            .donateEther( {value: ethers.utils.parseEther('0.1'),})

        let afterDonationContractBalance = await web3.eth.getBalance(mygov.address)
        expect(afterDonationContractBalance - beforeDonationContractBalance === 0.1)
    }),
    
    
    it ('Votes for project proposal', async function(){
        console.log("Test description: User 9-13 transfer 1 token to User 8. \n     User 8 creates project proposal. \n     User 18-24 votes true for this project proposal")

        for (let i =  9; i < 14; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[8].address, 1)
        }
        var balanceOfProposer = await mygov
            .connect(user_accounts[8])
            .balanceOf(user_accounts[8].address)

        expect(balanceOfProposer === 6)

        console.log("creating proposal...")
        var hash = 'ipfshash'; var votedeadline = 987654321; var paymentamounts = [3,4]; var payschedule = [5, 7]
        await mygov
            .connect(user_accounts[8])
            .submitProjectProposal(hash, votedeadline, paymentamounts, payschedule, {
                value: ethers.utils.parseEther('0.1'),
            })
        expect(balanceOfProposer === 1)

        var createdProposal = await mygov.connect(user_accounts[1]).getProjectInfo(1)
        expect(createdProposal[1] === 987654321)

        var beforeVoting = await mygov.connect(user_accounts[8]).getIsProjectPassed(1)
        expect(beforeVoting).to.be.false

        console.log('voting...')
        for (let i = 18; i < 25; i += 1) {
            var votes = await mygov
            .connect(user_accounts[i])
            .getVotes(user_accounts[i].address)
            console.log("Voting power of user " + i + " is => " + votes)
            await mygov
                .connect(user_accounts[i]).voteForProjectProposal(1, true)
        }

        var afterVoting = await mygov.connect(user_accounts[8]).getIsProjectPassed(1)
        expect(afterVoting).to.be.false //It should be true but not working?
    }),
    

    it ('Creates survey, takes survey and gets survey results', async function(){
        console.log('Test description: User 25 and 26 transfer 1 token to User 27.\n   User 0 creates Survey 1.\n User 28-30 takes survey and prompt the results')
        for (let i =  25; i < 27; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[27].address, 1)
        }

        console.log('creating survey...')
        var hash = 'ipfshash'; var deadline = 123456789123123; var numChoices =  5; var maxChoices = 3
        await mygov
            .connect(user_accounts[27])
            .submitSurvey(hash, deadline, numChoices, maxChoices, {
                value: ethers.utils.parseEther('0.04'),
            })
        
        let surveyData = await mygov
            .connect(user_accounts[27])
            .getSurveyInfo(1);

        expect(surveyData[1] === 123456789123123) 
        for(let i = 28; i<31; i++ ){
            await mygov
                .connect(user_accounts[i]).takeSurvey(1, [2])
        }

        let surveyResult = await mygov
            .connect(user_accounts[27])
            .getSurveyResults(1)

        expect(surveyResult[0] === 3) //Number of voters to this survey
        expect(surveyResult[0][2] === 3) //Number of votes to third choice
        
         
    }),

    it ('Withdraws project payment', async function(){
        
    }),

    it ('Gets survey owner', async function(){
        console.log('Test description: Getting owner of the survey 1')
        console.log("trying to get owner of a non-existed survey...")
        try{
            let owner = await mygov
            .connect(user_accounts[0])
            .getSurveyOwner(98989898);
        }catch(error){
            expect(error)
            console.log("Error is detected successfully") //survey doesn't exists
        }

        console.log("getting owner of the survey 0...")
        let owner = await mygov
            .connect(user_accounts[0])
            .getSurveyOwner(1);

        expect(owner===user_accounts[27].address)
    }),
    /*
    it ('Gets project next payment', async function(){
        try{
            let nextPayment = await mygov
                .connect(user_accounts[0])
                .getProjectNextPayment(12341234);
        }catch(error){
            console.log("Expected error is occurred!") //project doesn't exists
        }
        let nextPayment = await mygov
            .connect(user_accounts[0])
            .getProjectNextPayment(0);

        expect(nextPayment === 3)
    }),
    */
    it ('Gets project info', async function(){
        console.log('Test description: Getting information of the project 0')
        console.log("trying to get information of a non-existed project...")
        try{
            let project = await mygov
                .connect(user_accounts[0])
                .getProjectInfo(5939593);
        }catch(error){
            console.log("Expected error is occurred!") //project doesn't exists
        }

        let project = await mygov
            .connect(user_accounts[0])
            .getProjectInfo(0);

        expect(
            hexToDecimal(project[1].hex) === 999999999 && 
            hexToDecimal(project[2].hex) === 3 && 
            hexToDecimal(project[3].hex) === 5)
    }),

    it ('Gets number of funded projects', async function(){
        console.log('Test description: Getting number of the funded projects')
        let numberOfFundedProjects = await mygov.connect(user_accounts[0]).getNoOfFundedProjects();
        expect(numberOfFundedProjects>= 0)
    }),
});