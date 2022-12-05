// Right click on the script name and hit "Run" to execute
import 'hardhat/console.sol'
import '../contracts/token.sol'

const {expect} = require('chai')

const hre = require('hardhat')
var num_of_users = 10

const hexToDecimal = (hex) => parseInt(hex, 16)

describe('mygov', function () {
    // it('Distributes faucets', async function () {
    //     const mygovv = await hre.ethers.getContractFactory('myGOVV')
    //     const mygov = await mygovv.deploy()
    //     await mygov.deployed()

    //     let user_accounts = await hre.ethers.getSigners()
    //     user_accounts = user_accounts
    //         .filter(
    //             (_) => _.address.toLowerCase() !== mygov.address.toLowerCase()
    //         )
    //         .slice(0, num_of_users)
    //     for (; user_accounts.length < num_of_users; ) {
    //         let new_user = web3.eth.accounts.create()
    //         user_accounts.push(new_user)
    //     }
    //     for (let i = 0; i < num_of_users; i++) {
    //         console.log(user_accounts[i].address)
    //         await mygov.connect(user_accounts[i]).faucet()
    //         var balance = await mygov
    //             .connect(user_accounts[i])
    //             .balanceOf(user_accounts[i].address)
    //         var votes = await mygov
    //             .connect(user_accounts[i])
    //             .getVotes(user_accounts[i].address)
    //         expect(balance.hex == '0x01')
    //         expect(votes.hex == '0x01')
    //     }
    // }),

    // it('Transfers tokens', async function () {
    //     const mygovv = await hre.ethers.getContractFactory('myGOVV')
    //     const mygov = await mygovv.deploy()
    //     await mygov.deployed()
    //     console.log('mygov deployed at:' + mygov.address)

    //     let user_accounts = await hre.ethers.getSigners()
    //     user_accounts = user_accounts
    //         .filter(
    //             (_) => _.address.toLowerCase() !== mygov.address.toLowerCase()
    //         )
    //         .slice(0, num_of_users)
    //     for (; user_accounts.length < num_of_users; ) {
    //         let new_user = web3.eth.accounts.create()
    //         user_accounts.push(new_user)
    //     }
    //     console.log(user_accounts.length + ' users created!')
    //     for (let i = 0; i < num_of_users; i++) {
    //         await mygov.connect(user_accounts[i]).faucet()
    //     }
    //     console.log('faucets distributed')
    //     for (let i = 1; i < num_of_users; i++) {
    //         await mygov
    //             .connect(user_accounts[i])
    //             .transfer(user_accounts[0].address, 1)
    //     }
    //     var balance = await mygov
    //         .connect(user_accounts[0])
    //         .balanceOf(user_accounts[0].address)

    //     expect(hexToDecimal(balance.hex) === num_of_users)

    //     var votes = await mygov
    //         .connect(user_accounts[0])
    //         .getVotes(user_accounts[0].address)

    //     expect(hexToDecimal(votes.hex) === num_of_users)
    // })

    // it('Creates and gets survey', async function () {
    //     const mygovv = await hre.ethers.getContractFactory('myGOVV')
    //     const mygov = await mygovv.deploy()
    //     await mygov.deployed()
    //     console.log('mygov deployed at:' + mygov.address)

    //     let user_accounts = await hre.ethers.getSigners()
    //     user_accounts = user_accounts
    //         .filter(
    //             (_) => _.address.toLowerCase() !== mygov.address.toLowerCase()
    //         )
    //         .slice(0, num_of_users)
    //     for (; user_accounts.length < num_of_users; ) {
    //         let new_user = web3.eth.accounts.create()
    //         user_accounts.push(new_user)
    //     }
    //     console.log(user_accounts.length + ' users created!')
    //     for (let i = 0; i < num_of_users; i++) {
    //         await mygov.connect(user_accounts[i]).faucet()
    //     }
    //     console.log('faucets distributed')
    //     for (let i = 0; i < num_of_users - 1; i += 2) {
    //         await mygov
    //             .connect(user_accounts[i])
    //             .transfer(user_accounts[i + 1].address, 1)
    //     }
    //     console.log('creating survey')
    //     for (let i = 0; i < num_of_users -1; i += 2) {
    //         var hash = 'ipfshash'
    //         var numChoices = i + 3
    //         var maxChoices = i + 5
    //         var deadline = 999999999

    //         await mygov
    //             .connect(user_accounts[i+ 1])
    //             .submitSurvey(hash, deadline, numChoices, maxChoices, {
    //                 value: ethers.utils.parseEther('0.04'),
    //             })
    //     }
    //     for (let i = 0; i < num_of_users /2 -2 ; i += 2) {
    //         console.log(i)
    //         surveyData = await mygov
    //             .connect(user_accounts[0])
    //             .getSurveyInfo(i);
    //         console.log(surveyData)

    //         expect(hexToDecimal(surveyData[2].hex) === i + 3)
        
    //     }
    // }),

        it('Creates and gets project proposals', async function () {
        const mygovv = await hre.ethers.getContractFactory('myGOVV')
        const mygov = await mygovv.deploy()
        await mygov.deployed()
        console.log('mygov deployed at:' + mygov.address)

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
        console.log(user_accounts.length + ' users created!')
        for (let i = 0; i < num_of_users; i++) {
            await mygov.connect(user_accounts[i]).faucet()
        }
        console.log('faucets distributed')
        for (let i = 0; i < num_of_users - 1; i += 2) {
            await mygov
                .connect(user_accounts[i])
                .transfer(user_accounts[i + 1].address, 1)
        }
        console.log('creating survey')
        for (let i = 0; i < num_of_users -1; i += 2) {
        //           string memory ipfshash,
        // uint256 votedeadline,
        // uint256[] memory paymentamounts,
        // uint256[] memory payschedule
            var hash = 'ipfshash'
            var amounts = [i + 3]
            var schedule = [i + 5]
            var deadline = 999999999

            await mygov
                .connect(user_accounts[i+ 1])
                .submitSurvey(hash, deadline, amounts, schedule, {
                    value: ethers.utils.parseEther('0.04'),
                })
        }
        for (let i = 0; i < num_of_users /2 -2 ; i += 2) {
            console.log(i)
            surveyData = await mygov
                .connect(user_accounts[0])
                .getSurveyInfo(i);
            console.log(surveyData)

            expect(hexToDecimal(surveyData[2].hex) === i + 3)
        
        }
    })

    // console.log(mygov.connect(user_accounts[0]).decimals());
    //  it("test updating and retrieving updated value", async function () {
    //   const mygov = await ethers.getContractFactory("mygov");
    //   const mygov = await mygov.deploy();
    //   await mygov.deployed();
    //   const mygov2 = await ethers.getContractAt("mygov", mygov.address);
    //   const setValue = await mygov2.store(56);
    //   await setValue.wait();
    //   expect((await mygov2.retrieve()).toNumber()).to.equal(56);
    // });
})
