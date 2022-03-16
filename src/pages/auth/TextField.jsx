import React from "react";
import { ErrorMessage, useField } from "formik";


/*

  this component will be replacing all text feilds in register/ login pages 
  where it recieve 

  - label
  - input type
  - handle error msgs

  
*/
export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputType = () =>
    props.type === "checkbox" ? "form-check-input" : "form-control";

  const labelType = () => props.type === "checkbox" && "d-none";

  return (
    <div className="mb-2">
      <label htmlFor={field.name} className={`form-label ${labelType()}`}>
        {label}
      </label>
      <input
        className={` ${inputType()}  ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="invalid-feedback"
      />
    </div>
  );
};
