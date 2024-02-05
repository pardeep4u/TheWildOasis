import { Form, Formik } from "formik";
import { InputLabel } from "./InputLabel";
import * as Yup from "yup";
import { InitialSchema } from "../types";
import { ImageHandler } from "./ImageHandler";
import { useMutation } from "@tanstack/react-query";
import { insertCabin } from "../services/apiCabins";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This Field is Required"),
  maxCapacity: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
  regularPrice: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
  discount: Yup.number().typeError("Only Number are allowed"),
  description: Yup.string().required("This Field is Required"),
});

const initialSchema: InitialSchema = {
  name: "",
  maxCapacity: "",
  regularPrice: "",
  discount: "",
  description: "",
};

export function FormElement({
  setShowForm,
}: {
  setShowForm: (pre: boolean) => void;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: insertCabin,
    mutationKey: ["cabins"],
    onSuccess: () => {
      toast.success("Cabin Added Successfully", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <>
      <div className="text-gray-600 font-bold text-xl text-center mb-5">
        Add Cabin
      </div>
      <Formik
        onSubmit={(values: InitialSchema) => {
          mutate(values);
        }}
        initialValues={initialSchema}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, errors, values }) => (
          <Form>
            {/********************************************* */}

            <InputLabel
              label="Cabin Name"
              setFieldValue={setFieldValue}
              name="name"
              errors={errors}
            />

            <InputLabel
              label="Maximum Capacity"
              setFieldValue={setFieldValue}
              name="maxCapacity"
              errors={errors}
            />

            <InputLabel
              label="Regular Price"
              setFieldValue={setFieldValue}
              name="regularPrice"
              errors={errors}
            />

            <InputLabel
              label="Discount"
              setFieldValue={setFieldValue}
              name="discount"
              errors={errors}
            />

            <InputLabel
              label="Description"
              setFieldValue={setFieldValue}
              name="description"
              errors={errors}
            />

            <ImageHandler setFieldValue={setFieldValue} />

            {/********************************************* */}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowForm(false);
                }}
                className="px-4 py-1 mr-2 text-gray-600 hover:text-gray-800 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={`px-4 py-1 ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-white border border-black hover:bg-black hover:text-white"
                } rounded-md`}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
