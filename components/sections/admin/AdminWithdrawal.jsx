"use client";

import SectionHeaderText from "@/components/SectionHeaderText";
import React, { useState } from "react";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerifyToggler from "@/components/VerifyToggler";
import { useEffect } from "react";

const AdminWithdrawal = () => {
  const tableHeaderList = [
    // "Reference",
    "Username",
    "Amount",
    "Action",
    "Wallet address",
    "Created at",
  ];

  const [withdrawalList, setWithdrawalList] = useState([]);

  const { mutate: getWithdrawals, isLoading: isGettingWithdrawals } =
    useFetchRequest(
      makeApiUrl("/api/v1/business/withdrawals/all/"),
      (response) => {
        setWithdrawalList(response.data);
      },
      (error) => {
        toast.error("Failed to get withdrawals");
      }
    );

  useEffect(() => {
    getWithdrawals();
  }, []);

  return (
    <div className="w-full">
      <SectionHeaderText label={"Withdrawals"} />

      <div className="w-full mt-3 overflow-x-hidden">
        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="text-black">
            <TableRow className="text-black font-semibold">
              {tableHeaderList.map((item) => (
                <TableHead
                  className="text-black text-nowrap font-semibold"
                  key={item}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawalList.map((withdrawal, index) => (
              <TableRow key={`sale-${index}`} className="">
                {/* <TableCell className="py-5">{deposit?.id}</TableCell> */}
                <TableCell className="py-5">
                  {withdrawal.wallet.user.username}
                </TableCell>
                <TableCell className="py-5">
                  {parseFloat(withdrawal.amount)}
                </TableCell>
                <TableCell className="py-5">
                  <VerifyToggler
                    verifyUrl={`/api/v1/business/withdrawal/verify/${withdrawal.id}/`}
                    declineUrl={`/api/v1/business/withdrawal/decline/${withdrawal.id}/`}
                    isVerifiedInitial={withdrawal.is_admin_verified}
                  />
                </TableCell>
                <TableCell className="py-5">
                  {withdrawal.wallet_address}
                </TableCell>
                <TableCell className="py-5">{withdrawal.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminWithdrawal;
