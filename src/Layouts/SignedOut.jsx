import React from 'react';
import {Button, Menu} from "semantic-ui-react";

const SignedOut = ({signIn}) => {
    return (
        <div>
            <Menu.Item>
                <Button secondary  content='Giriş Yap'  icon={"sign-in"} onClick={signIn}/>
                <Button primary style={{marginLeft:"0.5em"}} content={"Kaydol"} icon={"signup"}/>
            </Menu.Item>
        </div>
    );
};

export default SignedOut;
