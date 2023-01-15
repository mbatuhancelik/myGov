import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function DelegateVote(){
    const { state: state1, send: send1 } = useContractFunction(contract, 'delegateVoteTo', {});
    const { state: state2, send: send2 } = useContractFunction(contract, 'cancelDelegation', {});
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Delegate vote to the address
        </Typography>
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Member Address" value={address} onChange={e => setAddress(e.target.value)} />
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button variant="contained" disabled={address.length == 0 || amount.length == 0} fullWidth onClick={() => { void send1(address, amount)}}>Delegate Vote</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(state1.transaction !== undefined && state1.status !== 'None') ? "Successfully delegated vote to " + address: (state1.status === "Exception" ? `Exception Details: ${state1.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" fullWidth onClick={() => { void send2()}}>Undo All Delegations</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px'>
                {(state2.transaction !== undefined && state2.status !== 'None') ? "Successfully undo all delegations!": (state2.status === "Exception" ? `Exception Details: ${state2.errorMessage}` : "")}
        </Typography>
        </div>
    );
}