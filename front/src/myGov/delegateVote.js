import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function DelegateVote(){
    const { state, send } = useContractFunction(contract, 'delegateVoteTo', {});
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Delegate vote to the address
        </Typography>
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Member Address" value={address} onChange={e => setAddress(e.target.value)} />
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button variant="contained" fullWidth onClick={() => { void send(address, amount)}}>Delegate Vote</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Successfully delegated vote to!" + setAddress: (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}