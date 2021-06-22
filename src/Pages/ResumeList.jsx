import React, {useEffect} from 'react';
import {Button, Icon, Image, Table} from "semantic-ui-react";
import {useState} from "react";
import {Link} from "react-router-dom";
import ResumeService from "../Services/resumeService";

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    useEffect(() => {
        let resumeService = new ResumeService();
        resumeService.getAllResume().then(result => setResumes(result.data.data))
    }, []);
    return (
        <div style={{margin: 20}}>
            <Table>
                <Table.Header style={{textAlign: 'center'}}>

                </Table.Header>
                <Table.Header>
                    <Table.Row textAlign={"center"}>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>İsim Soyisim</Table.HeaderCell>
                        <Table.HeaderCell>Teknolojiler</Table.HeaderCell>
                        <Table.HeaderCell>Diller</Table.HeaderCell>
                        <Table.HeaderCell>Github</Table.HeaderCell>
                        <Table.HeaderCell>Linkedin</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        resumes.map(resume => (
                            <Table.Row key={resume.id} textAlign={'center'}>
                                <Table.Cell><Image avatar spaced={"left"}
                                                   src={resume == null ? "https://res.cloudinary.com/mfbilgin/image/upload/v1624274588/user_30px_ilz0fp.png" : resume.imageUrl}/></Table.Cell>

                                <Table.Cell>
                                    {resume.staff.firstName + " " + resume.staff.lastName.toUpperCase()}
                                </Table.Cell>

                                <Table.Cell>
                                    {resume.skills.map((skill) => (
                                    <p key={skill.id}>{skill.name}</p>
                                ))}
                                </Table.Cell>

                                <Table.Cell>
                                    {resume.languages.map((language) => (
                                    <p key={language.id}>{language.name + " Seviye: " + language.level}</p>
                                ))}
                                </Table.Cell>

                                <Table.Cell>
                                    <a href={resume.githubAddress} target={"_blank"} rel="noopener noreferrer">
                                    <Button color={"black"}>
                                        <Icon name="github" /> Github
                                    </Button>
                                </a>
                                </Table.Cell>

                                <Table.Cell>
                                    <a href={resume.linkedinAddress} target={"_blank"} rel="noopener noreferrer">
                                        <Button color={"linkedin"}>
                                            <Icon name="linkedin" /> Github
                                        </Button>
                                    </a>
                                </Table.Cell>

                                <Table.Cell> <Button
                                    as={Link}
                                    to={`/curriculumVitaeDetails/${resume.staff.id}`}
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

export default ResumeList;
