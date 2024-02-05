import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/AppLayout";
import Cabin from "./pages/Cabin";
import Setting from "./pages/Setting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Booking from "./pages/Booking";
import SingleBooking from "./pages/SingleBooking";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/User";
import Account from "./pages/Account";
import Protected from "./components/Protected";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom" />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <Protected>
                  <AppLayout />
                </Protected>
              }
            >
              <Route
                path="/"
                element={<Navigate replace to={"/dashboard"} />}
              />
              <Route path="/booking/:id" element={<SingleBooking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/users" element={<User />} />
              <Route path="/cabins" element={<Cabin />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
            <Route path="*" element={<div>Sorry No Page Found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
