import React, { useEffect } from "react";
import { useState } from "react";
import SystemStaffService from "../../services/systemStaffService";
import { Button, Icon, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function SystemStaffList() {
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
        <Table.Header style={{textAlign: "center"}}/>
        <Table.Header>
          <Table.Row textAlign={"center"}>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {systemStaff.map((systemStaff) => (
            <Table.Row key={systemStaff.id} textAlign={"center"}>
              <Table.Cell>{systemStaff.firstName}</Table.Cell>
              <Table.Cell>{systemStaff.lastName}</Table.Cell>
              <Table.Cell>{systemStaff.birthYear}</Table.Cell>
              <Table.Cell>
                <Button
                  color={"green"}
                  animated="fade"
                  as={Link}
                  to={`/sistemÇalışanBilgileriGüncelle/${systemStaff.id}`}
                >
                  <Button.Content visible>Güncelle</Button.Content>
                  <Button.Content hidden>
                    <Icon name="pencil alternate" />
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
