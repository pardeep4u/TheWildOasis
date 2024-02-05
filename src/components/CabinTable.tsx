import { useState } from "react";
import { ICabinItem } from "../types";
import { TableRow } from "./TableRow";
import { FormElement } from "./FormElement";
import { Filter } from "./Filter";
import { Sortby } from "./Sortby";
import { cabinFilterByOptions, cabinSortByOptions } from "../data";

export const CabinTable = ({
  cabins,
}: {
  cabins: ICabinItem[] | undefined;
}) => {
  return (
    <div>
      <div className="flex max-md:flex-col items-center justify-between">
        <div className="text-5xl font-bold text-gray-600">All Cabins</div>
        <div className="flex max-md:flex-col items-center justify-center">
          <Sortby
            queryName="sortby"
            options={cabinSortByOptions}
            defaultValue="all"
          />
          <Filter
            queryName="discount"
            options={cabinFilterByOptions}
            defaultValue="all"
          />
        </div>
      </div>
      {cabins && (
        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden min-w-[704px] overflow-y-visible border rounded-lg shadow-md">
                <table className="min-w-full text-left text-sm font-light bg-white">
                  <thead className="border-b bg-black text-white font-medium">
                    <tr>
                      <th scope="col" className="py-4"></th>
                      <th scope="col" className="py-4">
                        Cabin
                      </th>
                      <th scope="col" className="py-4">
                        Capacity
                      </th>
                      <th scope="col" className="py-4">
                        Price
                      </th>
                      <th scope="col" className="py-4">
                        Discount
                      </th>
                      <th scope="col" className="py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cabins.map((d, i) => (
                      <TableRow data={d} key={`${d}-${i}`} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <AddCabin />
    </div>
  );
};

function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {!showForm ? (
        <div
          onClick={() => {
            setShowForm(true);
          }}
          className="flex flex-col mt-2 hover:cursor-pointer"
        >
          <div className="bg-black text-white py-2 px-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center hover:text-gray-300">
            <span className="font-medium">+ Add Cabin</span>
          </div>
        </div>
      ) : (
        <div className="border-2 mt-4 px-10 py-5">
          <FormElement setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
}
