import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//react router setup
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import App from "./App";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Navbar from "./components/navbar/Navbar";
import Course from "./pages/course/Course";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Module from "./pages/module/Module";
import Qcm from "./pages/qcm/Qcm";

//inject redux
import { Provider } from "react-redux";
import store from "./store/store";

//primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


//courses gallery

import "react-image-gallery/styles/css/image-gallery.css";
import Terms from "./pages/terms/Terms";
import Politics from "./pages/politics/Politics";





ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="courses/:id" element={<Course />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="courses/1/modules/:id" element={<Module />} />
          <Route path="courses/1/modules/:id/qcm/:id" element={<Qcm />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/politics" element={<Politics />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
