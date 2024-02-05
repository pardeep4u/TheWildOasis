import { useNavigate } from "react-router-dom";
import { IBooking } from "../types";
import { getStatusColor } from "../utils";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiOutlineHomeModern, HiUsers } from "react-icons/hi2";
import { format } from "date-fns";
import { GoDotFill } from "react-icons/go";
import { MdOutlineFastfood } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { StatusComponent } from "./StatusComponent";

export function Details({ data }: { data: IBooking | undefined }) {
  const navigate = useNavigate();

  let statusCSS;
  if (data) statusCSS = getStatusColor(data.status);

  return (
    <>
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
        <div className="text-5xl max-md:text-4xl font-bold text-gray-600 flex items-center max-md:flex-col max-md:items-start max-md:order-2">
          Booking #{data?.id}{" "}
          <span
            className={
              statusCSS + "max-md:block text-base rounded px-2 mt-2 ml-2"
            }
          >
            {data?.status}
          </span>
        </div>
        <div className="flex items-center justify-center max-md:order-1">
          <div
            className="hover:text-blue-400 hover:cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoIosArrowRoundBack className="w-5 inline-block mr-1" />
            Back
          </div>
        </div>
      </div>
      {/** Card Element */}

      <div className="mt-8 overflow-x-auto">
        <div className="rounded-xl bg-white shadow-md min-w-[570px] overflow-hidden">
          <div className="bg-black text-white py-3 px-8 flex items-center justify-between">
            <div>
              <div className="flex items-center justify-center gap-2">
                <HiOutlineHomeModern className="inline-block w-5 h-5" />{" "}
                <span className="text-sm font-semibold">
                  {data?.cabins.name}
                </span>
              </div>
            </div>
            <div>
              {data?.startDate && data.endDate && (
                <div className="flex items-center justify-center text-sm font-semibold">
                  {format(data.startDate, "EEE, MMM d yyyy")} -{" "}
                  {format(data.endDate, "EEE, MMM d yyyy")}
                </div>
              )}
            </div>
          </div>
          <div className="py-3 px-8">
            <div className="my-4">
              <HiUsers className="inline-block mr-3 w-5 h-5" />
              <span className="font-bold text-sm">{data?.guests.fullName}</span>
              <GoDotFill className="inline-block mx-2 w-3 h-3 text-gray-500" />
              <span>{data?.guests.email}</span>
              <GoDotFill className="inline-block mx-2 w-3 h-3 text-gray-500" />
              <span>National ID {data?.guests.nationalID}</span>
            </div>

            <div className="my-4">
              <MdOutlineFastfood className="inline-block mr-3 w-5 h-5" />
              <span className="font-bold text-sm">Breakfast Included?</span>
              <GoDotFill className="inline-block mx-2 w-3 h-3 text-gray-500" />
              <span>{data?.hasBreakFast ? "Yes" : "No"}</span>
            </div>

            <div
              className={`${
                data?.isPaid ? "bg-green-400" : "bg-yellow-400"
              } text-white my-5 rounded-lg pt-4 pb-2 px-5`}
            >
              <div className="flex items-center mb-4">
                <AiFillDollarCircle className="w-8 h-8 mr-3" />
                <span className="text-xl font-semibold">Total Price</span>
                <div className="flex items-center ml-5">
                  <span className="text-2xl font-bold mr-2">
                    ${data?.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex my-3">
              <div className="text-xs font-bold text-gray-400 ml-auto">
                {data?.startDate && (
                  <> Booked {format(data?.startDate, "EEE, MMM d yyyy")} </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatusComponent status={data?.status} id={data?.id} />
    </>
  );
}
