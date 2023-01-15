import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function WithdrawPayment(){
    const { state, send } = useContractFunction(contract, 'withdrawProjectPayment', {});
    const [projectID, setProjectID] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Withdraw project payment
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={projectID} onChange={e => setProjectID(e.target.value)} />
        <Button variant="contained" fullWidth onClick={() => { void send(projectID)}}>Withdraw Project Payment</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Withdraw payment for project " + projectID + "successfully completed!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}