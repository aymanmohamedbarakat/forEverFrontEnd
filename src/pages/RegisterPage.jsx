// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import * as Yup from "yup";
// import { AuthRepo } from "../data/Repo/Authentication";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../Hooks/authStore";
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

//   const handleSubmit = (values) => {
//     AuthRepo.register(values)
//       .then((res) => {
//         res && sessionStorage.setItem("token", res.jwt);
//         res && sessionStorage.setItem("user", JSON.stringify(res.user));
//         navigate("/");
//         res &&
//           toast.success(`ya welcome , ya ${res.user.username}`, {
//             autoClose: 2000,
//           });
//       })
//       .catch((err) => toast.error(err.message));
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
//       {({isSubmitting })=>(
//               <Form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-800">
//         <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
//           <p className="prata-regular text-3xl">Sign Up</p>
//           <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
//         </div>
//         <div className="w-full">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="username"
//           >
//             username
//           </label>
//           <Field
//             name="username"
//             placeholder="Enter Your username"
//             className="w-full px-3 py-2 border border-gray-800"
//           />
//           <ErrorMessage
//             name="username"
//             component="div"
//             className="text-red-500"
//           />
//         </div>
//         <div className="w-full">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="phone"
//           >
//             Phone
//           </label>
//           <Field
//             name="phone"
//             placeholder="Enter Your Phone"
//             className="w-full px-3 py-2 border border-gray-800"
//           />
//           <ErrorMessage name="phone" component="div" className="text-red-500" />
//         </div>

//         <div className="w-full">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <Field
//             name="email"
//             placeholder="Enter Your Email"
//             className="w-full px-3 py-2 border border-gray-800"
//           />
//           <ErrorMessage name="email" component="div" className="text-red-500" />
//         </div>

//         <div className="w-full">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <Field
//             name="password"
//             type="password"
//             placeholder="password"
//             className="w-full px-3 py-2 border border-gray-800"
//           />
//           <ErrorMessage
//             name="password"
//             component="div"
//             className="text-red-500"
//           />
//         </div>

//         {/* <div className="w-full flex justify-between text-sm mt-[-8px]">
//               <p
//                 onClick={() => toast.info("Coming soon!")}
//                 className="text-gray-400 cursor-not-allowed"
//               >
//                 Forgot Password?
//               </p>
//               <p
//                 onClick={() => navigate("/")}
//                 className="text-gray-600 cursor-pointer"
//               >
//                 Create Account
//               </p>
//             </div> */}
//         <div className="w-full flex justify-center text-sm mt-[-8px]">
//           <button
//             type="submit"
//             // disabled={isSubmitting}
//             className="btn btn-soft bg-black text-white font-light px-8  mt-4 "
//           >
//             {isSubmitting ? "Signing Up..." : "Sign Up"}
//           </button>
//         </div>
//       </Form>
//       )}

//     </Formik>
//   );
// }

import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Hooks/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();

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
        <Form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
            <p className="prata-regular text-3xl">Sign Up</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <Field
              name="username"
              placeholder="Enter Your username"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone
            </label>
            <Field
              name="phone"
              placeholder="Enter Your Phone (+201xxxxxxxxx)"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
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

          <div className="w-full flex justify-between text-sm mt-2">
            <p
              onClick={() => navigate("/login")}
              className="text-gray-600 cursor-pointer"
            >
              Already have an account?
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-soft bg-black text-white font-light px-8 mt-4"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
