import React, { useEffect, useState } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import CityList from "../pages/city/CityList";
import EmployerForFilter from "../pages/employer/EmployerForFilter";
import WorkTimeForFilter from "../pages/workTime/WorkTimeForFilter";
//import JobAdvertisementService from "../services/jobAdvertisementService";

const Filter = () => {
  const [workTimeId, setWorkTimeId] = useState(0);
  const [cityId, setCityId] = useState(0);
  //const [, setJobAdvertisements] = useState([]);

  useEffect(() => {
    //let jobAdvertisementService = new JobAdvertisementService();
    // jobAdvertisementService
    //   .getByStatusIsTrueAndEmployer_IdAndCity_IdOrderByApplicationDeadlineAsc(
    //     employerId,
    //     cityId
    //   )
    //   .then((result) => setJobAdvertisements(result.data.data));
  }, [cityId, workTimeId]);

  function handleWorkTimeId(id) {
    setWorkTimeId(id);
  }
  function handleCityId(id) {
    setCityId(id);
  }
  return (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>Filtreler</Menu.Header>
      </Menu.Item>
      <Menu.Item>
        <WorkTimeForFilter setWorkTimeId={handleWorkTimeId} />
      </Menu.Item>

      <Menu.Item>
        <CityList setCityId={handleCityId} />
      </Menu.Item>

      <Menu.Item>
        <Button
          animated
          color={"blue"}
          onClick={() => {
            console.log("Tıklandı");
          }}
        >
          <Button.Content visible>UYGULA</Button.Content>
          <Button.Content hidden>
            <Icon name={"location arrow"} />
          </Button.Content>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Filter;
