export function Pagination({ totalResult }: { totalResult: number }) {
  return (
    <div className="py-2 px-5 flex justify-between">
      <div>showing 1 to 10 of {totalResult} results</div>
      <div className="flex items-center gap-2">
        <div className="py-1 text-sm px-4 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white hover:cursor-pointer font-semibold">
          Prev
        </div>
        <div className="py-1 text-sm px-4 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white hover:cursor-pointer font-semibold">
          Next
        </div>
      </div>
    </div>
  );
}
