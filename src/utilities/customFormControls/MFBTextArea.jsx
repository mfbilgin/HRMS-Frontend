import React from "react";
import { useField } from "formik";
import { FormField, Label, TextArea } from "semantic-ui-react";

const MFBTextArea = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label style={{ fontWeight: "bold", fontSize: "medium" }}>
        {props.placeholder}
      </label>
      <TextArea {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error} />
      ) : null}
    </FormField>
  );
};

export default MFBTextArea;
