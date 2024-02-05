import { PostgrestError } from "@supabase/supabase-js";
import { IBooking, STATUS } from "../types";
import supabase from "./supabase";

interface T {
  data: IBooking[] | null;
  error: PostgrestError | null;
}

interface I {
  bookings: number;
  sales: number;
  checkIns: number;
  pieData: number[];
}

export async function getData(filter: string): Promise<I> {
  let { data, error }: T = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Something Went Wrong!");
  }

  // for pie chart we need bookings, check-ins , unconfirmed.
  // for line chart we need total bookings , total check-ins in specified period of time.
  let bookings = 0;
  let sales = 0;
  let checkIns = 0;
  let unconfirmed = 0;

  let pieData = [];
  data.forEach((da) => {
    bookings = bookings + 1;
    if (da.status === STATUS.CHECKEDOUT || da.status === STATUS.CHECKEDIN) {
      sales = sales + da.totalPrice;
    } else {
      unconfirmed = unconfirmed + 1;
    }
    if (da.status === STATUS.CHECKEDIN) {
      checkIns = checkIns + 1;
    }
  });

  pieData.push(checkIns);
  pieData.push(unconfirmed);

  return { bookings, sales, checkIns, pieData };
}
