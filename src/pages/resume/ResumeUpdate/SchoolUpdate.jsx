import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Form, Icon, Label } from "semantic-ui-react";
import SchoolService from "../../../services/schoolService";
import { Formik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

const SchoolUpdate = ({ id }) => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState({});
  useEffect(() => {
    let schoolService = new SchoolService();
    schoolService
      .getByStaffId(id)
      .then((result) => setSchools(result.data.data));
  }, [id]);
  const initialValues = {
    schoolId: "",
    schoolName: "",
    department: "",
    startYear: "",
    graduationYear: "",
  };
  const schema = yup.object().shape({
    schoolId: yup.string().required("Bir seçim yapılmalıdır"),
    startYear: yup
      .string()
      .max(new Date().getFullYear(), "Başlangıç yılı gelecekte olamaz"),
    graduationYear: yup
      .string()
      .max(new Date().getFullYear(), "Mezuniyet yılı gelecekte olamaz"),
  });
  const schoolOption = schools.map((school, index) => ({
    key: index,
    text: school.schoolName + "/" + school.department,
    value: school.schoolId,
  }));

  const handleSchoolValue = (value) => {
    return {
      schoolId: value.schoolId,
      schoolName: value.schoolName,
      department: value.department,
      startYear: value.startYear,
      graduationYear: value.graduationYear,
      staff: {
        id: id,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        identificationNumber: "",
        birthYear: "",
        verifiedByEmail: true,
      },
    };
  };
  const handleChangeSemantic = (prop, value, fieldName) => {
    prop.setFieldValue(fieldName, value);
    if (value !== "") {
      let schoolService = new SchoolService();
      schoolService
        .getById(value)
        .then((result) => setSchool(result.data.data));
    } else {
      setSchool({});
    }
  };
  const handleReadOnly = (prop) => {
    return prop.values.schoolId === "";
  };
  const handleOnSubmit = (values) => {
    values.schoolId =
      values.schoolId !== "" ? values.schoolId : school.schoolId;
    values.schoolName =
      values.schoolName !== "" ? values.schoolName : school.schoolName;
    values.department =
      values.department !== "" ? values.department : school.department;
    values.startYear =
      values.startYear !== "" ? values.startYear : school.startYear;
    values.graduationYear =
      values.graduationYear !== ""
        ? values.graduationYear
        : school.graduationYear;
    let schoolService = new SchoolService();
    schoolService
      .update(handleSchoolValue(values))
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
  };

  const handleSchoolDelete = () => {
    if (school.schoolId !== undefined) {
      let schoolService = new SchoolService();
      schoolService.delete(school.schoolId).then((result) =>
        swal(
          `${result.data.message}`,
          "",

          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
    } else {
      swal("Bir okul seçiniz", "", "error").then();
    }
  };
  return (
    <Card color={"teal"} fluid style={{ marginTop: 20 }}>
      <Card.Header content={"Okul Bilgisini Güncelle"} />
      <Card.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {(formikprops) => (
            <Form style={{ marginTop: 20 }} onSubmit={formikprops.handleSubmit}>
              <Form.Field>
                <Dropdown
                  style={{ width: "100%" }}
                  clearable
                  item
                  name="schoolId"
                  placeholder="Güncellenecek Okul"
                  additionPosition="bottom"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(formikprops, data.value, "schoolId")
                  }
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.schoolId}
                  options={schoolOption}
                />
                {formikprops.touched.schoolId &&
                !!formikprops.errors.schoolId ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.schoolId}
                  />
                ) : null}
                <input
                  style={{ marginTop: 10 }}
                  name="schoolName"
                  placeholder="Okul Adı"
                  readOnly={handleReadOnly(formikprops)}
                  type="text"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.schoolName}
                />
                {formikprops.touched.schoolName &&
                !!formikprops.errors.schoolName ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.schoolName}
                  />
                ) : null}

                <input
                  style={{ marginTop: 10 }}
                  placeholder="Bölüm Adı"
                  readOnly={handleReadOnly(formikprops)}
                  type="text"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.department}
                  name="department"
                />
                {formikprops.touched.department &&
                !!formikprops.errors.department ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.department}
                  />
                ) : null}
                <input
                  style={{ marginTop: 10 }}
                  placeholder="Başlangıç Yılı"
                  readOnly={handleReadOnly(formikprops)}
                  type="number"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.startYear}
                  name="startYear"
                />
                {formikprops.touched.startYear &&
                !!formikprops.errors.startYear ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.startYear}
                  />
                ) : null}
                <input
                  style={{ marginTop: 10 }}
                  placeholder="Mezuniyet Yılı"
                  readOnly={handleReadOnly(formikprops)}
                  type="number"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.graduationYear}
                  name="graduationYear"
                />
                {formikprops.touched.graduationYear &&
                !!formikprops.errors.graduationYear ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.graduationYear}
                  />
                ) : null}
              </Form.Field>

              <Card.Header
                style={{ color: "red" }}
                content={"(Girilmeyen veriler eskisi gibi kalacaktır)"}
              />
              <br />
              <Button
                style={{ width: "50%" }}
                type="submit"
                animated="fade"
                positive
              >
                <Button.Content visible>
                  <Icon name="check circle" />
                </Button.Content>
                <Button.Content hidden>Güncelle</Button.Content>
              </Button>
            </Form>
          )}
        </Formik>
        <br />
        <Button
          style={{ width: "50%" }}
          onClick={() => {
            handleSchoolDelete();
          }}
          animated="fade"
          negative
        >
          <Button.Content visible>
            <Icon name="trash alternate" />
          </Button.Content>
          <Button.Content hidden>Seçili Okulu Sil</Button.Content>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default SchoolUpdate;
