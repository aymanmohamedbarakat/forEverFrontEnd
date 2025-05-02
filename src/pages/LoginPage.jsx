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
        <Form className="flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
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


// import React, { useState } from "react";
// import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";

// // Mock functions to simulate the actual functionality
// const mockNavigate = (path) => console.log(`Navigating to: ${path}`);
// const mockLogin = async (email, password) => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return { success: true };
// };
// const mockToast = {
//   info: (msg) => console.log(`Info: ${msg}`),
//   error: (msg) => console.log(`Error: ${msg}`)
// };

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const validateEmail = (value) => {
//     if (!value) {
//       return "Email is required";
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(value)) {
//       return "Invalid email format";
//     }
//     return "";
//   };

//   const validatePassword = (value) => {
//     if (!value) {
//       return "Password is required";
//     }
//     return "";
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     setEmailError(validateEmail(value));
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     setPasswordError(validatePassword(value));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate inputs
//     const emailValidationResult = validateEmail(email);
//     const passwordValidationResult = validatePassword(password);
    
//     setEmailError(emailValidationResult);
//     setPasswordError(passwordValidationResult);
    
//     if (emailValidationResult || passwordValidationResult) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const res = await mockLogin(email, password);
//       if (res.success) {
//         const redirect = localStorage.getItem("redirect");
//         if (redirect) {
//           mockNavigate(redirect);
//           localStorage.removeItem("redirect");
//         } else {
//           mockNavigate("/");
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       mockToast.error("Invalid credentials. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-gray-900 to-gray-600 py-6">
//           <h2 className="text-center text-3xl font-bold text-white">Welcome Back</h2>
//           <p className="text-center text-gray-300 mt-1">Sign in to your account</p>
//         </div>

//         <div className="px-8 py-6 space-y-6">
//           <div>
//             <label
//               className="block text-sm font-medium text-gray-700 mb-1"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail size={18} className="text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 placeholder="Your email address"
//                                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
//               />
//             </div>
//             {emailError && (
//               <div className="mt-1 text-sm text-red-600">{emailError}</div>
//             )}
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label
//                 className="block text-sm font-medium text-gray-700"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <button
//                 type="button"
//                 onClick={() => mockToast.info("Coming soon!", { autoClose: 1300 })}
//                 className="text-sm font-medium text-gray-600 hover:text-gray-800"
//               >
//                 Forgot password?
//               </button>
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock size={18} className="text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={handlePasswordChange}
//                 placeholder="Your password"
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} className="text-gray-400" />
//                 ) : (
//                   <Eye size={18} className="text-gray-400" />
//                 )}
//               </button>
//             </div>
//             {passwordError && (
//               <div className="mt-1 text-sm text-red-600">{passwordError}</div>
//             )}
//           </div>

//           <div className="flex flex-col space-y-4">
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//             >
//               {isSubmitting ? (
//                 "Signing in..."
//               ) : (
//                 <>
//                   Sign in
//                   <ArrowRight size={18} className="ml-2" />
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={() => mockToast.info("Admin login coming soon!")}
//               className="w-full flex justify-center items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
//             >
//               <User size={18} className="mr-2" />
//               Admin Login
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => mockNavigate("/register")}
//                 className="font-medium text-gray-700 hover:text-black"
//               >
//                 Create Account
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }