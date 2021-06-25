import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import WorkTimeService from "../../services/workTimeService";
import WorkTypeService from "../../services/workTypeService";
import CityService from "../../services/cityService";
import JobPositionService from "../../services/JobPositionService";
import MFBTextArea from "../../utilities/customFormControls/MFBTextArea";
import MFBTextInput from "../../utilities/customFormControls/MFBTextInput";
import swal from "sweetalert";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Form, Grid, Card, Dropdown, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";
const JobAdvertisementAdd = () => {
  function handleJobAdvertisementValue(values) {
    let jobAdvertisement = {
      employer: {
        activatedBySystemStaff: true,
        companyName: "string",
        email: "string",
        id: values.employerId,
        jobAdvertisements: [null],
        password: "string",
        phoneNumber: "string",
        verifiedByEmail: true,
        webAddress: "string",
      },
      city: {
        id: values.cityId,
        jobAdvertisements: [null],
        name: "string",
      },
      jobPosition: {
        jobAdvertisements: [null],
        jobPositionId: values.jobPositionId,
        name: "string",
      },

      workTime: {
        id: values.workTimeId,
        joAdvertisements: [null],
        name: "string",
      },

      workType: {
        id: values.workTypeId,
        jobAdvertisements: [null],
        name: "string",
      },

      applicationDeadline: values.applicationDeadline,
      emptyPositionCount: values.emptyPositionCount,
      id: 0,
      jobDescription: values.jobDescription,
      maxSalary: values.maxSalary,
      minSalary: values.minSalary,
      releaseDate: "2000-01-01",
      status: true,
    };

    return jobAdvertisement;
  }

  let jobAdvertisementService = new JobAdvertisementService();
  const initialValues = {
    employerId: "",
    jobDescription: "",
    jobPositionId: "",
    workTimeId: "",
    workTypeId: "",
    emptyPositionCount: "",
    cityId: "",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
  };
  const JobAdvertAddSchema = Yup.object().shape({
    applicationDeadline: Yup.date()
      .nullable()
      .required("Son başvuru tarihi boş geçilemez")
      .min(
        new Date(Date.now() - 86400000),
        "Son başvuru tarihi geçmişte olamaz"
      ),
    jobDescription: Yup.string().required("İş tanımı boş geçilemez"),
    jobPositionId: Yup.string().required("İş pozisyonu seçilmelidir."),
    workTimeId: Yup.string().required("Çalışma zamanı seçilmelidir"),
    workTypeId: Yup.string().required("Çalışma yeri seçilmelidir"),
    emptyPositionCount: Yup.number()
      .required("Açık pozisyon adedi boş geçilemez")
      .positive("Açık pozisyon adedi 1'den küçük olamaz")
      .integer(),
    cityId: Yup.string().required("Şehir seçilmelidir"),
    minSalary: Yup.number().min(0, "0'dan küçük olamaz"),
    maxSalary: Yup.number().min(0, "Minimum maaştan küçük olamaz."),
  });
  const [workTimes, setWorkTimes] = useState([]);
  const [workTypes, setWorkType] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workTimeService = new WorkTimeService();
    let workPlaceService = new WorkTypeService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTimes(result.data.data));
    workPlaceService
      .getWorkType()
      .then((result) => setWorkType(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.name,
    value: workTime.id,
  }));
  const workTypeOption = workTypes.map((workType, index) => ({
    key: index,
    text: workType.name,
    value: workType.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.name,
    value: jobPosition.jobPositionId,
  }));

  // const handleOnChange = (props, fieldName, value) => {
  //   props.setFieldValue(fieldName, value);
  // };
  const handleChangeSemantic = (prop, value, fieldName) => {
    prop.setFieldValue(fieldName, value);
  };
  let history = useHistory();
  const handleOnClick = (prop) => {
    prop.values.employerId = 5;
    jobAdvertisementService
      .add(handleJobAdvertisementValue(prop.values))
      .then(
        (result) =>
          swal(
            `${result.data.message}`,
            `${result.data.success ? "İş ilanı onaylanacak" : "Hata"}`,
            `${result.data.success ? "success" : "error"}`
          ),
        history.push("/")
      );
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header
          content="İş İlanı Ekleme Formu"
          style={{ fontWeight: "bold", color: "darkred" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={JobAdvertAddSchema}
        >
          {(formikprops) => (
            <div>
              <Form style={{ marginTop: 20 }}>
                <Form.Field style={{ textAlign: "center" }}>
                  <label style={{ fontSize: 15 }}>Şehirler</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Şehir"
                    additionPosition="bottom"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(formikprops, data.value, "cityId")
                    }
                    onBlur={formikprops.onBlur}
                    name="cityId"
                    value={formikprops.values.cityId}
                    options={cityOption}
                  />
                  {formikprops.errors.cityId && formikprops.touched.cityId && (
                    <div className={"ui pointing red basic label"}>
                      {formikprops.errors.cityId}
                    </div>
                  )}
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: 15 }}>İş Pozisyonu</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="İş Pozisyonu"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(
                        formikprops,
                        data.value,
                        "jobPositionId"
                      )
                    }
                    onBlur={formikprops.onBlur}
                    name="jobPositionId"
                    value={formikprops.values.jobPositionId}
                    options={jobPositionOption}
                  />
                  {formikprops.errors.jobPositionId &&
                    formikprops.touched.jobPositionId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.jobPositionId}
                      </div>
                    )}
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: 15 }}>Çalışma Yeri</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Çalışma Yeri"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(
                        formikprops,
                        data.value,
                        "workTypeId"
                      )
                    }
                    onBlur={formikprops.onBlur}
                    name="cityId"
                    value={formikprops.values.workTypeId}
                    options={workTypeOption}
                  />
                  {formikprops.errors.workTypeId &&
                    formikprops.touched.workTypeId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.workTypeId}
                      </div>
                    )}
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: 15 }}>Çalışma Zamanı</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Çalışma Zamanı"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(
                        formikprops,
                        data.value,
                        "workTimeId"
                      )
                    }
                    onBlur={formikprops.onBlur}
                    name="workTimeId"
                    value={formikprops.values.workTimeId}
                    options={workTimeOption}
                  />
                  {formikprops.errors.workTimeId &&
                    formikprops.touched.workTimeId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.workTimeId}
                      </div>
                    )}
                </Form.Field>
                <Grid stackable>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <MFBTextInput
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Minimum maas (opsiyonel)"
                        value={formikprops.values.minSalary}
                        name="minSalary"
                        onChange={formikprops.handleChange}
                        onBlur={formikprops.handleBlur}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <MFBTextInput
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Maximum Maaş (opsiyonel)"
                        value={formikprops.values.maxSalary}
                        name="maxSalary"
                        onChange={formikprops.handleChange}
                        onBlur={formikprops.handleBlur}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <MFBTextInput
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Boş pozisyon adedi"
                        value={formikprops.values.emptyPositionCount}
                        name="emptyPositionCount"
                        onChange={formikprops.handleChange}
                        onBlur={formikprops.handleBlur}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <MFBTextInput
                        style={{ width: "100%" }}
                        type="date"
                        onChange={formikprops.handleChange}
                        value={formikprops.values.applicationDeadline}
                        onBlur={formikprops.handleBlur}
                        name="applicationDeadline"
                        placeholder="Son başvuru tarihi"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid>

                <Form.Field>
                  <MFBTextArea
                    value={formikprops.values.jobDescription}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                    style={{ minHeight: 100 }}
                    name={"jobDescription"}
                    placeholder={"İş Tanımı"}
                  />
                </Form.Field>

                <Button
                  type="submit"
                  onClick={() => {
                    handleOnClick(formikprops);
                  }}
                  animated="vertical"
                  color="google plus"
                  style={{ height: "28%", width: "15%", marginTop: "12px" }}
                >
                  <Button.Content visible>
                    <Icon name="check circle" size="big" />
                  </Button.Content>
                  <Button.Content style={{ fontSize: "medium" }} hidden>
                    Ekle
                  </Button.Content>
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      </Card.Content>
    </Card>
  );
};

export default JobAdvertisementAdd;
