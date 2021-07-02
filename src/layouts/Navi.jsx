import { Button, Icon, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Navi = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  let history = useHistory();
  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }
  function handleSignIn() {
    setIsAuthenticated(true);
    toast.success("Giriş Başarılı");
  }
  return (
    <div>
      <Menu size="large">
        <Menu.Item
          name="Human Resources Management System"
          as={Link}
          to={"/"}
        />

        <Menu.Menu>
          <Menu.Item>
            <Button
              animated="fade"
              color={"orange"}
              as={Link}
              to={"/curriculumVitaes"}
            >
              <Button.Content visible>Öz Geçmişler</Button.Content>
              <Button.Content hidden>
                <Icon name={"file outline"} />
              </Button.Content>
            </Button>
          </Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              as={Link}
              to={"/ilanEkle"}
              animated="fade"
              color={"facebook"}
            >
              <Button.Content visible>İlan Ekle</Button.Content>
              <Button.Content hidden>
                <Icon name={"add"} />
              </Button.Content>
            </Button>
          </Menu.Item>
          {isAuthenticated ? (
            <SignedIn signOut={handleSignOut} />
          ) : (
            <SignedOut signIn={handleSignIn} />
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navi;
