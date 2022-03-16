import moment from "moment";
import React, { useEffect, useState } from "react";

//modal
import Modals from "../../../components/modal/Modals";

import { v4 as uuid } from "uuid";
import api from '../../../axiosConfig'


const Users = (props) => {

  const [users, setusers] = useState();

useEffect(() => {
  
setusers(props.users)

}, [props.users])

  const onDeleteStudent = async (id) => {
    console.log(id)
    await api.delete(`/users/${id}`)
  };

  const onConfirmStudent = async (id) => {
    console.log(id)
    await api.put(`/users/updateEtat/${id}`,{etat:"ACCEPTED"})

   
  };

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
              {console.log(props.users)}

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
                        <a
                          role="button"
                          className="btn-sm btn btn-success me-2"
                          onClick={() => onConfirmStudent(user.id)}
                        >
                          Accepter
                        </a>
                        <a
                          role="button"
                          className="btn-outline-white btn-sm btn btn-outline"
                          onClick={() => onDeleteStudent(user.id)}
                        >
                          Rejeter
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

{
  /*
  
   <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="pb-5">
              <nav>
                <ul className="justify-content-center mb-0 pagination">
                  <li className="page-item">
                    <button
                      type="button"
                      className="page-link mx-1 rounded btn btn-primary"
                    >
                      <i className="fe fe-chevron-left" />
                    </button>
                  </li>
                  <li className="page-item active page-item">
                    <button
                      type="button"
                      className="page-link mx-1 rounded btn btn-primary"
                    >
                      1
                    </button>
                  </li>
                  <li className="page-item  page-item">
                    <button
                      type="button"
                      className="page-link mx-1 rounded btn btn-primary"
                    >
                      2
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      type="button"
                      className="page-link mx-1 rounded btn btn-primary"
                    >
                      <i className="fe fe-chevron-right" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
  */ 
}
       
      </div>
    
    </div>
  );
};

export default Users;
