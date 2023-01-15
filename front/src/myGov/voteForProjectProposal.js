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



export default  function VoteForProjectProposal(){
    const { state, send } = useContractFunction(contract, 'voteForProjectProposal', {});
    const [projectID, setProjectID] = useState("")
    const [choice, setChoice] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Vote for project payment
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
        <Button variant="contained" fullWidth onClick={() => { void send(projectID, choice)}}>Vote</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Your choice for project " + projectID + " is " + choice: (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}