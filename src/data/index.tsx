import { BiHomeCircle } from "react-icons/bi";
import { IoIosCalendar } from "react-icons/io";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export const MAIN_SIDE_NAVBAR = [
  {
    url: "/dashboard",
    label: "Home",
    icon: BiHomeCircle,
  },
  {
    url: "/bookings",
    label: "Bookings",
    icon: IoIosCalendar,
  },
  {
    url: "/cabins",
    label: "Cabins",
    icon: HiOutlineHomeModern,
  },
  {
    url: "/users",
    label: "Users",
    icon: FaUsers,
  },
  {
    url: "/setting",
    label: "Settings",
    icon: IoSettingsSharp,
  },
];

export const cabinFilterByOptions = [
  { label: "All", value: "all" },
  { label: "With Discount", value: "with-discount" },
  { label: "No Discount", value: "no-discount" },
];

export const cabinSortByOptions = [
  { label: "None", value: "none" },
  { label: "Minimum Capacity", value: "min-capacity" },
  { label: "Maximum Capacity", value: "max-capacity" },
  { label: "Minimum Price", value: "min-price" },
  { label: "Maximum Price", value: "max-price" },
];

export const bookingFilterByOptions = [
  { label: "All", value: "all" },
  { label: "Checked-in", value: "checked-in" },
  { label: "Checked-out", value: "checked-out" },
  { label: "Unconfirmed", value: "unconfirmed" },
];

export const bookingSortByOptions = [
  { label: "All", value: "all" },
  { label: "Minimum Price", value: "min-price" },
  { label: "Maximum Price", value: "max-price" },
];

export const dashboardFilterOptions = [
  { label: "1 Week", value: "week" },
  { label: "1 Month", value: "month" },
  { label: "1 Year", value: "year" },
];
