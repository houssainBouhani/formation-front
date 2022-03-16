import React, { useEffect, useState } from "react";

import "./question.css";

const Question = (props) => {


  useEffect(() => {

  }, [props.testFinish, props.moduleid]);

  const inputValidation = () => {
    if (props.testFinish) {
      if (props.choix.reponse === `oui`) {
        return `is-valid`;
      }
    }

    return null;
  };

  const feedBack = () => {
    if (props.testFinish) {
      if (props.choix.reponse === `oui`) {
        return `valid-feedback`;
      }
      return null;
    }

  };

  /*

  const handleForms = (qcmId, reponse, label) => {


      let answers = [];
      // Parse the serialized data back into an array of objects
      answers = JSON.parse(localStorage.getItem('answers')) || [];
  
      // Push the new data (whether it be an object or anything else) onto the array
      answers.push({ moduleId: props.moduleid, qcmId: qcmId, reponse: reponse, label: label });
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('answers', JSON.stringify(answers));
  
      if (
        props.length > 2 &&
        props.qcm.filter((reponse) => reponse.reponse === "oui").length > 1
      ){

        localStorage.setItem('answers', JSON.stringify(answers));
      }else {
        
      const filtredAnswers = Object.values(answers.reduce((a, item) => {
        a[item.qcmId] = item;
        return a;
      }, {}));
  
      localStorage.setItem('answers', JSON.stringify(filtredAnswers));
      }

    

   
  }


*/











  const renderAnswers = () => {
    if (
      props.length > 2 &&
      props.qcm.filter((reponse) => reponse.reponse === "oui").length > 1
    ) {
      return (
        <div className="">
          <input
            type="checkbox"
            name={props.choix.qcmId}
            className={`form-check-input  me-2 ${inputValidation()}`}
            value={props.choix.label}
            checked={inputValidation()}
            /*onChange={(event) => handleForms(props.choix.qcmId, props.choix.reponse, props.choix.label)}*/
          />
        </div>
      );
    } else {
      return (
        <div className="">
          <input
            type="radio"
            name={props.choix.qcmId}
            className={`form-check-input  me-2 ${inputValidation()}`}
            value={props.choix.label}
            checked={inputValidation()}
           /* onChange={(event) => handleForms(props.choix.qcmId, props.choix.reponse, props.choix.label)}*/
          />
        </div>
      );
    }
  };

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        {renderAnswers()}
        <label className={`d-block ${feedBack()}`}> {props.choix.label}</label>
      </div>
    </div>
  );
};

export default Question;
