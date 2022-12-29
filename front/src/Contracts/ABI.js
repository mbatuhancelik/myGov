const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cancelDelegation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "memberaddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "delegateVoteTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "donateEther",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "donateMyGovToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "faucet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "reserveProjectGrant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfshash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votedeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "paymentamounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "payschedule",
				"type": "uint256[]"
			}
		],
		"name": "submitProjectProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfshash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "surveydeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numchoices",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "atmostchoice",
				"type": "uint256"
			}
		],
		"name": "submitSurvey",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "surveyid",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "surveyid",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "choices",
				"type": "uint256[]"
			}
		],
		"name": "takeSurvey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "choice",
				"type": "bool"
			}
		],
		"name": "voteForProjectPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "choice",
				"type": "bool"
			}
		],
		"name": "voteForProjectProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "withdrawProjectPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "getEtherReceivedByProject",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "getIsProjectFunded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "funded",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "getIsProjectPassed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "funded",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNoOfFundedProjects",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "numfunded",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNoOfProjectProposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "numproposals",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNoOfSurveys",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "numsurveys",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "activityid",
				"type": "uint256"
			}
		],
		"name": "getProjectInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "ipfshash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votedeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "paymentamounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "payschedule",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "getProjectNextOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "projectowner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectid",
				"type": "uint256"
			}
		],
		"name": "getProjectNextPayment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "next",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "surveyid",
				"type": "uint256"
			}
		],
		"name": "getSurveyInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "ipfshash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "surveydeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numchoices",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "atmostchoice",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "surveyid",
				"type": "uint256"
			}
		],
		"name": "getSurveyOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "surveyowner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "surveyid",
				"type": "uint256"
			}
		],
		"name": "getSurveyResults",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "numtaken",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "results",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default ABI;