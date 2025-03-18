import React from "react";
import logo from "../../assets/images/logo/logo.png";
export default function SideNav() {
  return (
    <div>
      <h1>
        <a href="#" className="">
          <img src={logo} alt="Logo" className="h-10" />
        </a>
      </h1>
    </div>
  );
}
