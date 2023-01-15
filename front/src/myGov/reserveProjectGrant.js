import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function ReserveProjectGrant(){
    const { state, send } = useContractFunction(contract, 'reserveProjectGrant', {});
    const [projectID, setProjectID] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Reserve project grant
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={projectID} onChange={e => setProjectID(e.target.value)} />
        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void send(projectID)}}>Reserve Project Grant</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Reserving grant for project " + projectID + " is successfully completed!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}