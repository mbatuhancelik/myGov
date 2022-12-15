// Right click on the script name and hit "Run" to execute
import 'hardhat/console.sol'
import '../contracts/token.sol'

const {expect} = require('chai')
const timeMachine = require('ganache-time-traveler');

const hre = require('hardhat')
var num_of_users = 25

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
        var numChoices =  3
        var maxChoices = 5
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
       
        // string memory ipfshash,
        // uint256 votedeadline,
        // uint256[] memory paymentamounts,
        // uint256[] memory payschedule
            var hash = 'ipfshash'
            var amounts = [ 3]
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

            expect(hexToDecimal(proposalData[2].hex) ===  3)
        
        
    }),
    
    it('donates MyGov tokens', async function () {
         var initialBalance = await mygov
            .connect(user_accounts[0])
            .balanceOf(user_accounts[0].address)
        console.log("found initial balance...")
        await mygov
                .connect(user_accounts[8])
                .transfer(user_accounts[0].address, 1)
        console.log("donating...")
         await mygov
                .connect(user_accounts[0]).donateMyGovToken(1)
         var balance = await mygov
            .connect(user_accounts[0])
            .balanceOf(user_accounts[0].address)
        expect(hexToDecimal(balance.hex-initialBalance.hex) === "0x1")

    }),

    it('votes for project payment', async function() {
        console.log("vote for...")
        await mygov.connect(user_accounts[9]).voteForProjectPayment(0,false)
        var vote = await mygov.getVoteContent(0,user_accounts[9].address)
        expect(vote === false)
        console.log("vote against...")
        await mygov.connect(user_accounts[10]).voteForProjectPayment(0,true)
        vote = await mygov.getVoteContent(0,user_accounts[10].address)
        expect(vote === true)
    }),

    it('reserves project grant', async function() {
        console.log("reserve")
       
        await mygov.connect(user_accounts[0]).reserveProjectGrant(333).catch(err => {
          expect(
            err.message,
            'This project does not exists'
          )
            })
       
        await mygov.connect(user_accounts[1]).reserveProjectGrant(0).catch(err => {
          expect(
            err.message,
            'Only the project owner can reserve project grant'
          )
            })
       
       
        var state = await mygov.connect(user_accounts[0]).getIsProjectPassed(0)
        console.log(state)
        expect( state == true)
        
    }),
    
    it('retrieves survey info', async function(){
          let surveyData = await mygov
            .connect(user_accounts[0])
            .getSurveyInfo(0);

        expect(surveyData[0] === "ipfshash")
        expect(hexToDecimal(surveyData[1].hex) ===  999999999)
        expect(hexToDecimal(surveyData[2].hex) ===  3)
        expect(hexToDecimal(surveyData[3].hex) ===  5)
    }),

    it('retrieves project owner', async function(){
        try{
            let owner = await mygov
            .connect(user_accounts[0])
            .getProjectOwner(98989898);
        }catch(error){
            console.log("is errror")
                //project does not exist
        }
        let owner = await mygov
            .connect(user_accounts[0])
            .getProjectOwner(0);

        expect(owner===user_accounts[0].address)
    }),

    it('retrieves total proposal count', async function(){
        for (let i =  9; i < 15; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[0].address, 1)
        }
        for (let i =  16; i < 24; i += 1) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[0].address, 1)
        }
         console.log('creating proposals')
            await mygov
                .connect(user_accounts[0])
                .submitProjectProposal('secondProposal',999999999,[5],[3], {
                    value: ethers.utils.parseEther('0.1'),
                })
                
            await mygov
                .connect(user_accounts[0])
                .submitProjectProposal('thirdProposal',999999999,[1],[1], {
                    value: ethers.utils.parseEther('0.1'),
                })

        const count = await mygov.connect(user_accounts[0]).getNoOfProjectProposals()
        expect(count === 3)
    }),
    
//this test might not be working, memory leak?
    it('retrieves Ether Received By Project', async function(){
        console.log("retrieves initial")
            var initAmnt = await mygov.connect(user_accounts[0]).getEtherReceivedByProject(1)
            expect(initAmnt === 0)
        console.log("retrieves after")
            await timeMachine.advanceTime(5555555555)
            //need to pass time here
            await mygov.connect(user_accounts[0]).reserveProjectGrant(1)
            await mygov.connect(user_accounts[0]).withdrawProjectPayment(1)
            var amnt = await mygov.connect(user_accounts[0]).getEtherReceivedByProject(1)
            expect(amnt === 5)

    }),

     it('checks if project is funded', async function() {
        var nonFunded = await mygov.connect(user_accounts[0]).getIsProjectFunded(0)
        var funded = await mygov.connect(user_accounts[0]).getIsProjectFunded(1)
        expect(nonFunded === false)
        expect(funded === true)
    }),
   
    
})