import React from "react";

const BottomNav = ({variant='dark'}) => {
  const navList = [
    { label: "All", url: "/all" },
    { label: "Art", url: "/art" },
    { label: "Gaming", url: "/gaming" },
    { label: "Membership", url: "/membership" },
    { label: "PFPs", url: "/pfps" },
    { label: "Photography", url: "/photography" },
    { label: "Other", url: "/other" },
  ];

  return (
    <div className="flex flex-row items-center justify-center w-[100vw]">
      <div className="padded-section flex flex-row items-center gap-5 py-5 overflow-x-hidden">
        {navList.map((item, index) => (
          <div key={item.label} className={`font-semibold ${variant=='dark'? 'text-dark001': 'text-white'} text-[1.1rem] border border-transparent py-1 px-4 rounded-md hover:border-blue-500 cursor-pointer`}>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
