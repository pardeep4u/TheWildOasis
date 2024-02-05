import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";
import { Loader } from "../components/Loader";
import { Settings } from "../components/Settings";

function Setting() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return (
    <div>
      {!error ? (
        <div>{isLoading ? <Loader /> : <Settings d={data} />}</div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
}

export default Setting;
