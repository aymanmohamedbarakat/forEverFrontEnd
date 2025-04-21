import { Field, Form, Formik } from "formik";
import React from "react";

export default function NewsLetterBox() {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui ex
        veritatis.
      </p>
      <Formik>
        <Form className="w-full sm:w-1/2 m-auto flex items-center gap-2 mx-auto my-6 pl-3 border border-gray-200">
          <Field
            name="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 outline-none "
          />
          <button className="btn btn-neutral">SUBSCRIBE</button>
        </Form>
      </Formik>
    </div>
  );
}
