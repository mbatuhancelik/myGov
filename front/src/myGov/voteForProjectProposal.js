import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);
    
    return newText;
  }

export default  function VoteForProjectProposal(){
    const {state: stateVote, send: sendVote } = useContractFunction(contract, 'voteForProjectProposal', {});
    const {state: stateGetInfo, send: sendGetInfo } = useContractFunction(contract, 'getProjectInfo', {});
    const {state: stateGetNextPayment, send: sendGetNextPayment } = useContractFunction(contract, 'getProjectNextPayment', {});
    const {state: stateGetOwner, send: sendGetOwner } = useContractFunction(contract, 'getProjectNextOwner', {});


    const [projectID, setProjectID] = useState("")
    const [choice, setChoice] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Vote for project proposal
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Project ID" value={projectID} onChange={e => setProjectID(e.target.value)} />
        <FormControl fullWidth>
        <InputLabel id="choice">Choice</InputLabel>
        <Select
        style={{ marginBottom: 20 }}
            labelId="choice"
            id="choice"
            value={choice}
            label="Choice"
            onChange={e => setChoice(e.target.value)}
        >
            <MenuItem value={true}>Agree</MenuItem>
            <MenuItem value={false}>Disagree</MenuItem>
        </Select>
        </FormControl>

        <Button variant="contained" disabled={projectID.length == 0 || choice.length == 0} fullWidth onClick={() => { void sendVote(projectID, choice)}}>Vote</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateVote.transaction !== undefined && stateVote.status !== 'None') ? "Your choice for project " + projectID + " is saved successfully!": (stateVote.status === "Exception" ? `Exception Details: ${stateVote.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void sendGetInfo(projectID)}}>Get Project Info</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateGetInfo.transaction !== undefined && stateGetInfo.status !== 'None') ? 
                <NewlineText text={(
                "Detailed information for project " + projectID + " as follows:\n IPFS Hash: " + stateGetInfo.transaction.ipfshash 
                + "\nVote deadline: " + stateGetInfo.transaction.votedeadline
                + "\nPayment amounts: " + stateGetInfo.transaction.paymentamounts
                + "\nPay schedule: " + stateGetInfo.transaction.payschedule)}/>
                : (stateGetInfo.status === "Exception" ? `Exception Details: ${stateGetInfo.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void sendGetNextPayment(projectID)}}>Get Project Next Payment</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateGetNextPayment.transaction !== undefined && stateGetNextPayment.status !== 'None') ? "Next payment for project " + projectID + " is " + stateGetNextPayment.transaction
                : (stateGetNextPayment.status === "Exception" ? `Exception Details: ${stateGetNextPayment.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={projectID.length == 0} fullWidth onClick={() => { void sendGetOwner(projectID)}}>Get Project Owner</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateGetOwner.transaction !== undefined && stateGetOwner.status !== 'None') ? "Owner of project " + projectID + " is " + stateGetOwner.transaction
                : (stateGetOwner.status === "Exception" ? `Exception Details: ${stateGetOwner.errorMessage}` : "")}
        </Typography>
        </div>


    );
}