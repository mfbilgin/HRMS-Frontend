import React, { useEffect, useState } from "react";
import EmployerService from "../../services/employerService";
import { Dropdown } from "semantic-ui-react";

const EmployerForFilter = () => {
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getByIfHaveJobAdvertisement()
      .then((result) => setEmployers(result.data.data));
  }, []);
  const employerOption = employers.map((employer, index) => ({
    key: index,
    text: employer.companyName,
    value: employer.id,
  }));

  return (
    <div>
      Şirket
      <br />
      <br />
      <Dropdown
        style={{ textAlign: "center" }}
        pointing={"left"}
        clearable
        item
        placeholder="Şirketler"
        options={employerOption}
        onChange={(event, data) => {
          console.log(data.value);
        }}
      />
    </div>
  );
};

export default EmployerForFilter;
