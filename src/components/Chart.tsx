import {
  Chart,
  ArcElement,
  LinearScale,
  PointElement,
  CategoryScale,
  registerables,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

Chart.register(
  ArcElement,
  LinearScale,
  PointElement,
  CategoryScale,
  ...registerables
);

const labels = Array.from({ length: 30 }, (_, i) => i + 1);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export function ChartComponent({ data }: { data: any }) {
  const da = {
    labels: labels,
    datasets: [
      {
        label: "Past month booking data",
        data: labels.map(() => Math.floor(Math.random() * 10)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: ["check-in", "unconfirmed"],
    datasets: [
      {
        label: "Popularity of colors",
        data: data.pieData,
        backgroundColor: [
          "rgba(232, 149, 247, 0.6)",
          "rgba(214, 36, 36, 0.6)",
          "rgba(180, 249, 3, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-5">
      <div className="bg-white py-5 px-5 mt-5 shadow-md col-span-2">
        <div>
          <Line data={da} options={options} />
          <p className="text-gray-600 text-sm mt-3">
            This Line chart data is fake because there is not enough data
          </p>
        </div>
      </div>
      <div className="bg-white py-5 px-5 mt-5 shadow-md">
        <div>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}
