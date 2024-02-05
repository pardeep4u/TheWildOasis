import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings Could not be loaded");
  }

  return data;
}

export async function updateSetting(id: number, data: any) {
  console.log("chakdata", data);

  const { data: response, error } = await supabase
    .from("settings")
    .update(data)
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }
  return response;
}
