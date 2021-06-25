import React, { useEffect, useState } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import CityList from "../pages/city/CityList";
import EmployerForFilter from "../pages/employer/EmployerForFilter";
import JobAdvertisementService from "../services/jobAdvertisementService";

const Filter = () => {
  const [employerId, setEmployerId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByStatusIsTrueAndEmployer_IdAndCity_IdOrderByApplicationDeadlineAsc(
        employerId,
        cityId
      )
      .then((result) => setJobAdvertisements(result.data.data));
  }, [cityId, employerId]);

  function handleEmployerId(id) {
    setEmployerId(id);
  }
  function handleCityId(id) {
    setCityId(id);
  }
  return (
    //TODO Düzenlenecek
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>Filtreler</Menu.Header>
      </Menu.Item>
      <Menu.Item>
        <EmployerForFilter setEmployerId={handleEmployerId} />
      </Menu.Item>

      {/*            <Menu.Item>
                <Menu.Header>CMS Solutions</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='rails'

                    />
                    <Menu.Item
                        name='python'

                    />
                    <Menu.Item
                        name='php'
                    />
                </Menu.Menu>
            </Menu.Item>*/}

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
