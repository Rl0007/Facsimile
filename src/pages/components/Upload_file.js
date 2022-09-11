import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import storage from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function MyVerticallyCenteredModal(props) {
  const [filename, setFilename] = useState("");
  const [Imagefile, setImagefile] = useState();
  const [Modelfile, setModelfile] = useState();

  const metadata = {
    contentType: "image/jpeg",
  };

  const handleImageFile = (e) => {
    setImagefile(e.target.files[0]);
  };
  const handleModelFile = (e) => {
    setModelfile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgurl;
    let modelurl;

    props.onHide();
    const ImageRef = ref(storage, "/image/" + Imagefile.name);
    const ModelRef = ref(storage, "/model/" + Modelfile.name);

    let snapshot = await uploadBytes(ModelRef, Modelfile);
    modelurl = await getDownloadURL(snapshot.ref);

    snapshot = await uploadBytes(ImageRef, Imagefile, metadata);
    imgurl = await getDownloadURL(snapshot.ref);

    await fetch(`/create`, {
      method: "POST",
      body: JSON.stringify({
        name: filename,
        model_url: modelurl,
        image_url: imgurl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setFilename("");
    props.setsuccess(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        color: "black",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload file
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              type="string"
              onChange={(e) => {
                setFilename(e.target.value);
              }}
              required
              value={filename}
              placeholder="Enter file name...."
            />
          </Form.Group>
          <Form.Group controlId="ImageFile" className="mb-3">
            <Form.Label>Display Image</Form.Label>
            <Form.Control type="file" required onChange={handleImageFile} />
          </Form.Group>
          <Form.Group controlId="ModelFile" className="mb-3">
            <Form.Label>3d model file</Form.Label>
            <Form.Control type="file" required onChange={handleModelFile} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "1rem" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>

          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>

            <Button variant="danger" type="button" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
