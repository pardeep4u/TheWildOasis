export interface ICabinItem {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | null;
}

export interface InitialSchema {
  name: string | undefined;
  maxCapacity: string;
  regularPrice: string;
  discount: string | null;
  description: string;
  image?: File | null;
}

export interface IBookingConfig {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxNumberOfGuestPerBooking: number;
  breakFastPrice: number;
}

export interface IFilter {
  label: string;
  value: string;
}

export interface IBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakFast: boolean;
  isPaid: boolean;
  observation: string;
  guestID: number;
  cabinID: number;
  cabins: {
    id: number;
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
    nationalID: string;
  };
}

export interface IData {
  id: string | number | undefined;
  status: string;
  isPaid?: boolean;
}

export enum STATUS {
  CHECKEDIN = "checked-in",
  CHECKEDOUT = "checked-out",
}

export enum TEST_USER {
  email = "pardeepkumar@gmail.com",
}
