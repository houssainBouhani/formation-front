import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";

import { useHistory, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Question from "./questions/Question";

const Qcm = () => {
  const { id } = useParams();
  const [Qcm, setQcm] = useState([]);
  const [testFinished, settestFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getQcm() {
      try {
        const { data } = await api.get(`/qcms/${id}`);
        setQcm(data);
      } catch (error) {
        console.log(error);
      }
    }
    getQcm();
  }, [id, testFinished]);

  const onSubmitanswers = (e) => {
    e.preventDefault();
    settestFinished(true);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">
                test à choix multiples du module :
              </h1>
            </div>
            <div />
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="row">
          <div className="col-xl-6 col-md-12 col-12 offset-xl-3">
            <div className="card">
              <div className="p-lg-6 card-body">
                <form>
                  <div className="row">
                    {Qcm.length > 0 &&
                      Qcm.map((qcm) => (
                        <div className="mb-3 col-12" key={uuid()}>

                          <div className="mb-3">
                            <h5>
                              <b> - {qcm.question}</b>
                            </h5>
                          </div>
                          <div>
                            <span
                              className="valid-feedback-hint d-block"
                              style={{ fontSize: "14px" }}
                            >
                              {testFinished && qcm.hint}
                            </span>

                            <hr />
                          </div>

                          {qcm.choixs.map((choix) => (
                            <Question
                              questions={Qcm.length}
                              qcm={qcm.choixs}
                              choix={choix}
                              length={qcm.choixs.length}
                              key={uuid()}
                              testFinish={testFinished}
                            />
                          ))}
                        </div>
                      ))}

                    <div className="col-12">
                      {testFinished ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={(e) => navigate(`/courses/${id}`)}
                        >
                          continuer
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={(e) => onSubmitanswers(e)}
                        >
                          confirmer
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qcm;
