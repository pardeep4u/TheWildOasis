import { InitialSchema } from "../types";
import { generateRandomFileName } from "../utils";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }

  return data;
}

export async function insertCabin(d: InitialSchema) {
  d = {
    ...d,
    discount: d.discount ? d.discount : null,
  };

  if (d.image) {
    const imageName = generateRandomFileName(d.image.name);

    // First upload image to bucket
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, d.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabins Could not be loaded");
    }

    // Now Get Image With token
    const { data: URL } = await supabase.storage
      .from("cabins")
      .getPublicUrl("/" + imageName);

    // Then upload image url to DB.
    const dt = { ...d, image: URL.publicUrl };
    const { data, error } = await supabase.from("cabins").insert([dt]).select();

    if (error) {
      console.error(error);
      throw new Error("Cabins Could not be loaded");
    }

    return data;
  } else {
    const { data, error } = await supabase.from("cabins").insert([d]).select();

    if (error) {
      console.error(error);
      throw new Error("Cabins Could not be loaded");
    }

    return data;
  }
}

export async function updateCabins(id: string, data: any) {
  // 3 CASE FOR image
  // Image is removed
  // Image is changed
  // Image is never-touched
  // console.log(data);

  const d = data;

  if (data.imageStatus === "new" && d && d.image) {
    const imageName = generateRandomFileName(d.image.name);

    // First upload image to bucket
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, d.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabins Could not be loaded");
    }

    // Now Get Image With token
    const { data: URL } = await supabase.storage
      .from("cabins")
      .getPublicUrl("/" + imageName);

    // Then upload image url to DB.
    delete d.imageStatus;

    const dt = { ...d, image: URL.publicUrl };
    const { data, error } = await supabase
      .from("cabins")
      .update([dt])
      .eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Cabins Could not be loaded");
    }

    return data;
  }

  delete data.imageStatus;

  const { data: response, error } = await supabase
    .from("cabins")
    .update(data)
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }
  return response;
}

export async function deleteCabins(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  console.log("d", data);
  console.log("e", error);

  if (error) {
    console.error(error);
    throw new Error("Something Went Wrong While Deleting Cabin");
  }

  return data;
}
