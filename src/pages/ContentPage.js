import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import CardComponent from "./components/Card";
import Fetchmodel from "./components/Fetchmodel";
import Upload_file from "./components/Upload_file";
import "./ContentPage.css";

function ContentPage() {
  const [modalShow, setModalShow] = React.useState(false);
  const [success, setsuccess] = useState(false);
  const [models, setmodel] = useState([]);
  const [render_model_url, set_render_model_url] = useState("");

  const fetchfunction = () => {
    fetch(`/show`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => setmodel(data));
  };
  useEffect(() => {
    fetchfunction();
  }, []);

  let cards_array = [];
  let arr = [];
  models.forEach((mod) => {
    if (arr.length === 4) {
      cards_array.push(arr);
      arr = [];
    }
    arr.push(mod);
  });
  if (arr.length > 0) {
    cards_array.push(arr);
    arr = [];
  }

  return (
    <>
      <Upload_file
        show={modalShow}
        setsuccess={setsuccess}
        onHide={() => setModalShow(false)}
      />
      <div className="ContentPage" style={{ background: "#AFCDD5" }}>
        <div className="header_container">
          <Button
            variant="outline-light"
            className="upload_button"
            onClick={() => setModalShow(true)}
          >
            Upload file +
          </Button>
          <h1 style={{ flex: 1, fontWeight: 600 }}>Select a Card</h1>
        </div>
        {success ? (
          <Alert
            variant="success"
            onClose={() => setsuccess(false)}
            dismissible
            style={{ margin: "1rem", padding: "1rem" }}
          >
            <Alert.Heading>File Uploaded successfully!!!</Alert.Heading>
          </Alert>
        ) : (
          ""
        )}
        {cards_array.length > 0
          ? cards_array.map((cardrow) => (
              <div className="CardContainer">
                {cardrow.map((card) => (
                  <CardComponent
                    id={card.id}
                    image_url={card.image_url}
                    name={card.name}
                    model_url={card.model_url}
                    set_render_model_url={set_render_model_url}
                  />
                ))}
              </div>
            ))
          : ""}
      </div>
      <Fetchmodel render_model_url={render_model_url} />
    </>
  );
}

export default ContentPage;
