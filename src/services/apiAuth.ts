import { TEST_USER } from "../types";
import supabase from "./supabase";

interface I {
  fullName: string;
  email: string;
  password: string;
}

export async function signup({ fullName, email, password }: I) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    user_metadata: {
      fullName: fullName,
    },
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

type TLogin = {
  email: string;
  password: string;
};

export async function login({ email, password }: TLogin) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    throw new Error(sessionError.message);
  }

  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser(
    sessionData.session.access_token
  );

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data.user;
}

export async function getAccountData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data.user;
}

interface IValues {
  fullName: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export async function updateAccountData(da: IValues) {
  if (da.email === TEST_USER.email) {
    throw new Error("Test user cannot update account setting");
  }

  let obj: any = {};
  obj.email = da.email;
  if (da.fullName) {
    obj = {
      ...obj,
      data: {
        fullName: da.fullName,
      },
    };
  }
  if (da.password) obj.password = da.password;

  const { data, error } = await supabase.auth.updateUser(obj);

  console.log(data, error);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
