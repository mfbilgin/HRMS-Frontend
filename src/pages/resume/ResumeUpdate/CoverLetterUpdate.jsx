import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Button, Form, Grid, Icon} from "semantic-ui-react";
import CoverLetterService from "../../../services/coverLetterService"
import MFBTextInput from "../../../utilities/customFormControls/MFBTextInput";
import swal from "sweetalert"
import * as yup from "yup";

const CoverLetterUpdate = ({id}) => {
    const [coverLetter, setCoverLetter] = useState({});

    useEffect(() => {
        let coverLetterService = new CoverLetterService();
        coverLetterService.getByStaffId(id).then(result => setCoverLetter(result.data.data));
    }, [id]);
    const initialValue = {
        "id": coverLetter.id,
        "content": "",
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
    const schema = yup.object().shape(
        {content: yup.string().required("Bu alan zorunludur")}
    )
    const handleOnSubmit = (values) => {
        values.id = coverLetter.id
        let coverLetterService = new CoverLetterService();
        coverLetterService.update(values).then(result => swal(
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
                                            value={formikprops.values.content}
                                            placeholder="Ön Yazı"
                                            name="content"
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

export default CoverLetterUpdate;
