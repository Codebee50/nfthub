import React from "react";
import Link from "next/link";

const NavPopOverItem = ({ icon: Icon, label, link="/" }) => {
  return (
    <Link className="flex flex-row items-center mt-2 gap-[5px] text-sm cursor-pointer transition-all ease-in-out hover:text-buttonblue" href={link}>
      <Icon />
      <p className="font-medium">{label}</p>
    </Link>
  );
};

export default NavPopOverItem;
