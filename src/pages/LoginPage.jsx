import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuthStore } from "../store";


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await login(values.email, values.password);
      if (res) {
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
          navigate(redirect);
          localStorage.removeItem("redirect");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
            <p className="prata-regular text-3xl">Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              name="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              placeholder="password"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p
              onClick={() => toast.info("Coming soon!", { autoClose: 1300 })}
              className="text-gray-400 cursor-not-allowed"
            >
              Forgot Password?
            </p>
            <p
              onClick={() => navigate("/register")}
              className="text-gray-600 cursor-pointer"
            >
              Create Account
            </p>
          </div>
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <button
              type="button"
              className="btn btn-soft bg-black text-white font-light mt-4"
            >
              Admin Login
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-soft bg-black text-white font-light px-8 mt-4"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
