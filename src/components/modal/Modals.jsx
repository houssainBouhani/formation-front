import { Modal, Button } from "react-bootstrap";
import React from "react";

const Modals = (props) => {



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Confirmer</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modal.message}</Modal.Body>
      <Modal.Footer>
        {props.modal.type === "confirm" ? (
          <Button  variant="success" onClick={ () => console.log("confirmed")}>Confirmer</Button>
        ) : (
          <Button variant="danger"   onClick={  () =>  console.log("rejected")}>rejeter</Button>
        )}
        <button className="btn-outline-white btn btn-outline" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
