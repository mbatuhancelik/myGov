
import React, { useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import './App.css';
import {useEthers} from "@usedapp/core";
import Button from "@mui/material/Button";
import { slide as Menu } from 'react-burger-menu'


/*
* Main layout and navigation are defined here
* */


export default function Layout() {
    const [phase, setPhase] = useState("")
    const { activateBrowserWallet, account } = useEthers();
    
    let {pathname} = useLocation();

    return (        
        <React.Fragment>
            <Menu>
                <a  id="home" className="menu-item" href="/#/">Home</a>
                <a  id="faucet" className="menu-item" href="/#/Faucet">Faucet</a>
                <a  id="getBalance" className="menu-item" href="/#/GetBalance">Get Balance</a>
                <a  id="submitSurvey" className="menu-item" href="/#/SubmitSurvey">Submit Survey</a>
                <a  id="transferToken" className="menu-item" href="/#/TransferToken">Transfer Token</a>
                <a  id="delegateVote" className="menu-item" href="/#/DelegateVote">Delegate Vote</a>
                <a  id="donateToken" className="menu-item" href="/#/DonateToken">Donate Token and Ethers</a>
                <a  id="voteForProjectPayment" className="menu-item" href="/#/VoteForProjectPayment">Vote For Project Payment</a>
                <a  id="voteForProjectProposal" className="menu-item" href="/#/VoteForProjectProposal">Vote For Project Proposal</a>
                <a  id="withdrawPayment" className="menu-item" href="/#/WithdrawPayment">Withdraw Payment</a>
                <a  id="reserveProjectGrant" className="menu-item" href="/#/ReserveProjectGrant">Reserve Project Grant</a>
                <a  id="getAndVoteSurvey" className="menu-item" href="/#/GetAndVoteSurvey">Get And Vote Survey</a>
                <a  id="createProposal" className="menu-item" href="/#/CreateProposal">Create Project Proposal</a>
            </Menu>

            <Container maxWidth="md" style={{height:"100%", alignContent:"center"}}>
                {
                    account || pathname==='/'? <Outlet/>:
                        <center>
                            <Button style={{marginTop:10, alignSelf:"center"}} variant="contained" onClick={() => activateBrowserWallet()}>Connect To Avalanche Fuji Testnet</Button>
                        </center>
                }
            </Container>

        </React.Fragment>
    )
}