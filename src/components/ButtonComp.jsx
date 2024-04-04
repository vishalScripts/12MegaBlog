import React from "react";
import { Button } from "@nextui-org/react";

function ButtonComp({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "px-4",
  disabled = false,
  ...props
}) {
  return (
    <Button
      // color="primary"
      isLoading={disabled}
      disabled={disabled}
      type={type}
      className={`  mx-auto py-2 rounded-lg duration-150 ${
        disabled ? " bg-red-500" : bgColor
      } ${textColor} `}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonComp;
