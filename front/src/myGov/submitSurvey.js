import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function SubmitSurvey(){
    const { state, send } = useContractFunction(contract, 'submitSurvey', {});

    const [ipfshash, setHash] = useState("")
    const [surveydeadline, setDeadline] = useState("")
    const [numchoices, setNumChoices] = useState("")
    const [atmostchoice, setAtMostChoice] = useState("")


    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Submit Survey
        </Typography>

        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="IPFS Hash" value={ipfshash} onChange={e => setHash(e.target.value)} />
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Survey Deadline" value={surveydeadline} onChange={e => setDeadline(e.target.value)} />
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Number of Choices" value={numchoices} onChange={e => setNumChoices(e.target.value)} />
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="At Most Choice" value={atmostchoice} onChange={e => setAtMostChoice(e.target.value)} />


        <Button variant="contained" fullWidth onClick={() => { void send(ipfshash, surveydeadline, numchoices, atmostchoice, {value: utils.parseEther("0.04")})}}>Create Survey</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Survey is created successfully!": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}