import React from "react";
import * as Yup from "yup";
import Title from "../components/Title/Title";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AuthRepo } from "../data/Repo/Authentication";
import { useAuthStore } from "../store";

export default function Profile() {
  const { currentUser, authToken, updateProfile } = useAuthStore();
  const PhoneRegex = /^\+201[0125]\d{8}$/;

  const profileValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be more than 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        PhoneRegex,
        "Phone must be in format +2010xxxxxxxx, +2011xxxxxxxx, +2012xxxxxxxx or +2015xxxxxxxx"
      )
      .min(10, "Must be at least 10 digits")
      .max(15, "Must be less than 15 digits"),
  });

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      // Use the repository to update the profile
      const updatedUserData = await AuthRepo.updateProfile(
        currentUser.id,
        values,
        currentUser,
        authToken
      );

      if (updatedUserData) {
        // Update local state with new user data
        updateProfile({
          ...currentUser,
          username: values.name,
          email: values.email,
          phone: values.phone,
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t  border-gray-200">
      <div className="pt-8">
        <Title text1={"YOUR"} text2={"PROFILE"} />
      </div>

      {currentUser ? (
        <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>

            <Formik
              initialValues={{
                name: currentUser?.username || "",
                email: currentUser?.email || "",
                phone: currentUser?.phone || "",
              }}
              validationSchema={profileValidationSchema}
              onSubmit={handleUpdateProfile}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="name"
                      >
                        Username
                      </label>
                      <Field
                        name="name"
                        placeholder="Enter Your Full Name"
                        className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <Field
                      name="phone"
                      placeholder="Enter Your Phone (e.g., +2010xxxxxxxx)"
                      className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: +201X followed by 8 digits (X can be 0, 1, 2, or
                      5)
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-md transition-colors font-medium ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-800 text-white"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex justify-center items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow-sm rounded-lg mt-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Loading profile
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please wait while we fetch your profile information...
          </p>
        </div>
      )}
    </div>
  );
}
