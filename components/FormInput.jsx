"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const FormInput = ({
  label = "",
  placeholder,
  name,
  type = "text",
  id,
  required = true,
  rows = 5,
  cols = 10,
  bottomDescription = null,
  initial = null,
  value = null,
  readOnly = false,
  copyEnabled = false,
  className=""
}) => {
  const inputClassName =
    `border border-[#e9ecef] rounded-md px-[0.75rem] py-[0.375rem] w-full outline-none mt-2 ${className}`;
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleBlur = () => {
    if (inputRef.current) {
      if (!inputRef.current.value.trim() && required) {
        setError("This field is required.");
      } else {
        setError(null);
      }
    }
  };

  const getInputField = (type) => {
    if (type == "textarea") {
      return (
        <textarea
          name={name}
          id={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          className={inputClassName}
          ref={inputRef}
          onBlur={handleBlur}
          readOnly={readOnly}
          {...(value !== null
            ? { value }
            : initial !== null
            ? { defaultValue: initial }
            : {})}
        ></textarea>
      );
    }

    return (
      <input
        type={type}
        name={name}
        id={id}
        className={inputClassName}
        required={required}
        placeholder={placeholder}
        ref={inputRef}
        onBlur={handleBlur}
        readOnly={readOnly}
        step={"0.1"}
        {...(value !== null
          ? { value }
          : initial !== null
          ? { defaultValue: initial }
          : {})}
      />
    );
  };

  const handleCopyClicked = async () => {
    const inputValue = inputRef.current.value;
    try {
      await navigator.clipboard.writeText(inputValue);
      toast.success("Copied successfully!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between">
        <label htmlFor={name} className="font-semibold">
          {label} {required && <span className="text-red-700">*</span>}
        </label>

        {copyEnabled && (
          <p
            className="font-bold text-buttonblue cursor-pointer"
            onClick={handleCopyClicked}
          >
            COPY
          </p>
        )}
      </div>

      {getInputField(type)}

      <p className="text-sm text-textmuted mt-1">{bottomDescription}</p>

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

export default FormInput;
