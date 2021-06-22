import React, {useEffect, useState} from 'react';
import {Button, Table} from "semantic-ui-react";
import JobAdvertisementService from "../Services/jobAdvertisementService";
import {Link} from "react-router-dom";

const JobAdvertisementList = () => {
    const [jobAdvertisement, setJobAdvertisement] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getAdvertByStatusIsTrue().then(result => setJobAdvertisement(result.data.data));
    }, []);
    return (
        <div style={{margin: 20}}>

            <Table>
                <Table.Header style={{textAlign: 'center'}}>

                </Table.Header>
                <Table.Header>
                    <Table.Row textAlign={"center"}>
                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                        <Table.HeaderCell>Şehir</Table.HeaderCell>
                        <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobAdvertisement.map(jobAdvertisement => (
                            <Table.Row key={jobAdvertisement.id} textAlign={'center'}>
                                <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.city.name}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.applicationDeadline.toString()}</Table.Cell>
                                <Table.Cell> <Button
                                    as={Link}
                                    to={`/jobAdvertisementDetails/${jobAdvertisement.id}`}
                                    content="Detaylara Git"
                                    color="grey"
                                    icon="right arrow"
                                    labelPosition="right"
                                /></Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

        </div>

    );
};

export default JobAdvertisementList;
