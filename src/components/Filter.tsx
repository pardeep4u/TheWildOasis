import { useSearchParams } from "react-router-dom";
import { IFilter } from "../types";

export function Filter({
  queryName,
  options,
  defaultValue,
}: {
  queryName: string;
  options: IFilter[];
  defaultValue: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  let queryValue = searchParams.get(queryName);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set(queryName, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="uppercase text-gray-500 text-sm font-bold tracking-wide">
        {queryName}
      </div>

      <select
        onChange={handleChange}
        defaultValue={queryValue ? queryValue : defaultValue}
        className="p-2 rounded-lg"
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
