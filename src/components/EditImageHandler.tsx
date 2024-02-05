import React, { useState } from "react";

export function EditImageHandler({
  setFieldValue,
  src,
}: {
  setFieldValue: (e: string, v: File | string) => void;
  src?: string | undefined;
}) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(src);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFieldValue("image", file);
      setFieldValue("imageStatus", "new");
    }
  };

  return (
    <div className="grid grid-cols-[25%,40%,1fr] items-center px-6 py-2 my-2">
      {/* Left column */}
      <div className="col-span-1 py-2 px-4 text-gray-600 font-semibold text-lg">
        Upload Photo:
      </div>

      {/* Center Column */}
      <div className={`flex items-center border-b-2 border-blue-500`}>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="py-2 px-4 border-none focus:outline-none bg-transparent flex-1"
          />
        </div>
      </div>

      {selectedImage && (
        <div className="w-[50%] ml-5">
          <img src={selectedImage} alt="Selected" className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
