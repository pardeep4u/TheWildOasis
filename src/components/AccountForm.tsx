import { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateAccountData } from "../services/apiAuth";
import { SomethingWentWrong } from "./SomethingWentWrong";
import { Form, Formik } from "formik";
import { InputLabel } from "./InputLabel";

interface IValues {
  fullName: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("This Field is Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: Yup.string().when(
    "password",
    (password: string[], schema) => {
      if (password && password[0] && password[0].length > 0)
        return schema
          .required("This Field is Required")
          .oneOf([Yup.ref("password")], "Passwords must match");
      return schema;
    }
  ),
});

export function AccountForm({ data }: { data: User | undefined }) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: IValues) => updateAccountData(values),
    onSuccess: () => {
      toast.success("Account Update Successful");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  if (!data) return <SomethingWentWrong />;

  const initialValues: IValues = {
    email: data.email ? data.email : "",
    fullName: data.user_metadata.fullName,
    password: "",
    repeatPassword: "",
  };

  function onSubmit(values: IValues) {
    mutate(values);
  }

  return (
    <div className="bg-white rounded mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors }) => (
          <div className="py-4">
            <Form>
              <InputLabel
                label="Email"
                name={"email"}
                setFieldValue={setFieldValue}
                value={values.email}
                errors={errors}
                disable={true}
              />

              <InputLabel
                label="Full Name"
                name={"fullName"}
                setFieldValue={setFieldValue}
                value={values.fullName}
                errors={errors}
              />

              <InputLabel
                label="New Password"
                name={"password"}
                setFieldValue={setFieldValue}
                value={values.password}
                errors={errors}
                type="password"
              />

              <InputLabel
                label="Repeat New Password"
                name={"repeatPassword"}
                setFieldValue={setFieldValue}
                value={values.repeatPassword}
                errors={errors}
                type="password"
                disable={values.password.length === 0}
              />

              <div className="flex justify-end py-4 px-10">
                <button
                  type="submit"
                  disabled={isPending}
                  className={`py-1 px-4 rounded-md ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-black hover:bg-black hover:text-white"
                  }`}
                >
                  Update Account
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
