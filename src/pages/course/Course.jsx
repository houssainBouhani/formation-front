import React, { useEffect, useRef, useState } from 'react'

import Header from "./components/Header";

//react-bootstrap
import { Accordion, Tabs, Tab, Button } from "react-bootstrap";

//custom css
import "./course.style.css";
import api from '../../axiosConfig';
import { Link } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useSelector } from 'react-redux';


import { Toast } from 'primereact/toast';
import moment from 'moment';

const Course = () => {

  const [date, setDate] = useState(new Date());

  const toast = useRef(null);

  const [courses, setcourses] = useState([]);
  const [modules, setModules] = useState([])


  const user = useSelector((state) => state.authReducer.user);


  useEffect(async () => {



    const courses = await api.get("/cours/1");

    setcourses(courses.data);

    setModules(courses.data.modules);


    // eslint-disable-next-line
  }, [date]);


  const reserveMetting = async () => {
    let userId;

    if (user) {
      userId = user.id;

      let stringDate = date.toDateString();
      let rdv = {
        date: stringDate,
        UserId: userId

      }
      const data = await api.post('/rdv/save', rdv);

      toast.current.show({ severity: 'success', summary: `Rendez-vous validé `, detail: `votre rendez-vous zoom est validé ` });

    }



  }
  return (
    <>
      <Header courses={courses}></Header>
      <div className="container">

      <Toast ref={toast} />
        <div className="row">
          <div className="mt-n8 mb-4 mb-lg-0 col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <Tabs
                defaultActiveKey="Contenu"
                className="nav-lb-tab nav tab-content remove-border"
              >
                <Tab
                  eventKey="Contenu"
                  title="Contenu"
                  className="pb-4 pt-3 px-4 tab-pane me-0"
                >
                  <div className="p-0 card-body">
                    <Accordion defaultActiveKey="0" className="tab-content">
                      {
                        modules.length > 0 &&

                        modules.map((module) =>
                        (
                          <Accordion.Item eventKey={module.id} key={module.id}>
                            <Accordion.Header>  <h4> {module.nom}</h4></Accordion.Header>
                            <Accordion.Body>
                              <ul className="py-4 list-group">
                                <li className="px-0 py-1 border-0 list-group-item">
                                  <Link
                                    className="d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                                    to={`modules/${module.id}`}
                                  >
                                    <div className="text-truncate ">
                                      <span className="icon-shape bg-light text-primary icon-sm rounded-circle me-2">
                                        <svg
                                          viewBox="0 0 24 24"
                                          role="presentation"
                                          style={{
                                            width: "1.2rem",
                                            height: "1.2rem",
                                          }}
                                        >
                                          <path
                                            d="M8,5.14V19.14L19,12.14L8,5.14Z"
                                            style={{ fill: "currentcolor" }}
                                          />
                                        </svg>{" "}
                                      </span>
                                      <span className="fs-5"> <b> {module.description}</b> </span>
                                    </div>
                                  </Link>
                                </li>
                                {
                                  /*
                                    <li
                                  tabIndex={-1}
                                  aria-disabled="true"
                                  className="px-0 py-1 border-0 list-group-item disabled"
                                >
                                  <Link
                                    className="d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                                    to={'qcm/id'}
                                  >
                                    <div className="text-truncate ">
                                      <span className="icon-shape bg-light text-muted icon-sm rounded-circle me-2">
                                        <i className="fe fe-lock fs-4" />{" "}
                                      </span>
                                      <span className="fs-5">
                                      Questionnaire à choix multiples
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                                  */

                                }

                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        )

                        )

                      }
                    </Accordion>
                  </div>
                </Tab>

                <Tab eventKey="Description" title="Programmer un rendez-vous Zoom" className="pb-4 pt-3 px-4 tab-pane">
                  <div className="p-0 card-body">
                    <div className="list-group list-group-flush">
                      <div className="border-0 fs-5 px-5 py-4 list-group-item">
                        <div className="d-flex">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                              renderInput={(params) => <TextField {...params} />}
                              label="réserver une réunion "
                              value={date}
                              onChange={(date) => {
                                setDate(date);
                              }}
                              minDate={new Date()}
                              minTime={new Date(0, 0, 0, 9)}
                              maxTime={new Date(0, 0, 0, 17)}
                            />
                          </LocalizationProvider>

                          <Button className='btn btn-primary ms-2' onClick={() => reserveMetting()}>confirmer réunion</Button>

                        </div>

                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
