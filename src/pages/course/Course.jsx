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
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/fr';

const Course = () => {

  const [date, setDate] = useState(new Date());
  const [cancelMeeting, setcancelMeeting] = useState(false);
  const [savedMeet, setsavedMeet] = useState([]);
  const [courses, setcourses] = useState([]);
  const [modules, setModules] = useState([]);

  


  const toast = useRef(null);


  moment.locale('fr');


  const user = useSelector((state) => state.authReducer.user);




  useEffect(async () => {


    const courses = await api.get("/cours/1");
    setcourses(courses.data);
    setModules(courses.data.modules);

    if (user !== null) {
      const { data } = await api.get(`/rdv/${user.id}`);
      setsavedMeet(data);
    }


    // eslint-disable-next-line
  }, [date, user]);


  const reserveMetting = async () => {
    let userId;
    let meetingDate = moment(date).locale('fr').format('MMMM Do YYYY, h:mm:ss a');
    if (user) {
      userId = user.id;
      let rdv = {
        date: meetingDate,
        UserId: userId

      }
      const { data } = await api.post('/rdv/save', rdv);

      if (data.message === "Registration successful" && data.id) {
        toast.current.show({ severity: 'success', summary: `Rendez-vous validé `, detail: `votre rendez-vous zoom est validé ` });
        setcancelMeeting(true);
        let id = JSON.parse(localStorage.getItem('id')) || [];
        localStorage.setItem('id', JSON.stringify(data.id));

      }

    }



  }

  const cancelmeeting = async () => {
    let id = JSON.parse(localStorage.getItem('id')) || [];
    await api.delete(`/rdv/${id}`);
    localStorage.removeItem('id');

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
                                  {user === null ?
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
                                    :
                                    <Link
                                      className="d-flex justify-content-between align-items-center text-inherit text-decoration-none disabled"
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
                                  }
                                </li>

                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        )

                        )

                      }
                    </Accordion>
                  </div>
                </Tab>

                {
                  user && <Tab eventKey="Description" title="Programmer un rendez-vous Zoom" className="pb-4 pt-3 px-4 tab-pane">
                    <div className="p-0 card-body">
                      <div className="list-group list-group-flush">
                        <div className="border-0 fs-5 px-5 py-4 list-group-item">
                          <div className="d-flex align-items-center">

                            {
                              cancelMeeting || savedMeet.length > 0 ?

                                <Alert variant="primary" className="mb-0" >votre réunion zoom est prévue à {moment(date).locale('fr').format('MMMM Do YYYY, h:mm:ss a')}</Alert>
                                :
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


                            }


                            {
                              cancelMeeting || savedMeet.length > 0 ? <Button className='btn btn-danger ms-2' onClick={() => {
                                setcancelMeeting(false);
                                setDate(new Date());
                                cancelmeeting();
                              }}>annuler la réunion</Button>

                                : <Button className='btn btn-primary ms-2' onClick={() => reserveMetting()}>confirmer réunion</Button>
                            }
                          </div>

                        </div>
                      </div>
                    </div>
                  </Tab>
                }


              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
