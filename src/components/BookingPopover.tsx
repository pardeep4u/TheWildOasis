import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function BookingPopover({ id }: { id: string | number }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/booking/" + id);
  }
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <div className="w-5 h-5 mr-2 rounded-full hover:cursor-pointer">
              <HiDotsVertical className="w-full h-full " />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -right-6 top-5 left-0 z-10 mt-3 w-screen max-w-max -translate-x-1/2 transform">
              <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black/5">
                <div
                  className="relative  py-3 px-5 hover:cursor-pointer hover:bg-gray-100"
                  onClick={handleClick}
                >
                  <FaEye className="w-4 h-4 inline-block mr-2" /> See Details
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
