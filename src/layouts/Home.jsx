import React from "react";
import { Grid } from "semantic-ui-react";
import JobAdvertisementList from "../pages/jobAdvertiement/JobAdvertisementList";
import { Route } from "react-router-dom";
import JobAdvertisementDetail from "../pages/jobAdvertiement/JobAdvertisementDetail";
import ResumeList from "../pages/resume/ResumeList";
import ResumeDetail from "../pages/resume/ResumeDetail";
import EmployerDetail from "../pages/employer/EmployerDetail";
import JobAdvertisementAdd from "../pages/jobAdvertiement/JobAdvertisementAdd";
import Login from "../pages/auth/Login";
import JobAdvertisementApprove from "../pages/jobAdvertiement/JobAdvertisementApprove";

export default function Home() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Route exact path={"/girişYap"} component={Login} />
          <Route exact path={"/"} component={JobAdvertisementList} />
          <Route
            exact
            path={"/jobAdvertisements"}
            component={JobAdvertisementList}
          />
          <Route
            path={"/jobAdvertisementDetails/:id"}
            component={JobAdvertisementDetail}
          />
          <Route path={"/işİlanıOnayla"} component={JobAdvertisementApprove} />
          <Route exact path={"/curriculumVitaes"} component={ResumeList} />
          <Route
            exact
            path={"/curriculumVitaeDetails/:id"}
            component={ResumeDetail}
          />
          <Route exact path={"/şirketler/:id"} component={EmployerDetail} />
          <Route exact path={"/ilanEkle"} component={JobAdvertisementAdd} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
