import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function GetBalance(){
    const { state: stateSurveyInfo, send: sendSurveyInfo } = useContractFunction(contract, 'getSurveyInfo', {});
    const { state: stateSurveyOwner, send: sendSurveyOwner } = useContractFunction(contract, 'getSurveyOwner', {});
    const { state: stateSurveyResults, send: sendSurveyResults } = useContractFunction(contract, 'getSurveyResults', {});
    const { state: stateVoting, send: sendVotering } = useContractFunction(contract, 'takeSurvey', {});

    const [surveyID, setSurveyID] = useState("")
    const [surveyChoices, setSurveyChoices] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Survey related actions
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Survey ID" value={surveyID} onChange={e => setSurveyID(e.target.value)} />
        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyOwner(surveyID); console.log(stateSurveyOwner.transaction)}}>Get Survey Owner</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(stateSurveyOwner.transaction !== undefined && stateSurveyOwner.status !== 'None') ? "Owner of the survey " + surveyID + " is " + stateSurveyOwner.transaction : (stateSurveyOwner.status === "Exception" ? `Exception Details: ${stateSurveyOwner.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyInfo(surveyID); console.log(stateSurveyInfo.transaction)}}>Get Survey Details</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(stateSurveyInfo.transaction !== undefined && stateSurveyInfo.status !== 'None') ? "Info of the survey " + surveyID + " is " + stateSurveyInfo.transaction : (stateSurveyInfo.status === "Exception" ? `Exception Details: ${stateSurveyInfo.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyResults(surveyID); console.log(stateSurveyInfo.transaction)}}>Get Survey Results</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(stateSurveyResults.transaction !== undefined && stateSurveyResults.status !== 'None') ? "Info of the survey " + surveyID + " is " + stateSurveyResults.transaction : (stateSurveyResults.status === "Exception" ? `Exception Details: ${stateSurveyResults.errorMessage}` : "")}
        </Typography>
        </div>


    );
}