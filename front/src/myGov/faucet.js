import { useContractFunction} from "@usedapp/core"
import Button from "@mui/material/Button";
import {contract} from "../Contracts/contracts.js";






export default function Faucet(){
    const { state, send } = useContractFunction(contract, 'faucet', {});

    return (
        <div>
            <Button fullWidth onClick={()=>{send()}}>Faucet</Button>
        </div>
    );
}