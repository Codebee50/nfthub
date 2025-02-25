import SectionHeaderText from "@/components/SectionHeaderText";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { Switch } from "@/components/ui/switch";
import StatusToggler from "@/components/StatusToggler";
import VerifyToggler from "@/components/VerifyToggler";
import { formatDate } from "@/contants/constants";

const AdminDeposits = () => {
  const tableHeaderList = [
    // "Reference",
    "Username",
    "Amount",
    "Action",
    "Transaction Hash",
    "Created at",
  ];
  const [depositList, setDepositList] = useState([]);
  const { mutate: getDeposits, isLoading: isGettingDeposits } = useFetchRequest(
    makeApiUrl("/api/v1/business/deposit/all/"),
    (response) => {
      console.log(response);
      setDepositList(response.data);
    },
    (error) => {
      toast.error("Failed to get deposits");
    }
  );

  useEffect(() => {
    getDeposits();
  }, []);

  return (
    <div className="w-full">
      <SectionHeaderText label={"Deposits"} />

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
            {depositList.map((deposit, index) => (
              <TableRow key={`sale-${index}`} className="">
                {/* <TableCell className="py-5">{deposit?.id}</TableCell> */}
                <TableCell className="py-5">
                  {deposit.wallet.user.username}
                </TableCell>
                <TableCell className="py-5">
                  {parseFloat(deposit.amount)}
                </TableCell>
                <TableCell className="py-5">
                  <VerifyToggler
                    declineUrl={`/api/v1/business/deposit/decline/${deposit.id}/`}
                    verifyUrl={`/api/v1/business/deposit/verify/${deposit.id}/`}
                    isVerifiedInitial={deposit.is_admin_verified}
                  />
                </TableCell>
                <TableCell className="py-5">
                  {deposit.transaction_hash}
                </TableCell>
                <TableCell className="py-5">{formatDate(deposit.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDeposits;
