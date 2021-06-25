import React from "react";
import { FormField, Label } from "semantic-ui-react";
import { useField } from "formik";

const MFBTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label style={{ fontWeight: "bold", fontSize: "medium" }}>
        {props.placeholder}
      </label>
      <input {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default MFBTextInput;
