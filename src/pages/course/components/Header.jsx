import React from "react";

const Header = (props) => {
  return (
    <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
      <div className="container">
        <div className="align-items-center row">
          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
            <div>
              <h1 className="text-white display-4 fw-semi-bold">
               { props.courses.nom  && props.courses.nom   }
              </h1>
              <p className="text-white mb-6 lead">
              { props.courses.description  && props.courses.description   }
              </p>
              <div className="d-flex align-items-center">
              
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
