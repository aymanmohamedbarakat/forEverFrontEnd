import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import Title from "../components/Title/Title";
import CartTotal from "../components/CartTotal/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore, useCheckOutStore } from "../store";
export default function PlaceOrders() {
  const { formData, setFormData, method, setMethod, handlePlaceOrder } =
    useCheckOutStore();
  const { currentUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const PhoneRegex = /^\+201[0125]\d{8}$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(PhoneRegex, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long"),
  });

  useEffect(() => {
    if (!method) {
      setMethod("cod");
    }
  }, [method, setMethod]);

  const onSubmitOrder = async (values) => {
    try {
      setFormData(values);
      const success = await handlePlaceOrder();

      if (success) {
        navigate("/orders");
      } else {
        toast.error("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong while placing your order", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const nameParts = (currentUser?.username || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const email = currentUser.email || "";
      const phone = currentUser.phone || "";


        const preFilledData = {
          ...formData,
          firstName,
          lastName,
          email,
          street: formData.street || "",
          city: formData.city || "",
          state: formData.state || "",
          zipCode: formData.zipCode || "",
          country: formData.country || "",
          phone,
        };
        setFormData(preFilledData);
      
    }
  }, [currentUser, isAuthenticated]);

  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmitOrder}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t  border-gray-200">
            {/* ------------------------- Left Side ------------------------ */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[520px]">
              <div className="text-xl sm:text-2xl my-3">
                <Title text1={"DELIVERY"} text2={"INFORMATION"} />
              </div>
              <div className="flex gap-3">
                <div className="w-full">
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <Field
                name="email"
                placeholder="Email Address"
                type="email"
                className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="error text-red-500 text-xs mt-1"
              />

              <Field
                name="street"
                placeholder="Street"
                className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
              />
              <ErrorMessage
                name="street"
                component="p"
                className="error text-red-500 text-xs mt-1"
              />

              <div className="flex gap-3">
                <div className="w-full">
                  <Field
                    name="city"
                    placeholder="City"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="state"
                    placeholder="State"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-full">
                  <Field
                    name="zipCode"
                    placeholder="Zip Code"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="country"
                    placeholder="Country"
                    className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
                  />
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="error text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <Field
                name="phone"
                placeholder="Phone"
                className="input border border-gray-300 bg-white rounded py-1.5 px-3.5 w-full"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="error text-red-500 text-xs mt-1"
              />
            </div>
            {/* ------------------------- Right Side ------------------------ */}
            <div className="mt-8">
              <div className="mt-8 min-w-70">
                <CartTotal />
              </div>
              <div className="mt-12">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
                <div className="flex flex-col xl:flex-row gap-2">
                  {[
                    {
                      id: "Stripe",
                      label: (
                        <img
                          className="h-5 mx-4"
                          src={assets.stripe_logo}
                          alt="Stripe"
                        />
                      ),
                    },
                    {
                      id: "Razorpay",
                      label: (
                        <img
                          className="h-5 mx-4"
                          src={assets.razorpay_logo}
                          alt="Razorpay"
                        />
                      ),
                    },
                    {
                      id: "cod",
                      label: (
                        <p className="text-gray-500 text-sm font-medium mx-4">
                          Cash Payment
                        </p>
                      ),
                    },
                  ].map(({ id, label }) => (
                    <div
                      key={id}
                      onClick={() => setMethod(id)}
                      className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer"
                    >
                      <p
                        className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${
                          method === id ? "bg-green-400" : ""
                        } `}
                      ></p>
                      {label}
                    </div>
                  ))}
                </div>

                <div className="w-full text-end mt-8">
                  <button
                    type="submit"
                    className="bg-black w-full text-white btn btn-soft text-sm hover:bg-gray-800 transition-colors"
                  >
                    {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
