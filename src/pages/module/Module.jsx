import { Button } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";

import ImageGallery from "react-image-gallery";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../../axiosConfig";
import { Modal } from "react-bootstrap";

const Module = (props) => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const galleryslider = useRef(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {
    const { data } = await api.get(`/ImageModeule/${id}`);
    setImages(data);
    console.log(id);
  }, [id, galleryslider]);

  const getLastSlide = () => {
    let currentSliderIndex = galleryslider.current.getCurrentIndex();
    let lastImage = images.length - 1;
    let Id = id
    if (currentSliderIndex === lastImage && Id !== "6") {
      setModalShow(true);
    } else {
      setModalShow(false);
    }
  };

  const showImages = () => {
    if (images && images.length > 0) {
      return (
        <div className="position-relative">

          <ImageGallery
            items={images}
            original={false}
            infinite={false}
            ref={galleryslider}
            onSlide={() => getLastSlide()}
            showPlayButton={false}
            showIndex={true}

          />

          {modalShow && (
            <div>
              <MyVerticallyCenteredModal
                show={modalShow} id={id}
                onHide={() => setModalShow(false)}
              />
            </div>

          )}
        </div>
      );
    }
  };

  return <div>{showImages()}</div>;
};

export default Module;

function MyVerticallyCenteredModal(props) {

  const [modalShow, setModalShow] = useState(false);

  return (

    <Modal
      backdrop="static"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Testez vos connaissances </h4>

      </Modal.Body>
      <Modal.Footer>
        <Link
          type="button"
          to={`qcm/${props.id}`}
          className=" btn btn-primary"
        >
          Continuez
        </Link>
        <Button
          type="button"
          onClick={() => props.onHide()}
          className=" btn btn-secondary"
        >
          retour
        </Button>
      </Modal.Footer>
    </Modal>
  );
}