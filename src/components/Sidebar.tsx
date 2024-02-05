import React from "react";
import { MAIN_SIDE_NAVBAR } from "../data";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

function Sidebar() {
  return (
    <div className="max-xl:hidden row-span-full border-r flex flex-col">
      <div className="w-full flex items-center justify-center py-10">
        <Logo />
      </div>
      <MainNav />
    </div>
  );
}

export function MainNav({
  setShowSideBar,
  mutate,
  isPending,
}: {
  setShowSideBar?: (i: boolean) => void;
  mutate?: () => void;
  isPending?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex justify-center flex-col mx-auto">
        {MAIN_SIDE_NAVBAR.map((data, idx) => (
          <Link
            to={data.url}
            onClick={() => {
              if (setShowSideBar) {
                setShowSideBar(false);
              }
            }}
          >
            <div className="items-center mb-3 text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out py-3 px-12">
              <div className="flex items-center gap-3">
                <div>{<data.icon size={28} />}</div>
                <div>{data.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-md:block hidden">
        <div className="flex items-center justify-center gap-2">
          <div className="hover:cursor-pointer">
            <button
              onClick={() => {
                if (setShowSideBar) {
                  setShowSideBar(false);
                }
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
                if (setShowSideBar && mutate) {
                  setShowSideBar(false);
                  mutate();
                }
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
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <div className="w-40 h-40 rounded-full overflow-hidden border">
      <img
        src={"./logo.png"}
        className="transition duration-700 hover:scale-150 hover:bg-gradient-to-b hover:from-orange-300 hover:via-white hover:to-white hover:cursor-pointer"
        alt="Project-logo"
      />
    </div>
  );
}

export default Sidebar;
