import React from "react";
import { useParams } from "react-router-dom";
import { Card, Grid } from "semantic-ui-react";
import CoverLetterUpdate from "./ResumeUpdate/CoverLetterUpdate";
import GithubUpdate from "./ResumeUpdate/GithubUpdate";
import LinkedinUpdate from "./ResumeUpdate/LinkedinUpdate";
import SchoolUpdate from "./ResumeUpdate/SchoolUpdate";
import WorkUpdate from "./ResumeUpdate/WorkUpdate";
import SkillUpdate from "./ResumeUpdate/SkillUpdate";
import LanguageUpdate from "./ResumeUpdate/LanguageUpdate";

const ResumeUpdate = () => {
  let { id } = useParams();
  return (
    <Grid>
      <Grid.Row>
        <Card fluid style={{ marginTop: 20 }}>
          <Card.Content>
            <CoverLetterUpdate id={id} />
            <GithubUpdate id={id} />
            <LinkedinUpdate id={id} />
          </Card.Content>
        </Card>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <WorkUpdate id={id} />
        </Grid.Column>
        <Grid.Column width={8}>
          <SchoolUpdate id={id} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <SkillUpdate id={id} />
        </Grid.Column>
        <Grid.Column width={8}>
          <LanguageUpdate id={id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ResumeUpdate;
