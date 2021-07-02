import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import EmployerService from "../../services/employerService";
import * as yup from "yup";
import swal from "sweetalert";
import { Button, Card, FormField, Form, Icon } from "semantic-ui-react";
import { Formik } from "formik";
import MFBTextInput from "../../utilities/customFormControls/MFBTextInput";

export default function EmployerUpdate() {
  let { id } = useParams();
  const [employer, setEmployer] = useState({});
  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getById(id).then((result) => setEmployer(result.data.data));
  }, [id]);

  const initialValues = {
    id: id,
    companyName: "",
    webAddress: "",
    phoneNumber: "",
    email: "",
    password: "",
    activatedBySystemStaff: false,
    verifiedByEmail: true,
  };
  const schema = yup.object().shape({
    email: yup.string().email("Geçerli bir mail formatı giriniz."),
  });
  const handleValues = (values) => {
    if (values.email === "") {
      values.email = employer.email;
    }
    if (values.password === "") {
      values.password = employer.password;
    }
    if (values.companyName === "") {
      values.companyName = employer.companyName;
    }
    if (values.webAddress === "") {
      values.webAddress = employer.webAddress;
    }
    if (values.phoneNumber === "") {
      values.phoneNumber = employer.phoneNumber;
    }
  };
  const handleOnSubmit = (values) => {
    handleValues(values);
    let employerService = new EmployerService();
    employerService
      .update(values)
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        )
      );
  };

  return (
    <div>
      <Card
        fluid
        color="teal"
        style={{ marginTop: 20 }}
        header={"Bilgileri Güncelle"}
      />
      <Card fluid={true}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {(formikprops) => (
            <div>
              <Form
                onClick={() => {
                  handleValues(formikprops.values);
                }}
                onSubmit={formikprops.handleSubmit}
              >
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder={"Şirket Adı"}
                    name={"companyName"}
                    value={formikprops.values.companyName}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>

                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Web Sitesi (www.example.com)"
                    name={"webAddress"}
                    value={formikprops.values.webAddress}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Telefon Numarası (Başında 0 olmadan boşluksuz şekilde)"
                    name={"phoneNumber"}
                    value={formikprops.values.phoneNumber}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Mail Adresi"
                    name={"email"}
                    value={formikprops.values.email}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Parola"
                    name={"password"}
                    type={"password"}
                    value={formikprops.values.password}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <Button color={"green"} animated={"fade"} type={"submit"}>
                    <Button.Content visible>Güncelle</Button.Content>
                    <Button.Content hidden>
                      <Icon name={"pencil"} />
                    </Button.Content>
                  </Button>
                </FormField>
              </Form>
            </div>
          )}
        </Formik>
      </Card>
    </div>
  );
}
