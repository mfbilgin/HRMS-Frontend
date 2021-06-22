import {Button, Menu} from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import React, {useState} from "react";
import {Link} from "react-router-dom";

const Navi = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    function handleSignOut() {
        setIsAuthenticated(false)
    }
    function handleSignIn() {
        setIsAuthenticated(true)
    }
    return (
        <div>
            <Menu size='large'>
                <Menu.Item
                    name='Human Resources Management System'
                    as={Link}
                    to={"/"}
                />


                <Menu.Menu >
                    <Menu.Item>
                        <Button color={'orange'} as={Link} to={"/curriculumVitaes"}> Öz Geçmişler </Button>
                    </Menu.Item>
                </Menu.Menu>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button  content='İlan Ekle'  icon={"add circle"} color={"facebook"} />
                    </Menu.Item>
                    {isAuthenticated ? <SignedIn signOut={handleSignOut} /> :<SignedOut signIn={handleSignIn}/> }
                </Menu.Menu>


            </Menu>


        </div>
    );
};

export default Navi;

