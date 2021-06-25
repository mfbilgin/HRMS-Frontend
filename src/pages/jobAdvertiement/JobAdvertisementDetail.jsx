import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import {Button, Card, Grid, Header, Icon, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

const JobAdvertisementDetail = () => {
    let { id } = useParams();
    const [jobAdvertisement, setJobAdvertisement] = useState({});
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getById(id).then(result => setJobAdvertisement(result.data.data));
    }, [id]);
    console.log(jobAdvertisement);
    return (

            /*
    "minSalary": 1500,
    "maxSalary": 3500,
    "emptyPositionCount": 8,
    "applicationDeadline": "2021-06-22",
    "releaseDate": "2021-06-22",
    "status": true,
    "city": {
      "id": 34,
      "name": "Bursa"
    },

  }
  */

        <div>
            <Card fluid color={"black"} style={{marginTop:20}}>
                <Card.Content header="İş Tanımı" />
                <Card.Content>
                  <strong>
                      {jobAdvertisement.jobDescription}
                  </strong>
                </Card.Content>
            </Card>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
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
                                    <Table.Cell>{jobAdvertisement.employer?.companyName}</Table.Cell>
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
                                    <Table.Cell>{jobAdvertisement.employer?.email}</Table.Cell>
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
                                    <Table.Cell>{jobAdvertisement.employer?.phoneNumber}</Table.Cell>
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
                                        {jobAdvertisement.employer?.webAddress + " "}

                                        <a href={"https://" + jobAdvertisement.employer?.webAddress} target={"_blank"} rel="noreferrer" >
                                            <Icon name={"external alternate"}/>
                                        </a>
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content>
                                                <Icon name="list ul" />
                                                Detaylar
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button animated as={Link} to={`/şirketler/${jobAdvertisement.employer?.id}`}>
                                            <Button.Content visible>Detaylara Git</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name="arrow right" />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Table celled fixed singleLine color={"black"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>İş İlanı</Table.HeaderCell>
                                    <Table.HeaderCell>Detaylar</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>İş Pozisyonu</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.jobPosition?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Şehir</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.city?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Çalışma Yeri</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.workType?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Çalışma Zamanı</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.workTime?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Minimum Maaş</Table.Cell>
                                    <Table.Cell> {jobAdvertisement.minSalary}<Icon name={"try"}/></Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Maksimum Maaş</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.maxSalary}<Icon name={"try"}/></Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Açık Pozisyonlar</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.emptyPositionCount}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Yayınlanma Tarihi</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.releaseDate}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                                    <Table.Cell>{jobAdvertisement.applicationDeadline}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </div>
    );
};

export default JobAdvertisementDetail;
