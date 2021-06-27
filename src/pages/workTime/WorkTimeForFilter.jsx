import React, {useEffect, useState} from 'react';
import {Dropdown} from "semantic-ui-react";
import WorkTimeService from "../../services/workTimeService";

const WorkTimeForFilter = () => {
    const [workTimes, setWorkTimes] = useState([]);
    useEffect(() => {
        let workTimeService = new WorkTimeService();
        workTimeService
            .getWorkTimes()
            .then((result) => setWorkTimes(result.data.data));
    }, []);
    const workTimeOption = workTimes.map((workTime, index) => ({
        key: index,
        text: workTime.name,
        value: workTime.id,
    }));
    return (
        <div>
            Çalışma Zamanı
            <br />
            <br />
            <Dropdown
                style={{ textAlign: "center" }}
                pointing={"left"}
                clearable
                item
                placeholder="Çalışma Zamanı"
                options={workTimeOption}
                onChange={(event, data) => {
                    window.localStorage.setItem("workTimeId",data.value)
                }}
            />
        </div>
    );
};

export default WorkTimeForFilter;
