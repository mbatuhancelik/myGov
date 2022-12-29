import React from 'react'
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

import {contractAddress, tokenAddress, ticketAdress} from "./Contracts/contracts.js"
import {useEthers} from "@usedapp/core";
import Button from "@mui/material/Button";

export default function Home(){
    const { activateBrowserWallet, account } = useEthers();

    return(
        <React.Fragment>
            <Typography variant="h2" component="div" gutterBottom align={"center"}>
                myGov
            </Typography>
            <Typography variant="body1" component="div" gutterBottom align={"center"}>
                DAO made by Batuhan Celik, Onur Komurcu, and Ezgi Bati
            </Typography>
            <center>

                {
                    !account &&
                    <Button style={{marginTop:10, alignSelf:"center"}} variant="contained" onClick={() => activateBrowserWallet()}>Connect To Avalanche Fuji Testnet</Button>
                }
            </center>
                
            <Typography variant="h3" component="div" gutterBottom style={{marginTop:50}} align={"center"}>
                Smart Contract address : 
            </Typography>

            <Typography variant="body1" component="div" gutterBottom align={"center"}>
            {contractAddress}
            </Typography>

        </React.Fragment>
    )
}
