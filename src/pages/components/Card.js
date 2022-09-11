import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import renderimg from "./render.png";
import "./Card.css";

function CardComponent({
  id,
  name,
  image_url,
  model_url,
  set_render_model_url,
}) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const togglemouseEnter = () => {
    setMouseEnter(!mouseEnter);
  };

  return (
    <div className="Card">
      <Card
        className="card_body"
        style={{
          width: "10vw",
          height: "40vh",

          borderRadius: "2rem",
          backgroundColor: "#003C66",
          // backgroundColor: mouseEnter ? "purple" : "grey",
        }}
        onMouseEnter={togglemouseEnter}
        onMouseLeave={togglemouseEnter}
        onClick={() => {
          set_render_model_url(model_url);
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "white", margin: 0, padding: 0 }}>
            {name}
          </Card.Title>
        </Card.Body>
        <Card.Img
          variant="top"
          src={image_url}
          style={{
            padding: ".5rem",
            borderRadius: "2rem",
            height: "30vh",
            objectFit: "cover",
          }}
        />
      </Card>
    </div>
  );
}

export default CardComponent;
