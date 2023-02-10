import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import NationDetail from "./Components/NationDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ContextProvider } from "./Context/StateContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import BorderCountry from "./Components/BorderCountry";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path=":id" element={<NationDetail />}></Route>
            <Route path="/borders/:id" element={<BorderCountry />}></Route>
          </Routes>
        </Router>
      </Layout>
    </ContextProvider>
  </React.StrictMode>
);
