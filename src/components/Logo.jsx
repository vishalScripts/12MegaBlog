import { image } from "@nextui-org/react";
import React from "react";
import logo from "../assets/svg/logo-no-background.svg";

function Logo({ width = "100px", src }) {
  return (
    <div style={{ width: width }} className={`max-w-[${width}]`}>
      <img className="w-full h-auto object-center " src={src}></img>
    </div>
  );
}

export default Logo;
