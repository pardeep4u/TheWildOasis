import React from "react";
import { InputLabel } from "../components/InputLabel";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signup } from "../services/apiAuth";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("This Field is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This Field is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("This Field is Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("This Field is Required"),
});

interface IValues {
  fullName: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

function User() {
  const { mutate } = useMutation({
    mutationFn: (data: any) => signup(data),
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      toast.success("User Created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const initialValues: IValues = {
    email: "",
    fullName: "",
    password: "",
    repeatPassword: "",
  };

  function onSubmit(values: IValues) {
    mutate(values);
  }

  return (
    <div>
      <div className="flex max-md:flex-col items-center justify-between">
        <div className="text-5xl font-bold text-gray-600">Create New User</div>
      </div>

      <div className="bg-white rounded mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, errors, isSubmitting }) => (
            <div className="py-4">
              <Form>
                <InputLabel
                  label="Full Name"
                  name={"fullName"}
                  setFieldValue={setFieldValue}
                  value={values.fullName}
                  errors={errors}
                />

                <InputLabel
                  label="Email"
                  name={"email"}
                  setFieldValue={setFieldValue}
                  value={values.email}
                  errors={errors}
                />

                <InputLabel
                  label="Password"
                  name={"password"}
                  setFieldValue={setFieldValue}
                  value={values.password}
                  errors={errors}
                  type="password"
                />

                <InputLabel
                  label="Repeat Password"
                  name={"repeatPassword"}
                  setFieldValue={setFieldValue}
                  value={values.repeatPassword}
                  errors={errors}
                  type="password"
                />

                <div className="flex justify-end py-4 px-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white  rounded-md ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Create new user
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default User;
