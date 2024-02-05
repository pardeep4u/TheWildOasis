import { IBookingConfig } from "../types";
import { InputLabel } from "../components/InputLabel";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting } from "../services/apiSettings";

const validationSchema = Yup.object().shape({
  minBookingLength: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed")
    .min(1, "Value must be greater than zero"),
  maxBookingLength: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed")
    .min(1, "Value must be greater than zero"),
  maxNumberOfGuestPerBooking: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed")
    .min(1, "Value must be greater than zero"),
  breakFastPrice: Yup.number()
    .required("This Field is Required")
    .typeError("Only Number are allowed"),
});

interface IValues {
  id: number;
  created_at: string;
  minBookingLength: string;
  maxBookingLength: string;
  maxNumberOfGuestPerBooking: string;
  breakFastPrice: string;
}

export function Settings({ d }: { d: IBookingConfig }) {
  const { mutate } = useMutation({
    mutationFn: (data: any) => updateSetting(data.id, data),
    mutationKey: ["settingsUpdate"],
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Settings update successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const initialValues = {
    id: d.id,
    created_at: d.created_at,
    minBookingLength: `${d.minBookingLength}`,
    maxBookingLength: `${d.maxBookingLength}`,
    maxNumberOfGuestPerBooking: `${d.maxNumberOfGuestPerBooking}`,
    breakFastPrice: `${d.breakFastPrice}`,
  };

  function onSubmit(values: IValues) {
    mutate(values);
  }

  return (
    <div>
      <div className="flex max-md:flex-col items-center justify-between">
        <div className="text-5xl font-bold text-gray-600">
          Update hotel settings
        </div>
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
                  label="Minimum nights/bookings"
                  name={"minBookingLength"}
                  setFieldValue={setFieldValue}
                  value={values.minBookingLength}
                  errors={errors}
                />

                <InputLabel
                  label="Maximum nights/bookings"
                  name={"maxBookingLength"}
                  setFieldValue={setFieldValue}
                  value={values.maxBookingLength}
                  errors={errors}
                />

                <InputLabel
                  label="Maximum guests/bookings"
                  name={"maxNumberOfGuestPerBooking"}
                  setFieldValue={setFieldValue}
                  value={values.maxNumberOfGuestPerBooking}
                  errors={errors}
                />

                <InputLabel
                  label="Breakfast price"
                  name={"breakFastPrice"}
                  setFieldValue={setFieldValue}
                  value={values.breakFastPrice}
                  errors={errors}
                />

                <div className="flex justify-end py-4 px-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-1 rounded-md ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-white border border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Update
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
