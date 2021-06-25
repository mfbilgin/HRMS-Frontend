import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Card, Header, Icon, Image, Rating, Table} from "semantic-ui-react";
import ResumeService from "../Services/resumeService";

const ResumeDetail = () => {
    let {id} = useParams();
    const [resume, setResume] = useState({});
    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getByStaffId(id).then(result => setResume(result.data.data))
    }, [id]);
    console.log(resume)
    return (
        <div>
            <Card style={{margin:20, left:"38%"}}>
                <Card.Content>
                    <Image
                        floated='left'
                        size='tiny'
                        src={resume.imageUrl}
                    />
                    <Card.Header style={{marginTop:30}}>{ resume.staff?.firstName + " " + resume.staff?.lastName.toUpperCase()}</Card.Header>
                    <Card.Description>
                        {resume.coverLetter}
                    </Card.Description>
                </Card.Content>
            </Card>

            <Table celled padded>
                <Table.Header>
                    <Table.Row textAlign={'center'}>
                        <Table.HeaderCell>Teknolojiler</Table.HeaderCell>
                        <Table.HeaderCell>Diller</Table.HeaderCell>
                        <Table.HeaderCell>Okullar</Table.HeaderCell>
                        <Table.HeaderCell>Tecrübeler</Table.HeaderCell>
                        <Table.HeaderCell>Github & Linkedin</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row textAlign={'center'}>
                        <Table.Cell>
                            {resume.skills?.map(skill => (
                            <div>

                                <Image src={"https://img.shields.io/badge/" + skill.name +"-blue?style=for-the-badge&logo="+ skill.name+"&logoColor=white"}/>
                                <br/>
                            </div>
                        ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.languages?.map(language => (
                                <div>
                                    {language.name}
                                    <br/>
                                    <Rating icon="star" disabled defaultRating={language.level} maxRating={5} />
                                    <br/>
                                </div>
                            ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.schools?.map(school => (
                                <div>
                                    {school.schoolName+ "/" +school.department + " (" + school.startYear + " - " + school.graduationYear + " )"}
                                </div>
                            ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.works?.map(work => (
                                <div>
                                    {work.companyName+ "/" +work.jobPosition + " (" + work.startYear + " - " + work.leaveYear + " )"}
                                </div>
                            ))}
                        </Table.Cell>
                            <Table.Cell>
                            <a href={resume.githubAddress} target={"_blank"} rel="noopener noreferrer">
                                <Button color={"black"} icon={"github"}/>
                            </a>
                            <a href={resume.linkedinAddress} target={"_blank"} rel="noopener noreferrer">
                                <Button color={"linkedin"} icon={"linkedin"}/>
                            </a>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default ResumeDetail;
