import React from "react";
import Loading from "./Loading";
import useCheckLogin from "../hooks/useCheckLogin";

function Protected({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useCheckLogin();
  if (isAuthenticated) return children;
  return <Loading />;
}

export default Protected;
