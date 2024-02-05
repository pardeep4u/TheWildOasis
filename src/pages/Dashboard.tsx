import React from "react";
import { Stats } from "../components/Stats";
import { ChartComponent } from "../components/Chart";
import { getData } from "../services/apiDashboard";
import { useQuery } from "@tanstack/react-query";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Loader } from "../components/Loader";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("filter");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => getData(filterValue ? filterValue : "week"),
  });
  if (isError) return <SomethingWentWrong />;

  return (
    <div className="py-5 px-5 bg-white bg-opacity-5 backdrop-blur-[2px] rounded drop-shadow-lg ">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold text-gray-600">Dashboard</div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-5">
          <Stats data={data} />
          <ChartComponent data={data} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
