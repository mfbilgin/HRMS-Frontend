import React, { useEffect, useState } from "react";
import LanguageService from "../../../services/languageService";
import { Button, Card, Dropdown, Form, Icon, Label } from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

export default function LanguageUpdate({ id }) {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState({});
  useEffect(() => {
    let languageService = new LanguageService();
    languageService
      .getByStaffId(id)
      .then((result) => setLanguages(result.data.data));
  }, [id]);
  const initialValues = {
    languageId: "",
    name: "",
    level: "",
  };
  const schema = yup.object().shape({
    languageId: yup.string().required("Bir seçim yapılmalıdır"),
    level: yup
      .number("", "Lütfen geçerli bir değer giriniz")
      .min(1, "Dil seviyesi en az 1 olmalıdır")
      .max(5, "Dil seviyesi en fazla 5 olabilir"),
  });
  const languageOption = languages.map((language, index) => ({
    key: index,
    text: language.name + "/" + language.level,
    value: language.languageId,
  }));

  const handleLanguageValue = (value) => {
    return {
      languageId: value.languageId,
      level: value.level,
      name: value.name,
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
      let languageService = new LanguageService();
      languageService
        .getById(value)
        .then((result) => setLanguage(result.data.data));
    } else {
      setLanguage({});
    }
  };
  const handleReadOnly = (prop) => {
    return prop.values.languageId === "";
  };
  const handleOnSubmit = (values) => {
    values.languageId =
      values.languageId !== "" ? values.languageId : language.languageId;
    values.level = values.level !== "" ? values.level : language.level;
    values.name = values.name !== "" ? values.name : language.name;
    let languageService = new LanguageService();
    languageService
      .update(handleLanguageValue(values))
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
  };

  const handleSchoolDelete = () => {
    if (language.schoolId !== undefined) {
      let languageService = new LanguageService();
      languageService.delete(language.schoolId).then((result) =>
        swal(
          `${result.data.message}`,
          "",

          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
    } else {
      swal("Bir dil seçiniz", "", "error").then();
    }
  };

  return (
    <Card color={"teal"} fluid style={{ marginTop: 20 }}>
      <Card.Header content={"Dil Bilgisini Güncelle"} />
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
                  name="languageId"
                  placeholder="Güncellenecek Dil"
                  additionPosition="bottom"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(formikprops, data.value, "languageId")
                  }
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.languageId}
                  options={languageOption}
                />
                {formikprops.touched.languageId &&
                !!formikprops.errors.languageId ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.languageId}
                  />
                ) : null}
                <input
                  style={{ marginTop: 10 }}
                  name="name"
                  placeholder="Dil Adı"
                  readOnly={handleReadOnly(formikprops)}
                  type="text"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.name}
                />
                {formikprops.touched.name && !!formikprops.errors.name ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.name}
                  />
                ) : null}

                <input
                  style={{ marginTop: 10 }}
                  placeholder="Seviye (1-5)"
                  readOnly={handleReadOnly(formikprops)}
                  type="text"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.level}
                  name="level"
                />
                {formikprops.touched.level && !!formikprops.errors.level ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.level}
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
}
