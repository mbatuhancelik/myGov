import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function SubmitProjectProposal(){
    const { state, send } = useContractFunction(contract, 'submitProjectProposal', {});
    const [address, setAddress] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Submit Project Proposal
        </Typography>
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <Button variant="contained" fullWidth onClick={() => { void send(address)}}>Get Balance</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Project proposal is submitted!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}