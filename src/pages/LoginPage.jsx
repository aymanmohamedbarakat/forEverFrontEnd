// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { useAuthStore } from "../store";
// export default function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuthStore();

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const res = await login(values.email, values.password);
//       if (res) {
//         const redirect = localStorage.getItem("redirect");
//         if (redirect) {
//           navigate(redirect);
//           localStorage.removeItem("redirect");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       validationSchema={validationSchema}
//       initialValues={{
//         email: "",
//         password: "",
//       }}
//       onSubmit={handleLogin}
//     >
//       {({ isSubmitting }) => (
//         <Form className="flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
//           <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
//             <p className="prata-regular text-3xl">Login</p>
//             <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
//           </div>

//           <div className="w-full">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <Field
//               name="email"
//               placeholder="Enter Your Email"
//               className="w-full px-3 py-2 border border-gray-800"
//             />
//             <ErrorMessage
//               name="email"
//               component="div"
//               className="text-red-500"
//             />
//           </div>

//           <div className="w-full">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <Field
//               name="password"
//               type="password"
//               placeholder="password"
//               className="w-full px-3 py-2 border border-gray-800"
//             />
//             <ErrorMessage
//               name="password"
//               component="div"
//               className="text-red-500"
//             />
//           </div>

//           <div className="w-full flex justify-between text-sm mt-[-8px]">
//             <p
//               onClick={() => toast.info("Coming soon!", { autoClose: 1300 })}
//               className="text-gray-400 cursor-not-allowed"
//             >
//               Forgot Password?
//             </p>
//             <p
//               onClick={() => navigate("/register")}
//               className="text-gray-600 cursor-pointer"
//             >
//               Create Account
//             </p>
//           </div>
//           <div className="w-full flex justify-between text-sm mt-[-8px]">
//             <button
//               type="button"
//               className="btn btn-soft bg-black text-white font-light mt-4"
//             >
//               Admin Login
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn btn-soft bg-black text-white font-light px-8 mt-4"
//             >
//               {isSubmitting ? "Signing In..." : "Sign In"}
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuthStore } from "../store";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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
        <Form className="min-h-screen flex flex-col justify-center items-center w-[90%] sm:max-w-2xl m-auto gap-4 text-gray-800">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-600 py-6">
              <h2 className="text-center text-3xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="text-center text-gray-300 mt-1">
                Sign in to your account
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <Field
                    name="email"
                    placeholder="Enter Your Email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Coming soon!", { autoClose: 1300 })
                    }
                    className="text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400" />
                    ) : (
                      <Eye size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  {isSubmitting ? (
                    "Signing In..."
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  onClick={() => toast.info("Admin login coming soon!")}
                >
                  <User size={18} className="mr-2" />
                  Admin Login
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-medium text-gray-700 hover:text-black ml-1"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
