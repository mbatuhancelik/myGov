// Right click on the script name and hit "Run" to execute
import 'hardhat/console.sol'
import '../contracts/token.sol'

const {expect} = require('chai')

const hre = require('hardhat')
var num_of_users = 10

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
            .connect(user_accounts[ 0])
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

    it ('Donates ether', async function(){
        let beforeBalance = await mygov.connect(user_accounts[0].ethers)
        console.log('donating ether')
        await mygov.connect(user_accounts[0])
            .donateEther( {value: ethers.utils.parseEther('1'),})
        let afterBalance = await mygov.connect(user_accounts[0].ethers)

        expect(hexToDecimal(beforeBalance) - hexToDecimal(afterBalance) != 0)
    }),
    
    it ('Votes for project proposal', async function(){
        //var beforeFirstVoting = await mygov.connect(user_accounts[0]).getIsProjectPassed(0)
        //console.log('Before first reject vote for project proposal...\n Project is funded? ' + beforeFirstVoting)
        console.log('Voting...')
        await mygov
            .connect(user_accounts[8])
            .voteForProjectProposal(0, false)
            

        //var afterFirstVoting = await mygov.connect(user_accounts[0]).getIsProjectPassed(0)

        //console.log('After the first reject vote... \n Project is funded? '+ afterFirstVoting)
        console.log('Second voting...')
        for (let i = 9; i < 11; i += 1) {
        await mygov
            .connect(user_accounts[i]).voteForProjectProposal(0, true)
        }
        //var afterSecondVoting = await mygov.connect(user_accounts[0]).getIsProjectPassed(0)
        //console.log('After the second voting, two account accept project proposal... \n Project is funded? '+ afterSecondVoting )
        
        expect(afterFirstVoting === false & afterSecondVoting === true)

    }),


    it ('Takes survey and gets survey results', async function(){
        console.log('Starting taking survey and getting survey results...')
        let surveyData = await mygov
            .connect(user_accounts[0])
            .getSurveyInfo(0);
         console.log('  Survey 0 deadline is ' + surveyData[1] + ', number of choices is ' + surveyData[2] + ' and at most choice is ' + surveyData[3] + '!' )
        
        await mygov
            .connect(user_accounts[0]).takeSurvey(0, [10])
        
        expect("Invalid choice")
         
    }),

    it ('Withdraws project payment', async function(){
        
    }),

    it ('Gets survey owner', async function(){

    }),

    it ('Gets project next payment', async function(){

    }),

    it ('Gets project info', async function(){

    }),

    it ('Gets number of funded projects', async function(){

    }),

})
