import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";

import Faucet from "./myGov/faucet"
import GetBalance from "./myGov/getBalance"
import SubmitProjectProposal from "./myGov/submitProjectProposal"
import TransferToken from "./myGov/transferToken"
import DelegateVote from "./myGov/delegateVote"
import DonateToken from "./myGov/donateToken"
import VoteForProjectPayment from "./myGov/voteForProjectPayment"
import VoteForProjectProposal from "./myGov/voteForProjectProposal"
import WithdrawPayment from "./myGov/withdrawPayment"
import ReserveProjectGrant from "./myGov/reserveProjectGrant";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path={""} element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path={"faucet"} element={<Faucet/>}/>
          <Route path={"getBalance"} element={<GetBalance/>}/>
          <Route path={"submitProjectProposal"} element={<SubmitProjectProposal/>}/>
          <Route path={"transferToken"} element={<TransferToken/>}/>
          <Route path={"delegateVote"} element={<DelegateVote/>}/>
          <Route path={"donateToken"} element={<DonateToken/>}/>
          <Route path={"voteForProjectPayment"} element={<VoteForProjectPayment/>}/>
          <Route path={"voteForProjectProposal"} element={<VoteForProjectProposal/>}/>
          <Route path={"withdrawPayment"} element={<WithdrawPayment/>}/>
          <Route path={"reserveProjectGrant"} element={<ReserveProjectGrant/>}/>
          {/* <Route path={"mint"} element={<Mint/>}/>
          <Route path={"checkIfTicketWon"} element={<CheckIfTicketWon/>}/>
          <Route path={"collectTicketPrize"} element={<CollectTicketPrize/>}/>
          <Route path={"collectTicketRefund"} element={<CollectTicketRefund/>}/>
          <Route path={"getIthOwnedTicketNo"} element={<GetIthOwnedTicketNo/>}/>
          <Route path={"getLastOwnedTicketNo"} element={<GetLastOwnedTicketNo/>}/>
          <Route path={"getIthWinningTicket"} element={<GetIthWinningTicket/>}/>
          <Route path={"getLotteryNo"} element={<GetLotteryNo/>}/>
          <Route path={"gettotalLotteryMoneyCollected"} element={<GetTotalLotteryMoneyCollected/>}/>
          <Route path={"revealRndNumber"} element={<RevealRndNumber/>} />
          <Route path={"deposittl"} element={<DepositTL/>}/>
          <Route path={"withdraw"} element={<Withdraw/>}/>
          <Route path={"findWinningNumbers"} element={<FindWinningNumbers/>}/>
          <Route path={"calculateHash"} element={<CalculateHash/>}/> */}
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
