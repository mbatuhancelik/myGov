import ABI from './ABI.js'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Signer } from 'ethers/lib/ethers.js';

export const contractAddress = "0x1f51Ce46a41792BAA4274524c69a02BD2950f6BD";
export const Abi = ABI;

export const mygovInterface = new utils.Interface(Abi)
export const contract = new Contract(contractAddress, mygovInterface)