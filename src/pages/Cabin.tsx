import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import { Loader } from "../components/Loader";
import { CabinTable } from "../components/CabinTable";
import { ICabinItem } from "../types";
import { useSearchParams } from "react-router-dom";

interface IData {
  data: ICabinItem[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

function Cabin() {
  // All cabins
  const {
    data: cabins,
    isLoading,
    error,
  }: IData = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // Filtered cabins

  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("discount") || "all";
  let filterCabins: ICabinItem[] | undefined;
  if (cabins) {
    if (filterValue === "all") filterCabins = cabins;
    if (filterValue === "with-discount")
      filterCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (filterValue === "no-discount")
      filterCabins = cabins.filter(
        (cabin) => cabin.discount === 0 || cabin.discount === null
      );
  }

  // Sort
  const sortValue = searchParams.get("sortby") || "none";
  let sortByCabins;
  if (filterCabins) {
    if (sortValue === "none") sortByCabins = filterCabins;
    if (sortValue === "min-capacity")
      sortByCabins = filterCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
    if (sortValue === "max-capacity")
      sortByCabins = filterCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
    if (sortValue === "min-price")
      sortByCabins = filterCabins.sort(
        (a, b) => a.regularPrice - b.regularPrice
      );
    if (sortValue === "max-price")
      sortByCabins = filterCabins.sort(
        (a, b) => b.regularPrice - a.regularPrice
      );
  }

  return (
    <>
      {!error ? (
        <div>
          {isLoading ? <Loader /> : <CabinTable cabins={sortByCabins} />}
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </>
  );
}

export default Cabin;
