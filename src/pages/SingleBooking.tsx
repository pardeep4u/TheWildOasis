import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "../services/apiBookings";
import { Loader } from "../components/Loader";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Details } from "../components/Details";

function SingleBooking() {
  const { id } = useParams();

  // Fetch Booking Details
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookingDetails", id],
    queryFn: () => getBookingDetails(id),
  });

  if (isLoading) return <Loader />;

  return (
    <div>{isError ? <SomethingWentWrong /> : <Details data={data} />}</div>
  );
}

export default SingleBooking;
