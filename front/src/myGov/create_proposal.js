import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function GetBalance(){
    const { state: stateSubmitProposal, send: sendSubmitProposal } = useContractFunction(contract, 'submitProjectProposal', { transactionName: 'Wrap'});
    const { state: stateGetNumberOfProposals, send: sendGetNumberOfProposals } = useContractFunction(contract, 'getNoOfProjectProposals', {});

    
    const [deadline, setDeadline] = useState("")
    const [paymentAmounts, setAmounts] = useState("")
    const [paymentDeadlines, setDeadlines] = useState("")
    const [proposalLink, setLink] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Create a new project proposal
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Voting Deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Payment Amounts in Wei" value={paymentAmounts} onChange={e => setAmounts(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Payment Deadlines" value={paymentDeadlines} onChange={e => setDeadlines(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Proposal Hash" value={proposalLink} onChange={e => setLink(e.target.value)} />

        <Button variant="contained" disabled={deadline.length == 0 || paymentAmounts.length == 0 || paymentDeadlines.length == 0 || proposalLink.length == 0} fullWidth onClick={() => {
                        let amounts = paymentAmounts.match(/\S+/g).map(Number);
                        let deadlines = paymentDeadlines.match(/\S+/g).map(Number);
                        sendSubmitProposal(proposalLink, deadline, amounts, deadlines, {value: utils.parseEther("0.1")});

        }}>Create Project Proposal</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px' marginBottom='30px'>
                {(stateSubmitProposal.transaction !== undefined && stateSubmitProposal.status !== 'None') ? "Project proposal is created successfully!": (stateSubmitProposal.status === "Exception" ? `Exception Details: ${stateSubmitProposal.errorMessage}` : "")}
        </Typography>

        <Button variant="contained" 
        fullWidth onClick={() => { void sendGetNumberOfProposals()}}>Get Total Number Of Project Proposals</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='10px'>
                {(stateGetNumberOfProposals.transaction !== undefined && stateGetNumberOfProposals.status !== 'None') ? "Total number of project proposals: " + stateGetNumberOfProposals.transaction: (stateGetNumberOfProposals.status === "Exception" ? `Exception Details: ${stateGetNumberOfProposals.errorMessage}` : "")}
        </Typography>

        </div>

        


    );
}