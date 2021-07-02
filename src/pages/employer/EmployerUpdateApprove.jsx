import React, { useState, useEffect } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import EmployerUpdateService from "../../services/employerUpdateService";
import EmployerService from "../../services/employerService";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export default function EmployerUpdateApprove() {
  const [updates, setUpdates] = useState([]);
  useEffect(() => {
    let employerUpdateService = new EmployerUpdateService();
    employerUpdateService
      .getAll()
      .then((result) => setUpdates(result.data.data));
  }, []);
  console.log(updates);

  const handleAcceptOnClick = (employerId) => {
    let employerService = new EmployerService();
    employerService.setStatus(employerId);
  };

  const handleRefuseOnClick = (id) => {
    let employerUpdateService = new EmployerUpdateService();
    employerUpdateService
      .delete(id)
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
  };
  return (
    <div style={{ margin: 20 }}>
      <Table>
        <Table.Header style={{ textAlign: "center" }} />
        <Table.Header>
          <Table.Row textAlign={"center"}>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Web Sitesi</Table.HeaderCell>
            <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
            <Table.HeaderCell>Mail Adresi</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {updates.map((updateEmployer) => (
            <Table.Row
              key={updateEmployer.employerUpdateId}
              textAlign={"center"}
            >
              <Table.Cell>{updateEmployer.companyName}</Table.Cell>
              <Table.Cell>{updateEmployer.webAddress}</Table.Cell>
              <Table.Cell>{updateEmployer.phoneNumber}</Table.Cell>
              <Table.Cell>{updateEmployer.email}</Table.Cell>
              <Table.Cell>
                <Button
                  color={"green"}
                  animated="vertical"
                  onClick={() => {
                    handleAcceptOnClick(updateEmployer.employer?.id);
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
                    handleRefuseOnClick(updateEmployer.id);
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
                  to={`/şirketler/${updateEmployer.employer?.id}`}
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
