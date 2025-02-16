import React from "react";

const NavPopOverItem = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-row items-center mt-2 gap-[5px] text-sm cursor-pointer">
      <Icon />
      <p className="font-medium">{label}</p>
    </div>
  );
};

export default NavPopOverItem;
