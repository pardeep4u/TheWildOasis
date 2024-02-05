import { StatsComponent } from "./StatsComponent";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import { SomethingWentWrong } from "./SomethingWentWrong";

// First Row

interface I {
  bookings: number;
  sales: number;
  checkIns: number;
}

export function Stats({ data }: { data: I | undefined }) {
  // Fetch bookings
  // Total sales
  // check-ins

  if (!data) return <SomethingWentWrong />;

  return (
    <div className="grid max-md:grid-cols-1 max-md:gap-y-5 grid-cols-3 gap-x-5">
      <StatsComponent
        Icon={FaBagShopping}
        statsData={`${data.bookings}`}
        statsTitle="Total Bookings"
        bgColor="#EBF8FF"
        textColor="#2563EB"
      />

      <StatsComponent
        Icon={FaMoneyBillWave}
        statsData={`$${data.sales}`}
        statsTitle="Total Sales"
        bgColor="#D1FAE5"
        textColor="#047857"
      />

      <StatsComponent
        Icon={IoCalendarSharp}
        statsData={`${data.checkIns}`}
        statsTitle="Check ins"
        bgColor="#FEF9C3"
        textColor="#D97706"
      />
    </div>
  );
}
