import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout } from "../services/apiAuth";
import { toast } from "react-toastify";

export function useLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}): [() => void, boolean] {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["users"],
    mutationFn: () => login({ email, password }),
    onSuccess: () => {
      toast.success("Login Successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
    onError: (e) => {
      toast.error(e.message, { position: "top-center" });
    },
  });

  return [mutate, isPending];
}

export function useLogout(): [() => void, boolean] {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
    onError: (e) => {
      toast.error(e.message, { position: "top-center" });
    },
  });

  return [mutate, isPending];
}

export function useCheckUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getCurrentUser,
  });

  const payBack = {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };

  // console.log(payBack);

  return payBack;
}
