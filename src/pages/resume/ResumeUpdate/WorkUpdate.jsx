import React, {useEffect, useState} from 'react';
import {Button, Card, Dropdown, Form, Icon, Label} from "semantic-ui-react";
import {Formik} from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import WorkService from "../../../services/workService";

const WorkUpdate = ({id}) => {
    const [works, setWorks] = useState([]);
    const [work, setWork] = useState({});
    useEffect(() => {
        let workService = new WorkService();
        workService.getByStaffId(id).then(result => setWorks(result.data.data))
    }, [id]);
    const initialValues = {
        "workId": "",
        "companyName": "",
        "jobPosition": "",
        "startYear": "",
        "leaveYear": "",
    }
    const schema = yup.object().shape({
        workId: yup.string().required("Bir seçim yapılmalıdır"),
        startYear: yup.string().max(new Date().getFullYear(),"Başlangıç yılı gelecekte olamaz"),
        leaveYear: yup.string().max(new Date().getFullYear(),"İşten ayrılış yılı gelecekte olamaz")
    })
    const workOption = works.map((work, index) => ({
        key: index,
        text: work.companyName + "/" + work.jobPosition,
        value: work.workId
    }));
    const handleReload =  () => {
        window.location.reload();
    }
    const handleWorkValue = (value) => {
        return {
            "workId": value.workId,
            "companyName": value.companyName,
            "jobPosition": value.jobPosition,
            "startYear": value.startYear,
            "leaveYear": value.leaveYear,
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
    }
    const handleChangeSemantic = (prop, value, fieldName) => {
        prop.setFieldValue(fieldName, value);
        if (value !== ""){
            let workService = new WorkService();
            workService.getById(value).then(result => setWork(result.data.data))
        }else{
            setWork({})
        }
    };
    const handleReadOnly = (prop) => {
        return prop.values.workId === "";
    }
    const handleOnSubmit = (values) => {
        values.workId = values.workId !== "" ? values.workId : work.workId ;
        values.companyName = values.companyName !== "" ? values.companyName :work.companyName;
        values.jobPosition = values.jobPosition !== "" ? values.jobPosition : work.jobPosition;
        values.startYear = values.startYear !== "" ? values.startYear :work.startYear;
        values.leaveYear = values.leaveYear !== "" ? values.leaveYear : work.leaveYear;
        let workService = new WorkService();
        workService.update(handleWorkValue(values)).then(result => swal(
            `${result.data.message}`,
            "",
            `${result.data.success ? "success" : "error"}`
        ).then(() => handleReload()))
    }

    const handleWorkDelete = () => {
        if (work.workId !== undefined){
            let workService = new WorkService();
            workService.delete(work.workId).then(result => swal(
                `${result.data.message}`,
                "",

                `${result.data.success ? "success" : "error"}`
            ).then(() => handleReload()))
        }else{
            swal("Bir iş yeri seçiniz","","error").then()
        }
    }

    return (
        <Card color={"teal"} fluid style={{marginTop:20}}>
            <Card.Header  content={"Çalışma Bilgisini Güncelle"}/>
            <Card.Content>
                <Formik  initialValues={initialValues} validationSchema={schema} onSubmit={(values) => {
                    handleOnSubmit(values)
                } }>
                    {(formikprops) => (
                        <Form style={{marginTop:20}} onSubmit={formikprops.handleSubmit}>
                            <Form.Field>
                                <Dropdown  style={{ width: "100%" }}
                                           clearable
                                           item
                                           name="workId"
                                           placeholder="Güncellenecek İş Yeri"
                                           additionPosition="bottom"
                                           search
                                           selection
                                           onChange={(event, data) =>
                                               handleChangeSemantic(formikprops, data.value, "workId")
                                           }
                                           onBlur={formikprops.handleBlur}
                                           value={formikprops.values.workId}
                                           options={workOption}
                                />
                                {formikprops.touched.workId && !!formikprops.errors.workId ? (
                                    <Label pointing basic color={"red"} content={formikprops.errors.workId} />
                                ) : null}
                                <input
                                    style={{marginTop:10}}
                                    name="companyName"
                                    placeholder="Şirket Adı"
                                    readOnly={handleReadOnly(formikprops)}
                                    type="text"
                                    onChange={formikprops.handleChange}
                                    onBlur={formikprops.handleBlur}
                                    value={formikprops.values.companyName}

                                />
                                {formikprops.touched.companyName && !!formikprops.errors.companyName ? (
                                    <Label pointing basic color={"red"} content={formikprops.errors.companyName} />
                                ) : null}

                                <input
                                    style={{marginTop:10}}
                                    placeholder="Çalışma Pozisyonu Adı"
                                    readOnly={handleReadOnly(formikprops)}
                                    type="text"
                                    onChange={formikprops.handleChange}
                                    onBlur={formikprops.handleBlur}
                                    value={formikprops.values.jobPosition}
                                    name="jobPosition"
                                />
                                {formikprops.touched.jobPosition && !!formikprops.errors.jobPosition ? (
                                    <Label pointing basic color={"red"} content={formikprops.errors.jobPosition} />
                                ) : null}
                                <input
                                    style={{marginTop:10}}
                                    placeholder="Başlangıç Yılı"
                                    max={new Date().getFullYear()}
                                    readOnly={handleReadOnly(formikprops)}
                                    type="number"
                                    onChange={formikprops.handleChange}
                                    onBlur={formikprops.handleBlur}
                                    value={formikprops.values.startYear}
                                    name="startYear"
                                />
                                {formikprops.touched.startYear && !!formikprops.errors.startYear ? (
                                    <Label pointing basic color={"red"} content={formikprops.errors.startYear} />
                                ) : null}
                                <input
                                    style={{marginTop:10}}
                                    placeholder="İşten Ayrılış Yılı"
                                    readOnly={handleReadOnly(formikprops)}
                                    type="number"
                                    max={2021}
                                    onChange={formikprops.handleChange}
                                    onBlur={formikprops.handleBlur}
                                    value={formikprops.values.leaveYear}
                                    name="leaveYear"
                                />
                                {formikprops.touched.leaveYear && !!formikprops.errors.leaveYear ? (
                                    <Label pointing basic color={"red"} content={formikprops.errors.leaveYear} />
                                ) : null}
                            </Form.Field>

                            <Card.Header style={{color:"red"}} content={"(Girilmeyen veriler eskisi gibi kalacaktır)"} />
                            <br/>
                            <Button
                                style={{width: "50%"}}
                                type="submit"
                                animated="fade"
                                positive
                            >
                                <Button.Content visible>
                                    <Icon name="check circle" />
                                </Button.Content>
                                <Button.Content hidden>
                                    Güncelle
                                </Button.Content>
                            </Button>




                        </Form>
                    )}
                </Formik>
                <br/>
                <Button
                    style={{width: "50%"}}
                    onClick={() => {
                        handleWorkDelete()
                    }}
                    animated="fade"
                    negative
                >
                    <Button.Content visible>
                        <Icon name="trash alternate" />
                    </Button.Content>
                    <Button.Content hidden>
                        Seçili İş Yerini Sil
                    </Button.Content>
                </Button>
            </Card.Content>


        </Card>

    );
};

export default WorkUpdate;
