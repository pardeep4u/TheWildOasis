import { IBooking, IData } from "../types";
import supabase from "./supabase";

export async function getBookings(
  filterValue: string | null
): Promise<IBooking[]> {
  let query = supabase
    .from("bookings")
    .select("* , cabins(id) , guests(fullName)");

  if (filterValue && filterValue !== "all")
    query = query.eq("status", filterValue);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings Could not be loaded");
  }

  return data;
}

export async function getBookingDetails(id: any): Promise<IBooking> {
  let query = supabase
    .from("bookings")
    .select("* , cabins(id,name) , guests(fullName,email,nationalID)")
    .eq("id", id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings Could not be loaded");
  }

  return data;
}

export async function updateStatus(uData: IData) {
  const query = supabase
    .from("bookings")
    .update(uData)
    .eq("id", uData.id)
    .select("*");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Status Updating fail");
  }

  return data;
}

export async function deleteBooking(id: string | number | undefined) {
  const query = supabase.from("bookings").delete().eq("id", id);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Status Deleting fail");
  }

  return data;
}
