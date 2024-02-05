import { ICabinItem } from "../types";
import { useMutation } from "@tanstack/react-query";
import { deleteCabins } from "../services/apiCabins";
import { toast } from "react-toastify";
import { useState } from "react";
import { EditCabin } from "./EditCabin";
import MyModal from "./Modal";

export const TableRow = ({ data }: { data: ICabinItem }) => {
  const [editCabin, setEditCabin] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteCabins(data.id),
    onSuccess: () => {
      toast.success("Deleted Successfully", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  return (
    <>
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap w-32 py-4 font-medium">
          <div className="w-24 border-2 ml-3 hover:scale-105 overflow-hidden rounded-md">
            <img
              alt="just-for-cabin"
              src={data.image ? data.image : "/not.png"}
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className="whitespace-nowrap py-4">{data.id}</td>
        <td className="whitespace-nowrap w-fit py-4 font-medium">
          Fits Up to {data.maxCapacity} guests
        </td>
        <td className="whitespace-nowrap py-4 font-bold">
          ${data.regularPrice.toFixed(2)}
        </td>
        <td className="whitespace-nowrap py-4 font-bold text-green-600">
          {data.discount ? `${data.discount}% off` : "-"}
        </td>
        <td className="py-4">
          <div className="w-[60%] gap-3 flex justify-center">
            <button
              onClick={() => {
                setEditCabin((pre) => !pre);
              }}
              className="bg-white border border-black hover:bg-black hover:text-white font-bold py-1 px-4 rounded mr-2 transition duration-300 ease-in-out"
              disabled={isPending}
            >
              Edit
            </button>
            <button
              onClick={() => mutate()}
              className="bg-red-500 hover:bg-red-600 hover:text-white text-white font-bold  py-1 px-4 rounded transition duration-300 ease-in-out"
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      <MyModal isEditOpen={editCabin} setIsEditOpen={setEditCabin}>
        <EditCabin setIsEditOpen={setEditCabin} data={data} />
      </MyModal>
    </>
  );
};
