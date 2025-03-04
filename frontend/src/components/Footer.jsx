import React from "react";

const Footer = () => {
  return (
    <div className="header border-t border-slate-300">
      <p className="container mx-auto text-center p-4 text-slate-300">
        &copy; {`${new Date().getFullYear()} HexaMission. All right reserved.`}
      </p>
    </div>
  );
};

export default Footer;
