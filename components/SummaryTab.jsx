import React from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { FiArrowUpLeft } from "react-icons/fi";

import IconButton from "./IconButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";

const SummaryTab = ({ label, balance, withdraw = false, deposit = true, tab="account" }) => {
  return (
    <div className="w-full bg-[rgb(248,249,250)] p-4 rounded-lg shadow-md flex flex-col">
      <p>{label}</p>
      <h3 className="text-[30px] font-medium mt-2">{balance}</h3>

      <div className="mt-10 flex flex-row items-center gap-2 flex-wrap">
        {deposit && (
          <Dialog>
            <DialogTrigger>
              <IconButton label={"deposit"} icon={FiArrowDownRight} />
            </DialogTrigger>
            <DialogContent className="p-0 h-[90vh]">
              <DialogHeader>
                <DialogTitle className="m-4">Deposit</DialogTitle>
              </DialogHeader>
              <DepositForm />
            </DialogContent>
          </Dialog>
        )}

        {withdraw && (
          <Dialog>
            <DialogTrigger>
              <IconButton
                variant="border"
                label="Withdraw"
                icon={FiArrowUpLeft}
              />
            </DialogTrigger>
            <DialogContent className="p-0 flex flex-col items-start justify-start">
              <DialogHeader>
                <DialogTitle className="m-4">Withdraw</DialogTitle>
              </DialogHeader>
              <WithdrawForm tab={tab}/>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default SummaryTab;
