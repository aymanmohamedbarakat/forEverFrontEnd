// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store";

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const { register } = useAuthStore();

//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   const PhoneRegex = /^\+201[0125]\d{8}$/;

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters long")
//       .max(20, "Password must be at most 20 characters long")
//       .matches(
//         passwordRegex,
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//       ),
//     username: Yup.string()
//       .required("Username is required")
//       .min(2, "Username must be at least 2 characters long"),
//     phone: Yup.string()
//       .required("Phone is required")
//       .matches(PhoneRegex, "Phone number must be digits only")
//       .min(10, "Phone number must be at least 10 digits long"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const res = await register(values);
//       if (res) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
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
//         username: "",
//         phone: "",
//       }}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
//           <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
//             <p className="prata-regular text-3xl">Sign Up</p>
//             <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
//           </div>
//           <div className="w-full">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="username"
//             >
//               Username
//             </label>
//             <Field
//               name="username"
//               placeholder="Enter Your username"
//               className="w-full px-3 py-2 border border-gray-800"
//             />
//             <ErrorMessage
//               name="username"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="phone"
//             >
//               Phone
//             </label>
//             <Field
//               name="phone"
//               placeholder="Enter Your Phone (+201xxxxxxxxx)"
//               className="w-full px-3 py-2 border border-gray-800"
//             />
//             <ErrorMessage
//               name="phone"
//               component="div"
//               className="text-red-500"
//             />
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

//           <div className="w-full flex justify-between text-sm mt-2">
//             <p
//               onClick={() => navigate("/login")}
//               className="text-gray-600 cursor-pointer"
//             >
//               Already have an account?
//             </p>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn btn-soft bg-black text-white font-light px-8 mt-4"
//             >
//               {isSubmitting ? "Signing Up..." : "Sign Up"}
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const PhoneRegex = /^\+201[0125]\d{8}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    username: Yup.string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters long"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(PhoneRegex, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await register(values);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
        username: "",
        phone: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="min-h-screen flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-600 py-6">
              <h2 className="text-center text-3xl font-bold text-white">
                Create Account
              </h2>
              <p className="text-center text-gray-300 mt-1">
                Sign up to get started
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <Field
                    name="username"
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <Field
                    name="phone"
                    placeholder="Enter your phone (+201xxxxxxxxx)"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                    placeholder="Enter your email"
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
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
                <div className="mt-1 text-xs text-gray-500">
                  Password must be 6-20 characters and include uppercase,
                  lowercase, number, and special character.
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  Already have an account?
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  {isSubmitting ? (
                    "Signing up..."
                  ) : (
                    <>
                      Sign up
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
