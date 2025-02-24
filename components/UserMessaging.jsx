import React from "react";
import { GiChatBubble } from "react-icons/gi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdSend } from "react-icons/io";

const UserMessaging = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="p-4 bg-buttonblue text-white rounded-full m-4">
            <GiChatBubble size={20} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] mx-4 my-1 rounded-tr-lg overflow-hidden p-0 flex flex-col">
          <div className="w-full bg-buttonblue h-[70px] text-white p-4">
            <p className="">Chat with us</p>
          </div>

          <div className="w-full h-[400px] relative">
            <form action="" className="w-full flex flex-row items-center absolute bottom-0 p-3 gap-2">
              <input type="text" name="message" placeholder="Enter your message" id="" className="w-full rounded-full shadow-md p-2 outline-none" />

              <div className="p-3 rounded-full bg-buttonblue text-white">
                <IoMdSend />
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserMessaging;
