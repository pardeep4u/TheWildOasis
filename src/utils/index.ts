export function generateRandomFileName(originalFileName: string) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string of length 6

  // Extract file extension (if any) from the original file name
  const fileExtension = originalFileName.split(".").pop();

  // Construct the unique file name
  const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;

  return uniqueFileName;
}

export function getStatusColor(status: string) {
  switch (status) {
    case "checked-in":
      return "bg-green-400 text-black";

    case "checked-out":
      return "bg-gray-400 text-black";

    case "unconfirmed":
      return "bg-blue-400 text-black";

    default:
      return "bg-white text-black";
  }
}
