import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SystemStaffService from "../../services/systemStaffService";
import * as Yup from "yup";
import {Button, Card, Form, Icon} from "semantic-ui-react";
import { Formik } from "formik";
import MFBTextInput from "../../utilities/customFormControls/MFBTextInput";
export default function SystemStaffUpdate() {
  let { id } = useParams();
  const [systemStaff, setSystemStaff] = useState({});
  useEffect(() => {
    let systemStaffService = new SystemStaffService();

    systemStaffService
      .getById(id)
      .then((result) => setSystemStaff(result.data.data));
  }, [id]);


  let initialValues = {
    birthYear: systemStaff.birthYear,
    email: systemStaff.email,
    firstName: systemStaff.firstName,
    id: id,
    identificationNumber: systemStaff.identificationNumber,
    lastName: systemStaff.lastName,
    password: "",
    verifiedByEmail: true,
  };
  const schema = Yup.object().shape({
    birthYear: Yup.string().required("Doğum yılı boş geçilemez"),
    email: Yup.string().required("Mail adresi boş geçilemez"),
    firstName: Yup.string().required("İsim boş geçilemez"),
    lastName: Yup.string().required("Soyisim boş geçilemez"),
    identificationNumber: Yup.string().required(
      "Kimlik numarası boş geçilemez"
    ),
  });

  return (
    <Card fluid color="blue">
      <Card.Content>
        <Card.Header
          content="Bilgiler Güncelle"
          style={{ fontWeight: "bold", color: "teal" }}
        />
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={() => console.log("a")}>
          {(formikprops) => (
            <div>
              <Form>
                <Form.Field>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="İsim"
                    name={"firstName"}
                    value={formikprops.values.firstName}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </Form.Field>

                <Form.Field>
                  <MFBTextInput
                      style={{ width: "100%" }}
                      placeholder="İsim"
                      name={"firstName"}
                      value={formikprops.values.firstName}
                      onChange={formikprops.handleChange}
                      onBlur={formikprops.handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <MFBTextInput
                      style={{ width: "100%" }}
                      placeholder="İsim"
                      name={"firstName"}
                      value={formikprops.values.firstName}
                      onChange={formikprops.handleChange}
                      onBlur={formikprops.handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <MFBTextInput
                      style={{ width: "100%" }}
                      placeholder="İsim"
                      name={"firstName"}
                      value={formikprops.values.firstName}
                      onChange={formikprops.handleChange}
                      onBlur={formikprops.handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <MFBTextInput
                      style={{ width: "100%" }}
                      placeholder="İsim"
                      name={"firstName"}
                      value={formikprops.values.firstName}
                      onChange={formikprops.handleChange}
                      onBlur={formikprops.handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <MFBTextInput
                      style={{ width: "100%" }}
                      placeholder="İsim"
                      name={"firstName"}
                      value={formikprops.values.firstName}
                      onChange={formikprops.handleChange}
                      onBlur={formikprops.handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <Button color={"green"} animated={"fade"} type={"submit"}>
                    <Button.Content visible>
                      Güncelle
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name={"pencil"}/>
                    </Button.Content>
                  </Button>
                </Form.Field>
              </Form>
            </div>
          )}
        </Formik>
      </Card.Content>
    </Card>
  );
}
