import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Link, useHistory } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import swal from "sweetalert";

export default function JobAdvertisementApprove() {
  const [jobAdvertisement, setJobAdvertisement] = useState([]);
  let history = useHistory();
  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByStatusIsTrueAndApprovedByAdminIsFalse()
      .then((result) => setJobAdvertisement(result.data.data));
  }, []);
  const handleAcceptOnClick = (id) => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .approveJobAdvertisement(id)
      .then((result) => swal(`${result.data.message}`,"",`${result.data.success ? "success" : "error"}`));
    handleReload();
  };
  const handleRefuseOnClick = (jobAdvertisement) => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .delete(jobAdvertisement)
      .then((result) => swal(`${result.data.message}`,"",`${result.data.success ? "success" : "error"}`));
    handleReload();
  };

  let handleReload = () => {
    if (jobAdvertisement.length > 1) {
      window.location.reload();
    } else {
      history.push("/");
    }
  };
  return (
    <div style={{ margin: 20 }}>
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
            <Table.HeaderCell />
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
                  color={"green"}
                  animated="vertical"
                  onClick={() => {
                    handleAcceptOnClick(jobAdvertisement.id);
                  }}
                >
                  <Button.Content visible>Onayla</Button.Content>
                  <Button.Content hidden>
                    <Icon name="check circle outline" />
                  </Button.Content>
                </Button>
              </Table.Cell>

              <Table.Cell>
                <Button
                  color={"red"}
                  animated="vertical"
                  onClick={() => {
                    handleRefuseOnClick(jobAdvertisement);
                  }}
                >
                  <Button.Content visible>Reddet</Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash alternate outline" />
                  </Button.Content>
                </Button>
              </Table.Cell>

              <Table.Cell>
                <Button
                  color={"grey"}
                  animated="vertical"
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
