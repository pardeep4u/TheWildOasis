import { useMutation } from "@tanstack/react-query";
import { deleteBooking, updateStatus } from "../services/apiBookings";
import { toast } from "react-toastify";
import { IData, STATUS } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../App";

export function StatusComponent({
  status,
  id,
}: {
  status: string | undefined;
  id: string | number | undefined;
}) {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: IData) => updateStatus(data),
    mutationKey: ["updateStatus", id],
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const { mutate: deleteBookings } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: () => deleteBooking(id),
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Booking Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setTimeout(() => {
        navigate("/bookings");
      }, 1000);
    },
  });

  switch (status) {
    case "checked-in":
      return (
        <div className="py-5 flex max-md:block">
          <div className="ml-auto max-md:ml-0 max-md:flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out max-md:w-full"
              onClick={() => {
                deleteBookings();
              }}
            >
              Delete
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 max-md:w-full"
              onClick={() => {
                mutate({ id: id, status: STATUS.CHECKEDOUT });
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      );

    case "checked-out":
      return (
        <div className="py-5 flex max-md:block">
          <div className="ml-auto max-md:flex">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              onClick={() => {
                deleteBookings();
              }}
            >
              Delete
            </button>

            <div className="font-bold py-2 px-4 rounded-md inline-block ml-2">
              Guest is already Checked out.
            </div>
          </div>
        </div>
      );

    case "unconfirmed":
      return (
        <div className="py-5 flex max-md:block">
          <div className="flex items-center justify-center ml-2">
            <input
              type="checkbox"
              id="confirmationCheckbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              onChange={(e) => {
                setIsPaid(() => e.target.checked);
              }}
            />
            <label
              htmlFor="confirmationCheckbox"
              className="ml-2 text-gray-700"
            >
              I confirm that the guest has paid the total amount
            </label>
          </div>

          <div className="ml-auto max-md:mt-5 max-md:ml-0 max-md:flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out max-md:w-full"
              onClick={() => {
                deleteBookings();
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 max-md:w-full"
              onClick={() => {
                if (!isPaid) {
                  toast.error("First Accept All Payment");
                  return;
                }
                mutate({ id: id, status: STATUS.CHECKEDIN, isPaid: true });
              }}
            >
              Check In
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="rounded-xl bg-white shadow-md mt-8 overflow-hidden">
          <div className="py-3 px-8">Cannot Fetch Guest Status</div>
        </div>
      );
  }
}
