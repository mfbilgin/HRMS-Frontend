import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployerService from "../../services/employerService";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import FavoriteService from "../../services/favoriteService";
import { Table, Icon, Header, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import EmployerUpdateService from "../../services/employerUpdateService";

const EmployerDetail = () => {
  let { id } = useParams();
  const [employer, setEmployer] = useState({});
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [update, setUpdate] = useState({});
  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getById(id).then((result) => setEmployer(result.data.data));
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByStatusTrueAndEmployerId(id)
      .then((result) => setJobAdvertisements(result.data.data));
    let employerUpdateService = new EmployerUpdateService();
    employerUpdateService
      .getByEmployerId(id)
      .then((result) => setUpdate(result.data.data));
  }, [id]);
  const favorite = {
    favoriteId: 0,
    jobAdvertisement: {
      id: 0,
      jobDescription: "",
      minSalary: 0,
      maxSalary: 0,
      emptyPositionCount: 0,
      applicationDeadline: "2021-06-30",
      releaseDate: "2021-06-25",
      status: true,
      approvedByAdmin: true,
      city: {
        id: 0,
        name: "",
      },
      jobPosition: {
        jobPositionId: 0,
        name: "",
      },
      employer: {
        id: 0,
        email: "",
        password: "",
        companyName: "",
        webAddress: "",
        phoneNumber: "",
        activatedBySystemStaff: false,
        verifiedByEmail: true,
      },
      workType: {
        id: 0,
        name: "",
      },
      workTime: {
        id: 0,
        name: "",
      },
    },
    staff: {
      id: 1,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      identificationNumber: "",
      birthYear: "",
      verifiedByEmail: true,
    },
  };
  const handleOnClick = (jobAdvertisementId) => {
    favorite.jobAdvertisement.id = jobAdvertisementId;
    let favoriteService = new FavoriteService();
    favoriteService
      .add(favorite)
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        )
      );
  };

  const updateButton = (
    <Button animated="fade" positive as={Link} to={`/şirket/güncelle/${id}`}>
      <Button.Content visible>Güncelle</Button.Content>
      <Button.Content hidden>
        <Icon name="check circle" />
      </Button.Content>
    </Button>
  );
  const approveWaitingAlert = (
    <Message header="Güncelleme için onay bekleniyor" color="yellow" />
  );

  return (
    <div>
      <Table celled color={"black"} stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş veren</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign={"left"}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>
                  <Icon name="building" />
                  Şirket Adı
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row textAlign={"left"}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>
                  <Icon name="mail" />
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.email}</Table.Cell>
          </Table.Row>

          <Table.Row textAlign={"left"}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>
                  <Icon name="phone" />
                  Telefon
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.phoneNumber}</Table.Cell>
          </Table.Row>

          <Table.Row textAlign={"left"}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>
                  <Icon name="world" />
                  Web Sitesi
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              {employer.webAddress + " "}

              <a
                href={"https://" + employer.webAddress}
                target={"_blank"}
                rel="noreferrer"
              >
                <Icon name={"external alternate"} />
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div>{update === null ? updateButton : approveWaitingAlert}</div>

      <Table celled>
        <Table.Header style={{ textAlign: "center" }} />
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
          {jobAdvertisements.map((jobAdvertisement) => (
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
                  color={"red"}
                  animated={"fade"}
                  onClick={() => {
                    handleOnClick(jobAdvertisement.id);
                  }}
                >
                  <Button.Content visible>Favorilere Ekle</Button.Content>
                  <Button.Content hidden>
                    <Icon name="heart" size={"large"} />
                  </Button.Content>
                </Button>
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
                    <Icon
                      name="arrow alternate circle right outline"
                      color={"olive"}
                      size={"large"}
                    />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployerDetail;
