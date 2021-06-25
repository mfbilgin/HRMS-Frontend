import React, {useEffect, useState} from 'react';
import CityService from "../Services/cityService";
import {Dropdown} from "semantic-ui-react";

const CityList = () => {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        let cityService = new CityService();
        cityService.getCities().then(result => setCities(result.data.data));
    }, []);
    const cityOption = cities.map((city, index) => ({
        key: index,
        text: city.name,
        value: city.id,
    }));
    return (
        <div>
            Şehir
            <br/>
            <br/>
        <Dropdown

            pointing={"left"}
            clearable
            item
            placeholder="Şehirler "
            options={cityOption}
            onChange={(event, data) => {
            console.log(data.value)
            }
            }
        />
        </div>
    );
}

export default CityList;
