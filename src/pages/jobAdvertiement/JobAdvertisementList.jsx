import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Link } from "react-router-dom";
import Filter from "../../layouts/Filter";

const JobAdvertisementList = () => {
  const [jobAdvertisement, setJobAdvertisement] = useState([]);
  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByStatusIsTrueAndOrderByApplicationDeadlineAsc()
      .then((result) => setJobAdvertisement(result.data.data));
  }, []);
  return (
    <div style={{ margin: 20 }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Filter />
          </Grid.Column>
          <Grid.Column width={12}>
            <Table>
              <Table.Header style={{textAlign: "center"}}/>
              <Table.Header>
                <Table.Row textAlign={"center"}>
                  <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                  <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                  <Table.HeaderCell>Şehir</Table.HeaderCell>
                  <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                  <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                  <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {jobAdvertisement.map((jobAdvertisement) => (
                  <Table.Row key={jobAdvertisement.id} textAlign={"center"}>
                    <Table.Cell>
                      {jobAdvertisement.employer.companyName}
                    </Table.Cell>
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
                        animated={"fade"}
                        as={Link}
                        to={`/jobAdvertisementDetails/${jobAdvertisement.id}`}
                      >
                        <Button.Content visible>Detaylara Git</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow alternate circle right outline" color={"olive"} size={"large"}/>
                        </Button.Content>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default JobAdvertisementList;
