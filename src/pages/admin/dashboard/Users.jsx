import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, Button , Spinner} from "react-bootstrap";



import { v4 as uuid } from "uuid";
import api from '../../../axiosConfig'


const Users = (props) => {

  const [users, setusers] = useState();
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {

    setusers(props.users)

  }, [props.users, users,modalShow1,modalShow2])



  const onConfirmStudent = (id) => {
    setUser(id);
    setModalShow1(true);
  

  };


  const confirmStudent = async () => {
    const { data } = await api.post(`/users/updateEtat/`, { id: user, etat: "accepted" });

    if (data.etat === "accepted") {
      setModalShow1(false);
      window.location.reload()
    }

  }


  const onDeleteStudent = (id) => {
    setUser(id);
    setModalShow2(true);


  };

  const deleteStudent = async () => {
    const { data } = await api.delete(`/users/${user}`);
    if (data.message === 'User deleted successfully') {
      setModalShow2(false);
      window.location.reload()
    }

  }



  return (
    <div className="mb-5  card">
      <div className="p-0 card-body">
        <div className=" overflow-hidden">
          <div className="row">
            <div className="mb-lg-0 mb-2 px-5 py-4 col-lg-12 col-md-12 col-sm-12">
              <input
                type="search"
                className="form-control"
                placeholder="Rechercher des étudiants"
              />
            </div>
          </div>
        </div>
        <div className="table-responsive ">
          <table role="table" className="text-nowrap table">
            <thead className="table-light">
              <tr role="row">
                <th colSpan={1} role="columnheader">
                  NOM
                </th>
                <th colSpan={1} role="columnheader">
                  REJOINT À
                </th>
                <th colSpan={1} role="columnheader" className="text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {props.users.length > 0 &&
                props.users.map((user) => (
                  <tr role="row" key={uuid()}>
                    <td role="cell">
                      <div className="d-flex align-items-center">
                        <img
                          src={require("../../../assets/images/avatar-3.jpg")}
                          alt="avatar"
                          className="rounded-circle avatar-md me-2"
                        />
                        <h5 className="mb-0">{user.Name}</h5>
                      </div>
                    </td>
                    <td role="cell">
                      {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <td role="cell">
                      <div className="d-flex justify-content-center border-top-0">
                        <button
                          role="button"
                          className="btn-sm btn btn-success me-2"
                          onClick={() => onConfirmStudent(user.id)}
                        >
                          Accepter
                        </button>
                        <button
                          role="button"
                          className="btn-outline-white btn-sm btn btn-outline"
                          onClick={() => onDeleteStudent(user.id)}
                        >
                          Rejeter
                        </button>
                      </div>
                    </td>
                  </tr>
                )) 
                
               
                }
            </tbody>
          </table>
        </div>

        <div>
          <Modal
            show={modalShow1}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>voulez-vous vraiment confirmer l'utilisateur </h4>

            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                onClick={() => confirmStudent()}
                className=" btn btn-primary"
              >
                confirmer
              </Button>
              <Button
                type="button"
                onClick={() => setModalShow1(false)}
                className=" btn btn-secondary"
              >
                annuler
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={modalShow2}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>voulez-vous vraiment supprimer l'utilisateur </h4>

            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                onClick={() => deleteStudent()}
                className=" btn btn-primary"
              >
                confirmer
              </Button>
              <Button
                type="button"
                onClick={() => setModalShow2(false)}
                className=" btn btn-secondary"
              >
                annuler
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

    </div>
  );
};

export default Users;



