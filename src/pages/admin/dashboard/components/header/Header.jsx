import React from "react";

const Header = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
          <div className="mb-3 mb-md-0">
            <h1 className="mb-1 h2 fw-bold">
            Étudiants <span className="fs-5 text-muted">(1,22,105 )</span>
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#" role="button" >
                  Dashboard
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" role="button" >
                  Utilisateurs
                  </a>
                </li>
                <li className="breadcrumb-item active" >
                Étudiants
                </li>
              </ol>
            </nav>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default Header;
