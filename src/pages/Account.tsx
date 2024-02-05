import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccountData } from "../services/apiAuth";
import { Loader } from "../components/Loader";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { AccountForm } from "../components/AccountForm";

function Account() {
  return (
    <div>
      <div className="text-5xl font-bold text-gray-600">
        Update your Account
      </div>
      <UpdateData />
    </div>
  );
}

export default Account;

function UpdateData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["account"],
    queryFn: getAccountData,
  });

  if (isLoading) return <Loader />;

  return isError ? <SomethingWentWrong /> : <AccountForm data={data} />;
}
