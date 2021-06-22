import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Navi from "./Layouts/Navi";
import { Container } from "semantic-ui-react";
import Home from "./Layouts/Home";
function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Home />
      </Container>
    </div>
  );
}

export default App;
