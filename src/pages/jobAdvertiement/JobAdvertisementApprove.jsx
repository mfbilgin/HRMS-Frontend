import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Link } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import swal from "sweetalert";

export default function JobAdvertisementApprove() {
  const [jobAdvertisement, setJobAdvertisement] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByStatusIsTrueAndApprovedByAdminIsFalse()
      .then((result) => setJobAdvertisement(result.data.data));
  }, []);
  const handleOnClick = (id) => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .approveJobAdvertisement(id)
      .then(
        (result) =>
          swal(
            `${result.data.message}`,
            "",
            `${result.data.success ? "success" : "error"}`
          ),
        window.location.reload()
      );
  };
  return (
    <div style={{ margin: 20 }}>
      <Table>
        <Table.Header style={{ textAlign: "center" }}></Table.Header>
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
                  animated
                  onClick={() => {
                    handleOnClick(jobAdvertisement.id);
                  }}
                >
                  <Button.Content visible>İlanı Onayla</Button.Content>
                  <Button.Content hidden>
                    <Icon name="check circle outline" />
                  </Button.Content>
                </Button>
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
