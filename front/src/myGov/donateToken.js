import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function DonateToken(){
    const { state, send } = useContractFunction(contract, 'donateMyGovToken', {});
    const { state: stateEther, send: sendEther } = useContractFunction(contract, 'donateEther', {});
    const [amount, setAmount] = useState("")
    const [amountEther, setEther] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Donate MyGov token
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button variant="contained" disabled={amount.length == 0} fullWidth onClick={() => { void send(amount)}}>Donate Tokens</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Thank you for your donation!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        <TextField type="number" style={{ marginBottom: 20 }} fullWidth label="Ether Amount(in Ethers)" value={amountEther} onChange={e => setEther(e.target.value)} />
        <Button variant="contained" disabled={amountEther.length == 0} fullWidth onClick={() => { void sendEther({value: utils.parseEther(amountEther.toString())})}}>Donate Ethers</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(stateEther.transaction !== undefined && state.status !== 'None') ? "Thank you for your donation!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}