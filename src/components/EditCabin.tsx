import { Form, Formik } from "formik";
import { InputLabel } from "./InputLabel";
import * as Yup from "yup";
import { ICabinItem } from "../types";
import { useMutation } from "@tanstack/react-query";
import { updateCabins } from "../services/apiCabins";
import { toast } from "react-toastify";
import { EditImageHandler } from "./EditImageHandler";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This Field is Required"),
  maxCapacity: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
  regularPrice: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
  discount: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
  description: Yup.string().required("This Field is Required"),
});

interface InitialSchema {
  id: number;
  name: string;
  maxCapacity: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: string | File | null;
  imageStatus?: "previous" | "new" | "removed";
}

export function EditCabin({
  setIsEditOpen,
  data,
}: {
  setIsEditOpen: (e: boolean) => void;
  data: ICabinItem;
}) {
  // Here goes the initial values of cabin
  const initialSchema: InitialSchema = {
    id: data.id,
    name: data.name,
    maxCapacity: `${data.maxCapacity}`,
    regularPrice: `${data.regularPrice}`,
    discount: `${data.discount}`,
    description: data.description,
    image: data.image,
    imageStatus: "previous",
  };

  const { mutate } = useMutation({
    mutationFn: (data: any) => updateCabins(data.id, data),
    mutationKey: ["updateCabins"],
    onSuccess: () => {
      toast.success("Cabin Update successful");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  return (
    <div className="w-full">
      <div className="text-gray-600 font-bold text-xl text-center mb-5">
        Edit Cabin
      </div>
      <Formik
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
        initialValues={initialSchema}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, errors, values, isSubmitting }) => (
          <Form>
            {/********************************************* */}

            <InputLabel
              label="Cabin Name"
              setFieldValue={setFieldValue}
              name="name"
              value={values.name}
              errors={errors}
            />

            <InputLabel
              label="Maximum Capacity"
              setFieldValue={setFieldValue}
              name="maxCapacity"
              value={values.maxCapacity}
              errors={errors}
            />

            <InputLabel
              label="Regular Price"
              setFieldValue={setFieldValue}
              name="regularPrice"
              value={values.regularPrice}
              errors={errors}
            />

            <InputLabel
              label="Discount"
              setFieldValue={setFieldValue}
              name="discount"
              value={values.discount}
              errors={errors}
            />

            <InputLabel
              label="Description"
              setFieldValue={setFieldValue}
              name="description"
              value={values.description}
              errors={errors}
            />

            <EditImageHandler
              setFieldValue={setFieldValue}
              src={values.image as unknown as string}
            />

            {/********************************************* */}

            <div className="flex justify-end mt-4 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                }}
                disabled={isSubmitting}
                className={`px-4 py-2 text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } rounded-md`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } rounded-md`}
              >
                Edit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
