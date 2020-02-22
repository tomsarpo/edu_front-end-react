import React from 'react';
import {
    BrowserRouter,
    Link
  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigator() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler navbar-toggler-right" type="button"
            data-toggle="collapse" data-target="#navbarSupportedContent" ariacontrols="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">My React Page</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navigator;
