import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function GetBalance(){
    const {state: stateBalance, send: sendBalance } = useContractFunction(contract, 'balanceOf', {});
    const {state: stateVotes, send: sendVotes } = useContractFunction(contract, 'getVotes', {});

    const [address, setAddress] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                See balance of the address
        </Typography>
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Address" value={address} onChange={e => setAddress(e.target.value)} />

        <Button variant="contained" disabled={address.length == 0} fullWidth onClick={() => { void sendBalance(address)}}>Get Balance</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateBalance.transaction !== undefined && stateBalance.status !== 'None') ? 
                "User balance is " + parseInt(stateBalance.transaction._hex): (stateBalance.status === "Exception" ? `Exception Details: ${stateBalance.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={address.length == 0} fullWidth onClick={() => { void sendVotes(address)}}>Get Total Votes</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateVotes.transaction !== undefined && stateVotes.status !== 'None') ?
                "Number of total votes of the user is " + parseInt(stateVotes.transaction._hex): (stateVotes.status === "Exception" ? `Exception Details: ${stateVotes.errorMessage}` : "")}
        </Typography>

        </div>


    );
}