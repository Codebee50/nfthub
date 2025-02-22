"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
const BottomNav = ({ variant = "dark" }) => {
  const navList = [
    { label: "All", url: "/all" },
    { label: "Art", url: "/art" },
    { label: "Gaming", url: "/gaming" },
    { label: "Membership", url: "/membership" },
    { label: "PFPs", url: "/pfps" },
    { label: "Photography", url: "/photography" },
    { label: "Other", url: "/other" },
  ];

  const [categoryList, setCategoryList] = useState([]);
  const { mutate: getCategoryList, isLoading: isCategoryLoading } =
    useFetchRequest(
      makeApiUrl("/api/v1/product/category/"),
      (response) => {
        const transformed = response?.data.map((item) => ({
          value: `${item.id}`,
          label: item.name,
          url: `/explore/${item.id}`,
        }));
        transformed.unshift({
          value: "",
          label: "All",
          url: "/",
        });

        setCategoryList(transformed);
      },
      (error) => {
        console.log("error", error);
        toast.error("Failed to fetch category list");
      }
    );

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center w-[100vw]">
      <div className="padded-section flex flex-row items-center gap-5 py-5 overflow-x-hidden">
        {categoryList.map((item, index) => (
          <div
            key={item.label}
            className={`font-semibold ${
              variant == "dark" ? "text-dark001" : "text-white"
            } text-[1.1rem] border border-transparent py-1 px-4 rounded-md hover:border-blue-500 cursor-pointer`}
          >
            <a href={item.url}>{item.label}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
