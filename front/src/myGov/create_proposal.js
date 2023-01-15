import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import { contract} from "../Contracts/contracts.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'


export default  function GetBalance(){
    const { state, send } = useContractFunction(contract, 'submitProjectProposal', { transactionName: 'Wrap'});
    const [deadline, setDeadline] = useState("")
    const [paymentAmounts, setAmounts] = useState("")
    const [paymentDeadlines, setDeadlines] = useState("")
    const [proposalLink, setLink] = useState("")

    return (
        <div>
        <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Create a new survey!
        </Typography>
        <TextField type="int" style={{ marginBottom: 20 }} fullWidth label="Voting Deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Payment Amounts in Wei" value={paymentAmounts} onChange={e => setAmounts(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Payment Deadlines" value={paymentDeadlines} onChange={e => setDeadlines(e.target.value)} />
        <TextField type="string" style={{ marginBottom: 20 }} fullWidth label="Proposal Hash" value={proposalLink} onChange={e => setLink(e.target.value)} />

        <Button variant="contained" fullWidth onClick={() => {
                        console.log(paymentAmounts)
                        console.log(paymentDeadlines)
                        let amounts = paymentAmounts.match(/\S+/g).map(Number);
                        let deadlines = paymentDeadlines.match(/\S+/g).map(Number);
                        console.log(amounts);
                        console.log(deadlines);
                        // if(amounts.length === deadlines.length && 
                        //     proposalLink &&
                        //     deadline &&
                        //     paymentAmounts
                        //     )
                        send(proposalLink, deadline, amounts, deadlines, {value: utils.parseEther("0.1")});

        }}>Get Balance</Button>
        <Typography variant="p1" component="div" gutterBottom align={"center"} marginTop='40px'>
                {(state.transaction !== undefined && state.status !== 'None') ? "Survey is creates ": (state.status === "Exception" ? `Exception Details: ${state.errorMessage}` : "")}
        </Typography>
        </div>


    );
}