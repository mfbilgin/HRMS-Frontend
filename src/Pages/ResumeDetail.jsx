import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Card, Image} from "semantic-ui-react";
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
            <Card style={{margin:20, left:"30%"}}>
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
        </div>
    );
};

export default ResumeDetail;
