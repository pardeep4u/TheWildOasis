import React from "react";
import { Loader } from "./Loader";

function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
