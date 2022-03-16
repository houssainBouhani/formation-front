import React from "react";

//react router

import { Link } from "react-router-dom";

//carousel
import Slider from "react-slick";

const CoursesSlider = (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
  };



  return (
    <div>
      {" "}
      <Slider {...settings} className="container">
        <div
          className="item px-md-1"
          style={{ width: "100%", display: "inline-block" }}
        >
          <div className="mb-4 card-hover mx-2 card">
            <Link to={"courses/1"}>
              <img
                src={require("../../../../assets/images/1.png")}
                alt=""
                className="card-img-top rounded-top-md"
             
              />
            </Link>
            <div className="card-body">
              <h3 className="h4 mb-2 text-truncate-line-2 ">
                <Link className="text-inherit" to={"courses/1"}>
                  
              {  props.course.nom &&    props.course.nom }
                </Link>
              </h3>
              <ul className="mb-3 list-inline">
                <li className="list-inline-item">
                  <i className="far fa-clock me-1" />
                  2h 40m
                </li>
                <li className="list-inline-item">
                  <svg
                    className="me-1 mt-n1"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x={3}
                      y={8}
                      width={2}
                      height={6}
                      rx={1}
                      fill="#754FFE"
                    />
                    <rect
                      x={7}
                      y={5}
                      width={2}
                      height={9}
                      rx={1}
                      fill="#754FFE"
                    />
                    <rect
                      x={11}
                      y={2}
                      width={2}
                      height={12}
                      rx={1}
                      fill="#754FFE"
                    />
                  </svg>
                  Advance
                </li>
              </ul>
           
            </div>
            <div className="card-footer">
              <div className="align-items-center g-0 row">
                <div className="col-auto col">
                  <img
                    src={require("../../../../assets/images/avatar-nav.jpg")}
                    alt=""
                    className="rounded-circle avatar-xs"
                  />
                </div>
                <div className="col ms-2 col">
                  <span>Brooklyn Simmons</span>
                </div>
              </div>
              <span className="d-none">
                {" "}
                <div className="mt-3 progress" style={{ height: "5px" }}>
                  <div
                    role="progressbar"
                    className="progress-bar bg-success"
                    aria-valuenow={95}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "95%" }}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>

      </Slider>
    </div>
  );
};

export default CoursesSlider;
