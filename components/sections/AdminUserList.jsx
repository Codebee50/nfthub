"use client";

import React, { useState } from "react";
import SectionHeaderText from "../SectionHeaderText";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaEye } from "react-icons/fa";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { useEffect } from "react";
import DepositForm from "../DepositForm";
import AdminEditUserForm from "./admin/AdminEditUserForm";
import { formatDate } from "@/contants/constants";
import VerifyToggler from "../VerifyToggler";
import CheckRequestToggler from "../CheckRequestToggler";
import { MdRemoveRedEye } from "react-icons/md";


const AdminUserList = () => {
  const tableHeaderList = [
    // "Reference",
    "id",
    "Username",
    "Email",
    "Verified",
    "Account balance",
    "Sales balance",
    "Created at",
    "Password",
    "...",
  ];

  const [userList, setUserList] = useState([]);

  const { mutate: getUserList, isLoading: isGettingUserList } = useFetchRequest(
    makeApiUrl("/api/v1/auth/user/list/"),
    (response) => {
      console.log(response);
      setUserList(response.data);
    },
    (error) => {
      toast.error("Failed to get deposits");
    }
  );

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="w-full">
      <SectionHeaderText label={"User list"} />

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
            {userList.map((user, index) => (
              <TableRow key={`sale-${index}`} className="">
                {/* <TableCell className="py-5">{deposit?.id}</TableCell> */}
                <TableCell className="py-5 text-nowrap text-sm">
                  {user.id}
                </TableCell>
                <TableCell className="py-5">{user.username}</TableCell>

                <TableCell className="py-5">{user.email}</TableCell>
                <TableCell className="py-5">
                  <CheckRequestToggler
                    declineUrl={`/api/v1/auth/status/${user.id}/false/`}
                    verifyUrl={`/api/v1/auth/status/${user.id}/true/`}
                    isVerifiedInitial={user.is_verified}
                  />
                </TableCell>
                <TableCell className="py-5">
                  {user.wallet.account_balance}
                </TableCell>
                <TableCell className="py-5">
                  {user.wallet.sales_balance}
                </TableCell>
                <TableCell className="py-5">
                  {formatDate(user.created_at)}
                </TableCell>
                <TableCell className="py-5">{"--"}</TableCell>
                <TableCell className="py-5">
                  <Dialog>
                    <DialogTrigger>
                      <div>
                        <MdRemoveRedEye />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-0 flex flex-col items-start justify-start">
                      <DialogHeader>
                        <DialogTitle className="m-4">Edit user</DialogTitle>
                      </DialogHeader>
                      <AdminEditUserForm user={user} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUserList;
