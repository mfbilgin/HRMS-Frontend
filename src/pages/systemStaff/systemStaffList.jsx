import React, { useEffect } from "react";
import { useState } from "react";
import SystemStaffService from "../../services/systemStaffService";

export default function systemStaffList() {
  const [systemStaff, setSystemStaff] = useState([]);
  useEffect(() => {
    let systemStaffService = new SystemStaffService();
    systemStaffService
      .getAll()
      .then((result) => setSystemStaff(result.data.data));
  }, []);
  return (
    <div style={{ margin: 20 }}>
      <Table>
        <Table.Header style={{ textAlign: "center" }}></Table.Header>
        <Table.Header>
          <Table.Row textAlign={"center"}>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAdvertisement.map((jobAdvertisement) => (
            <Table.Row key={jobAdvertisement.id} textAlign={"center"}>
              <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
              <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
              <Table.Cell>{jobAdvertisement.city.name}</Table.Cell>
              <Table.Cell>{jobAdvertisement.workType.name}</Table.Cell>
              <Table.Cell>{jobAdvertisement.workTime?.name}</Table.Cell>
              <Table.Cell>
                {jobAdvertisement.applicationDeadline.toString()}
              </Table.Cell>
              <Table.Cell>
                <Button
                  color={"grey"}
                  animated
                  as={Link}
                  to={`/jobAdvertisementDetails/${jobAdvertisement.id}`}
                >
                  <Button.Content visible>Detaylara Git</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
