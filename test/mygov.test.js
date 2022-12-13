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
        await mygov
            .connect(user_accounts[num_of_users -1])
            .transfer(user_accounts[0].address, 1)
        
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
        for (let i =  1; i < num_of_users - 2; i += 1) {
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
        
        
    })

})
