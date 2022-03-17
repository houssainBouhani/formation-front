import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//react router link
import { Link, useNavigate } from "react-router-dom";
import { loadUser, logout } from "../../store/actions/auth/auth";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.authReducer.isAuthenticated);
  const user = useSelector((state) => state.authReducer.user);


  useEffect(async () => {
    dispatch(loadUser());

    // eslint-disable-next-line
  }, [isLoggedIn]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate(`/auth/login`);
  };

  const authButtonMenu = () =>
    isLoggedIn ? (
      <>
        <div className="nav-item me-5"><i className="fe fe-mail"></i> Email : contact@naza.dev</div>
        <div className="nav-item me-5"><Link className="btn btn-primary" to={'/meeting'}> <i className="fe fe-monitor"></i> réserver une réunion </Link></div>
      </>

    ) : (
      <span className="ms-auto mt-3 mt-lg-0  d-block me-5">
        <Link className="btn btn-primary shadow-sm me-2 btn" to={"auth/login"}>
          s'identifier
        </Link>
        <Link className="btn btn-white shadow-sm  btn" to={"auth/register"}>
          s'inscrire
        </Link>
      </span>
    );



  const avatar = () =>
    !isLoggedIn ? null : (
      <div className="dropdown nav-item">
        <div className="avatar avatar-md avatar-indicators avatar-online">
          <img
            alt="avatar"
            src={require("../../assets/images/avatar-nav.jpg")}
            className="rounded-circle"
          />
        </div>

        <div
          data-bs-popper="static"
          className="dashboard-dropdown dropdown-menu-end mt-4 py-0 dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownUser"
        >
          <Link
            data-rr-ui-dropdown-item
            className="mt-3 dropdown-item"
            tabIndex={0}
            to={user && user.role === `ADMIN` ? '/admin/dashboard' : '/'}
          >
            <div className="d-flex">
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <img
                  alt="avatar"
                  src={require("../../assets/images/avatar-nav.jpg")}
                  className="rounded-circle"
                />
              </div>
              {
                user &&

                <div className="ms-3 lh-1">
                  <h5 className="mb-1">{user.Name}</h5>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>

              }
            </div>
          </Link>
          <hr className="dropdown-divider" />

          <a className="mb-3 dropdown-item" onClick={() => onLogout()} style={{ cursor: "pointer" }}>
            <i className="fe fe-power me-2" /> Se déconnecter
          </a>
        </div>
      </div>
    );
  return (
    <nav className="bg-white navbar p-2 navbar-default py-2 navbar navbar-expand-lg navbar-light">
      <div className="px-0 ps-2 container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={require("../../assets/images/logo.png")}
            style={{ maxWidth: "115px" }}
            alt="logo"
          />
        </Link>
        <button
          aria-controls="basic-navbar-nav"
          type="button"
          aria-label="Toggle navigation"
          className="navbar-toggler collapsed"
        >
          <span className="icon-bar top-bar mt-0" />
          <span className="icon-bar middle-bar" />
          <span className="icon-bar bottom-bar" />
        </button>
        <div className="navbar-collapse collapse" id="basic-navbar-nav">
          <form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
            <span className="position-absolute ps-3 search-icon">
              <i className="fe fe-search" />
            </span>
            <input
              placeholder="Rechercher des cours"
              type="Search"
              id="formSearch"
              className="ps-6 form-control"
            />
          </form>
          <div className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap navbar-nav d-flex align-items-center">
            {authButtonMenu()}

            <span className="d-flex">

              {

                avatar()
              }
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
