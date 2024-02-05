import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { IBooking } from "../types";

export function useBookings(): [IBooking[] | undefined, boolean, boolean] {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookings", filterValue],
    queryFn: () => getBookings(filterValue),
    refetchOnMount: true,
    enabled: true,
    refetchOnWindowFocus: true,
  });

  return [data, isError, isLoading];
}
