import logo from "./logo.svg";
import "./App.css";
import Gltfpage from "./pages/Gltfpage";
import Homepage from "./pages/Homepage";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

import Navbar_Component from "./pages/components/Navbar";
import ContentPage from "./pages/ContentPage";
import Fetchmodel from "./pages/components/Fetchmodel";

function App() {
  return (
    <div className="App">
      {/* <Navbar_Component /> */}

      <Homepage />
      <ContentPage />
      {/* <h1>Welcome</h1> */}
      {/* <Gltfpage /> */}
    </div>
  );
}

export default App;
