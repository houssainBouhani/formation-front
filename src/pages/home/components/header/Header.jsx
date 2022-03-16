import React from "react";
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <div className="naza-bg mb-5">
      <div className="container">
        <div className="align-items-center g-0 row">
          <div className="col-xl-5 col-lg-6 col-md-12">
            <div className="py-5 py-lg-0">
              <h1 className="text-white display-4 fw-bold">
                Bienvenue dans l'application d'apprentissage naza
              </h1>
              <p className="text-white-50 mb-4 lead">
                Instructeur trié sur le volet et cours conçus par des experts,
                conçus pour les étudiants et les entrepreneurs modernes.
              </p>
              <Link
                className="btn btn-success"
                to={'/'}
              >
                Découvrir les Cours
              </Link>
            </div>
          </div>
          <div className="text-lg-end text-center col-xl-7 col-lg-6 col-md-12">
            <img
              src={require("../../../../assets/images/hero.png")}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-4 shadow-sm">
        <div className="container">
          <div className="align-items-center g-0 row">
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="d-flex align-items-center">
                <span className="icon-sahpe icon-lg bg-light-warning rounded-circle text-center text-dark-warning fs-4">
                  <i className="fe fe-video"></i>
                </span>
                <div className="ms-3">
                  <h4 className="mb-0 fw-semi-bold">30 000 cours en ligne.</h4>
                  <p className="mb-0">
                    Profitez d'une variété de sujets frais.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="d-flex align-items-center">
                <span className="icon-sahpe icon-lg bg-light-warning rounded-circle text-center text-dark-warning fs-4">
                  <i className="fe fe-users"></i>
                </span>
                <div className="ms-3">
                  <h4 className="mb-0 fw-semi-bold">Instructions d'experts</h4>
                  <p className="mb-0">Trouvez le bon instructeur pour vous</p>
                </div>
              </div>
            </div>
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="d-flex align-items-center">
                <span className="icon-sahpe icon-lg bg-light-warning rounded-circle text-center text-dark-warning fs-4">
                  <i className="fe fe-clock"></i>
                </span>
                <div className="ms-3">
                  <h4 className="mb-0 fw-semi-bold">Accès à vie.</h4>
                  <p className="mb-0">Apprenez selon votre emploi du temps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
