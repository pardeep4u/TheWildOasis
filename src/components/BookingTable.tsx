import { bookingFilterByOptions } from "../data";
import { IBooking } from "../types";
import { BookingTableRow } from "./BookingTableRow";
import { Filter } from "./Filter";

export function BookingTable({
  bookings,
}: {
  bookings: IBooking[] | undefined;
}) {
  return (
    <div>
      <div className="flex max-md:flex-col items-center justify-between">
        <div className="text-5xl font-bold text-gray-600">All Bookings</div>
        <div className="flex items-center justify-center">
          <Filter
            queryName="status"
            options={bookingFilterByOptions}
            defaultValue="all" // Default value must be inside options
          />
        </div>
      </div>
      {bookings && (
        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-hidden min-w-[704px] overflow-y-visible border rounded-lg shadow-md">
                <table className="min-w-full text-left text-sm font-light bg-white">
                  <thead className="border-b bg-black text-white font-medium">
                    <tr>
                      <th scope="col" className="py-4">
                        <div className="ml-5">Booking ID</div>
                      </th>
                      <th scope="col" className="py-4">
                        Cabin ID
                      </th>
                      <th scope="col" className="py-4">
                        Guest
                      </th>
                      <th scope="col" className="py-4">
                        Dates
                      </th>
                      <th scope="col" className="py-4">
                        Status
                      </th>
                      <th scope="col" className="py-4">
                        Amount
                      </th>
                      <th scope="col" className="py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((d, i) => (
                      <BookingTableRow data={d} key={`${d}-${i}`} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
