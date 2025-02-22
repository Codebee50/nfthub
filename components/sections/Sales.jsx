import React, { useEffect, useState } from "react";
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
import HorLine from "../HorLine";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";

const Sales = () => {
  const saleTypeList = ["All", "Bought", "Sold"];

  const salesHeaders = [
    "Reference",
    "Name",
    "Amount",
    "buyer",
    "Seller",
    "Created at",
  ];

  const [userSalesList, setUserSalesList] = useState([]);

  const transactions = [
    {
      reference: "67b5b7b08fb62c82c6dd4392",
      name: "Spirited Away: No face",
      amount_eth: 3.5,
      buyer: "0xf30****1acda",
      seller: "0xf30****1acda",
      created_at: "19/02/25",
    },
    {
      reference: "67b5b7ae8fb62c82c6dd4387",
      name: "Spirited Away: No face",
      amount_eth: 3.5,
      buyer: "0xf30****1acda",
      seller: "0xebe****bfa7a",
      created_at: "19/02/25",
    },
    {
      reference: "6720e7514f5ecca21c9a1812",
      name: "Nowhere",
      amount_eth: 3.8,
      buyer: "0xf30****1acda",
      seller: "0xac9****dc5be",
      created_at: "29/10/24",
    },
    {
      reference: "6720e74c4f5ecca21c9a17f2",
      name: "Leaf Art",
      amount_eth: 4,
      buyer: "0xf30****1acda",
      seller: "0xac9****dc5be",
      created_at: "29/10/24",
    },
  ];

  const transformApiSaleList = (saleList) => {
    return saleList.map((sale) => {
      const reference = sale.id.replace(/-/g, "");
      const date = new Date(sale.created_at); // Convert to Date object

      return {
        reference: reference,
        name: sale.nft.title,
        amount_eth: parseFloat(sale.amount),
        buyer: sale.buyer.email,
        seller: sale.seller.email,
        created_at: date.toLocaleDateString("en-US"),
      };
    });
  };

  const { mutate, isLoading } = useFetchRequest(
    makeApiUrl("/api/v1/product/nft/user/sales/"),
    (response) => {
      console.log(response);
      setUserSalesList(transformApiSaleList(response.data));
    },
    (error) => {
      toast.error("Error fetching sales");
    }
  );

  useEffect(() => {
    mutate();
  }, []);
  return (
    <div className="w-full">
      <SectionHeaderText label={"Sales"} />

      <div className="flex flex-row items-center gap-5 mt-4">
        {saleTypeList.map((saleType) => (
          <p className="font-medium text-textmuted cursor-pointer hover:text-buttonblue">
            {saleType}
          </p>
        ))}
      </div>

      <div className="w-full mt-3 overflow-x-hidden">
        <HorLine />
        <Table className="bg-slate-200">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="text-black">
            <TableRow className="text-black font-semibold">
              {salesHeaders.map((item) => (
                <TableHead className="text-black font-semibold" key={item}>
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSalesList.map((sale, index) => (
              <TableRow key={`sale-${index}`} className="">
                <TableCell className="py-5">{sale.reference}</TableCell>
                <TableCell className="py-5">{sale.name}</TableCell>
                <TableCell className="py-5">{sale.amount_eth}</TableCell>
                <TableCell className="py-5">{sale.buyer}</TableCell>
                <TableCell className="py-5">{sale.seller}</TableCell>
                <TableCell className="py-5">{sale.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Sales;
