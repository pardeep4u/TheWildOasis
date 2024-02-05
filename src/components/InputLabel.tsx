interface I {
  label: string;
  name: string;
  value?: string;
  setFieldValue: (e: string, v: string) => void;
  errors: any;
  type?: string;
  disable?: boolean;
}

export function InputLabel({
  label,
  name,
  value,
  setFieldValue,
  errors,
  type,
  disable,
}: I) {
  const showError = errors[name];

  return (
    <div className="grid grid-cols-[25%,40%,1fr] max-md:grid-cols-[1fr] items-center px-6 py-2 my-2">
      {/* Left column */}
      <div className="col-span-1 py-2 px-4 text-gray-600 font-semibold text-lg">
        {label}
      </div>

      {/* Center Column */}
      <div
        className={`flex items-center border-b-2  ${
          showError ? "border-red-500 border-b-2" : "border-black"
        } `}
      >
        <input
          type={type ? type : "text"}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(name, e.target.value);
          }}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`py-2 px-4 border-none focus:outline-none flex-1 ${
            showError ? "border-red-500 border-b-2" : ""
          } ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={disable ? disable : false}
        />
      </div>

      {/** Right column */}
      {showError && (
        <div className="text-red-500 ml-5 font-semibold text-sm mt-2">
          <span className="block">{showError}</span>
        </div>
      )}
    </div>
  );
}
