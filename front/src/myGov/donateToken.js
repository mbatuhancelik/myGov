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
    const [amount, setAmount] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Donate MyGov token
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button variant="contained" fullWidth onClick={() => { void send(amount)}}>Donate Token</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Thank you for your donation!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}