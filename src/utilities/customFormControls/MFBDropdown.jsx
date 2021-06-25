import React from "react";
import { useField } from "formik";
import { FormField, Label, Dropdown } from "semantic-ui-react";
const MFBDropdown = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <Dropdown {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <Label pointing basic color="red" content={meta.error}></Label>
      ) : null}
    </FormField>
  );
};

export default MFBDropdown;
