import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function WithdrawPayment(){
    const {state: stateWithdraw, send: sendWithdraw } = useContractFunction(contract, 'withdrawProjectPayment', {});
    const {state: stateReceivedEthers, send: sendReceivedEthers } = useContractFunction(contract, 'getEtherReceivedByProject', {});
    const [projectID, setProjectID] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Withdraw project payment
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={projectID} onChange={e => setProjectID(e.target.value)} />
        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void sendWithdraw(projectID)}}>Withdraw Project Payment</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateWithdraw.transaction !== undefined && stateWithdraw.status !== 'None') ? "Withdraw payment for project " + projectID + "successfully completed!"
                : (stateWithdraw.status === "Exception" ? `Exception Details: ${stateWithdraw.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void sendReceivedEthers(projectID)}}>Get Ether Received By Project</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px'>
                {(stateReceivedEthers.transaction !== undefined && stateReceivedEthers.status !== 'None') ? "Ether received by project " + projectID + " is " + stateReceivedEthers.transaction + "! (in wei)"
                : (stateReceivedEthers.status === "Exception" ? `Exception Details: ${stateReceivedEthers.errorMessage}` : "")}
        </Typography>


        </div>
    );
}