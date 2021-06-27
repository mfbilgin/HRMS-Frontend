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
import SystemStaffList from "../pages/systemStaff/SystemStaffList";
import SystemStaffUpdate from "../pages/systemStaff/SystemStaffUpdate";
import FavoriteList from "./Favorite/FavoriteList";


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
            exact
            path={"/jobAdvertisementDetails/:id"}
            component={JobAdvertisementDetail}
          />
          <Route
            exact
            path={"/işİlanıOnayla"}
            component={JobAdvertisementApprove}
          />
          <Route exact path={"/curriculumVitaes"} component={ResumeList} />
          <Route
            exact
            path={"/curriculumVitaeDetails/:id"}
            component={ResumeDetail}
          />
          <Route exact path={"/şirketler/:id"} component={EmployerDetail} />
          <Route exact path={"/ilanEkle"} component={JobAdvertisementAdd} />
          <Route
            exact
            path={"/sistemÇalışanları"}
            component={SystemStaffList}
          />
          <Route
            exact
            path={"/sistemÇalışanBilgileriGüncelle/:id"}
            component={SystemStaffUpdate}
          />
          <Route
              exact
              path={"/favorilerim"}
              component={FavoriteList}
          />

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
