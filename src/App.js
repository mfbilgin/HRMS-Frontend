import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Navi from "./layouts/Navi";
import { Container } from "semantic-ui-react";
import Home from "./layouts/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer position={"bottom-right"} />
      <Navi />
      <Container className="main">
        <Home />
      </Container>
    </div>
  );
}

export default App;
