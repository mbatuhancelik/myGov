import ABI from './ABI.js'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Signer } from 'ethers/lib/ethers.js';

export const contractAddress = "0x7c573Da5C1ac70AB55a64a693D9dF1FCFDe3Ae7a";
export const Abi = ABI;

export const mygovInterface = new utils.Interface(Abi)
export const contract = new Contract(contractAddress, mygovInterface)