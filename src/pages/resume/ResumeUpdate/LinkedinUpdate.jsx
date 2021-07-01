import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import swal from "sweetalert";
import {Button, Form, Grid, Icon} from "semantic-ui-react";
import MFBTextInput from "../../../utilities/customFormControls/MFBTextInput";
import {Formik} from "formik";
import LinkedinService from "../../../services/linkedinService";

const LinkedinUpdate = ({id}) => {
    const [linkedin, setLinkedin] = useState({});

    useEffect(() => {
        let linkedinService = new LinkedinService();
        linkedinService.getByStaffId(id).then(result => setLinkedin(result.data.data));
    }, [id]);

    const initialValue = {
        "id": linkedin.id,
        "accountAddress": "",
        "staff": {
            "id": id,
            "email": "",
            "password": "",
            "firstName": "",
            "lastName": "",
            "identificationNumber": "",
            "birthYear": "",
            "verifiedByEmail": true
        }
    }
    const schema = yup.object().shape({
        accountAddress: yup.string().required("Bu alan zorunludur")
    })
    const handleOnSubmit = (values) => {
        values.id = linkedin.id
        let linkedinService = new LinkedinService();
        linkedinService.update(values).then(result => swal(
            `${result.data.message}`,
            "",
            `${result.data.success ? "success" : "error"}`
        ))
    }
    return (
        <Formik initialValues={initialValue}  onSubmit={(values) => {
            handleOnSubmit(values)
        }} validationSchema={
            schema
        }>
            {(formikprops) => (
                <div>
                    <Form onSubmit={formikprops.handleSubmit}>

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Form.Field>
                                        <MFBTextInput
                                            style={{width: "100%"}}
                                            type="text"
                                            value={formikprops.values.accountAddress}
                                            placeholder="Linkedin Adresi (https://www.linkedin.com/in/KullaniciAdi)"
                                            name="accountAddress"
                                            onChange={formikprops.handleChange}
                                            onBlur={formikprops.handleBlur}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Button
                                        style={{width: "50%"}}
                                        type="submit"
                                        animated="fade"
                                        positive
                                    >
                                        <Button.Content visible>
                                            <Icon name="check circle"/>
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Güncelle
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default LinkedinUpdate;
