import React from "react";
import {Button, Icon, Menu} from "semantic-ui-react";

const SignedOut = ({ signIn }) => {
  return (
    <div>
      <Menu.Item>
        <Button
          secondary
          animated={"fade"}
          onClick={signIn}
        >
            <Button.Content visible>
                Giriş Yap
            </Button.Content>
            <Button.Content hidden> <Icon name={"sign-in"}/></Button.Content>
        </Button>
        <Button
          primary
          style={{ marginLeft: "0.5em" }}
          animated={"fade"}
        >
            <Button.Content visible>
                Kaydol
            </Button.Content>
            <Button.Content hidden>
                <Icon name={"signup"}/>
            </Button.Content>
        </Button>
      </Menu.Item>
    </div>
  );
};

export default SignedOut;
