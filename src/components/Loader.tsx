import { SyncLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <SyncLoader
        color="#515151"
        loading
        margin={5}
        size={25}
        speedMultiplier={1}
      />
    </div>
  );
};
