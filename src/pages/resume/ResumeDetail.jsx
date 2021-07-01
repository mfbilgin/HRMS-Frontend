import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Card, Icon, Image, Rating, Table} from "semantic-ui-react";
import ResumeService from "../../services/resumeService";
//import ImageService from "../../services/imageService";
//import swal from "sweetalert";

const ResumeDetail = () => {
    let {id} = useParams();
    const [resume, setResume] = useState({});
    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getByStaffId(id).then(result => setResume(result.data.data))
    }, [id]);
    window.onload = function () {
        let fileupload = document.getElementById("FileUpload1");
        let image = document.getElementById("photo");
        image.onclick = function () {
            fileupload.click();
        };
        fileupload.onchange = function () {
            //TODO
            console.log(fileupload.value)

        };
    };
    return (
        <div>
            <Card style={{margin: 20, left: "35%"}}>
                <Card.Content>
                    <Image
                        floated='left'
                        size='tiny'
                        id="photo"
                        alt="Select File"
                        title="Select File"
                        src={resume.imageUrl}
                        style={{cursor: "pointer"}}
                    />
                    <br />
                    <span id="spnFilePath"/>
                    <input type="file" id="FileUpload1" style={{display: "none"}}/>
                    <Card.Header
                        style={{marginTop: 30}}>{resume.staff?.firstName + " " + resume.staff?.lastName.toUpperCase()}</Card.Header>
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
                                <div key={skill.skillId}>

                                    <Image
                                        src={"https://img.shields.io/badge/" + skill.name + "-blue?style=for-the-badge&logo=" + skill.name + "&logoColor=white"}/>
                                    <br/>
                                </div>
                            ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.languages?.map(language => (
                                <div key={language.languageId}>
                                    {language.name}
                                    <br/>
                                    <Rating icon="star" disabled defaultRating={language.level} maxRating={5}/>
                                    <br/>
                                </div>
                            ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.schools?.map(school => (
                                <div key={school.schoolId}>
                                    {school.schoolName + "/" + school.department + " (" + school.startYear + " - " + school.graduationYear + " )"}
                                </div>
                            ))}
                        </Table.Cell>
                        <Table.Cell>
                            {resume.works?.map(work => (
                                <div key={work.workId}>
                                    {work.companyName + "/" + work.jobPosition + " (" + work.startYear + " - " + work.leaveYear + " )"}
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
            <Button as={Link} to={`/curriculumVitae/update/${resume.staff?.id}`} style={{width: "15%", height: "20%"}}
                    animated={"fade"} color={"green"}>
                <Button.Content visible>
                    Güncelle
                </Button.Content>
                <Button.Content hidden>
                    <Icon name={"pencil"}/>
                </Button.Content>
            </Button>
        </div>
    );
};

export default ResumeDetail;
