import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const SelectInput = ({
  name,
  required = true,
  label = "",
  optionList = [],
}) => {
  const [error, setError] = useState(null);

  return (
    <div>
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-700">*</span>}
      </label>
      <Select className="mt-2">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="mt-2 shadow-none">
          {optionList.map((option) => (
            <SelectItem value={option.value} key={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p
        className={`text-danger text-sm mt-1 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error || "-"}
      </p>
    </div>
  );
};

export default SelectInput;
