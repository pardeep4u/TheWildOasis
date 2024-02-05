import { Loader } from "../components/Loader";
import { BookingTable } from "../components/BookingTable";
import { useBookings } from "../hooks/useBookings";
import { SomethingWentWrong } from "../components/SomethingWentWrong";

function Booking() {
  const [bookings, isError, isLoading] = useBookings();

  if (isLoading) return <Loader />;

  return (
    <>
      {!isError ? (
        <div>
          <BookingTable bookings={bookings} />
        </div>
      ) : (
        <SomethingWentWrong />
      )}
    </>
  );
}

export default Booking;
