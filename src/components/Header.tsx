import React, { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { useLogout } from "../hooks/useLogin";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { Logo, MainNav } from "./Sidebar";
import { IoCloseCircleOutline } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
  const [mutate, isPending] = useLogout();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="py-4 px-8 border-b flex justify-between items-center relative">
      <div className="flex flex-row gap-3 title text-2xl tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
        <button
          className="max-xl:block hidden"
          onClick={() => {
            setShowSideBar(true);
          }}
        >
          <FiAlignJustify className="w-5 h-5 text-black " />
        </button>
        The Wild Oasis.
      </div>
      <div className="flex items-center justify-center gap-2 max-md:hidden">
        <div className="hover:cursor-pointer">
          <button
            onClick={() => {
              navigate("/account");
            }}
            className={`flex items-center space-x-2 px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none hover:bg-gray-100 transition-all duration-300 ease-in-out `}
          >
            <span className="text-base">Account</span>
            <MdOutlineAccountCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="hover:cursor-pointer">
          <button
            onClick={() => {
              mutate();
            }}
            className={`flex items-center space-x-2 px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none hover:bg-gray-100 transition-all duration-300 ease-in-out ${
              isPending && "opacity-50 cursor-not-allowed"
            }`}
          >
            <span className="text-base">Sign Out</span>
            <PiSignOutBold className="w-5 h-5" />
          </button>
        </div>
      </div>
      <MobileSideBar
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
        mutate={mutate}
        isPending={isPending}
      />
    </div>
  );
}

function MobileSideBar({
  setShowSideBar,
  showSideBar,
  mutate,
  isPending,
}: {
  setShowSideBar: (i: boolean) => void;
  showSideBar: boolean;
  mutate: () => void;
  isPending: boolean;
}) {
  return (
    <div
      className={`absolute top-0 xl:hidden left-0 transition-all delay-150 duration-300 bg-white w-full z-50 overflow-hidden flex flex-col ${
        showSideBar ? "h-[100vh]" : "h-0"
      } `}
    >
      <div>
        <div className="w-full flex items-center justify-center py-10 relative text-gray-600">
          <IoCloseCircleOutline
            onClick={() => {
              setShowSideBar(false);
            }}
            className="absolute right-10 w-7 h-7"
          />

          <Logo />
        </div>
        <MainNav
          isPending={isPending}
          setShowSideBar={setShowSideBar}
          mutate={mutate}
        />
      </div>
    </div>
  );
}

export default Header;
