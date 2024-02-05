import { IBooking } from "../types";
import BookingPopover from "./BookingPopover";

export const BookingTableRow = ({ data }: { data: IBooking }) => {
  function getStatusColor(status: string) {
    switch (status) {
      case "checked-in":
        return "bg-green-400 text-black";

      case "checked-out":
        return "bg-gray-400 text-black";

      case "unconfirmed":
        return "bg-blue-400 text-black";

      default:
        return "bg-white text-black";
    }
  }

  const statusCSS = getStatusColor(data.status);

  return (
    <>
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap w-32 py-4 font-medium">
          <div className="ml-5">{data.id}</div>
        </td>
        <td className="whitespace-nowrap py-4">{data.id}</td>
        <td className="whitespace-nowrap w-fit py-4 font-medium">
          {data.guests.fullName}
        </td>
        <td className="whitespace-nowrap py-4 font-bold">{data.startDate}</td>
        <td className={`whitespace-nowrap font-bold`}>
          <div
            className={
              statusCSS +
              " max-w-[85%] min-w-min py-2 rounded-md uppercase text-center shadow-lg transition-transform transform hover:scale-105"
            }
          >
            <div className="font-semibold">{data.status}</div>
          </div>
        </td>
        <td className="py-4">
          <div className="w-[40%] gap-3 flex justify-center font-semibold text-lg">
            ${data.totalPrice}
          </div>
        </td>
        <td className="">
          <div className="relative">
            <div className="">
              <BookingPopover id={data.id} />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
