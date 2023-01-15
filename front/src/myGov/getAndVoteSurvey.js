import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);
    
    return newText;
  }
  
export default  function GetBalance(){
    const { state: stateSurveyInfo, send: sendSurveyInfo } = useContractFunction(contract, 'getSurveyInfo', {});
    const { state: stateSurveyOwner, send: sendSurveyOwner } = useContractFunction(contract, 'getSurveyOwner', {});
    const { state: stateSurveyResults, send: sendSurveyResults } = useContractFunction(contract, 'getSurveyResults', {});
    const { state: stateVoting, send: sendVoting } = useContractFunction(contract, 'takeSurvey', {});

    const [surveyID, setSurveyID] = useState("")
    const [surveyChoices, setSurveyChoices] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Survey related actions
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Survey ID" value={surveyID} onChange={e => setSurveyID(e.target.value)} />
        <TextField type="int[]" style={{ marginBottom: 20 }} fullWidth label="Survey Choices" value={surveyChoices} onChange={e => setSurveyChoices(e.target.value)} />
        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyOwner(surveyID)}}>Get Survey Owner</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateSurveyOwner.transaction !== undefined && stateSurveyOwner.status !== 'None') ? "Owner of the survey " + surveyID + " is " + stateSurveyOwner.transaction : (stateSurveyOwner.status === "Exception" ? `Exception Details: ${stateSurveyOwner.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyInfo(surveyID)}}>Get Survey Details</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateSurveyInfo.transaction !== undefined && stateSurveyInfo.status !== 'None') ? 
                <NewlineText text={(
                'Details of the survey:\n Survey deadline: ' + stateSurveyInfo.transaction.surveydeadline + '\nNumber of choices: ' + stateSurveyInfo.transaction.numchoices 
                + '\nMaximum number of selectable choices: ' + stateSurveyInfo.transaction.atmostchoice)} />
                : (stateSurveyInfo.status === "Exception" ? `Exception Details: ${stateSurveyInfo.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={surveyID.length == 0} fullWidth onClick={() => { void sendSurveyResults(surveyID); console.log(stateSurveyResults.transaction)}}>Get Survey Results</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateSurveyResults.transaction !== undefined && stateSurveyResults.status !== 'None') ? 
                <NewlineText text={(
                'Survey results:\n Number of voters: ' + stateSurveyResults.transaction.numtaken + '\nResults: ' + stateSurveyResults.transaction.results)} />
                
                : (stateSurveyResults.status === "Exception" ? `Exception Details: ${stateSurveyResults.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" disabled={surveyID.length == 0 || surveyChoices.length == 0} fullWidth onClick={() => { void sendVoting(surveyID, surveyChoices); console.log(surveyChoices)}}>Vote the survey</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateVoting.transaction !== undefined && stateVoting.status !== 'None') ? 
                "You voted the survey successfully!"
                : (stateSurveyResults.status === "Exception" ? `Exception Details: ${stateSurveyResults.errorMessage}` : "")}
        </Typography>
        </div>


    );
}