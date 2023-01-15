
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
                <a  id="getBalance" className="menu-item" href="/#/GetBalance">GetBalance</a>
                <a  id="submitProjectProposal" className="menu-item" href="/#/SubmitProjectProposal">Submit Project Proposal</a>
                <a  id="transferToken" className="menu-item" href="/#/TransferToken">Transfer Token</a>
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