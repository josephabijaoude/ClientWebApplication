import React, { Component } from "react";
import "../style/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewCases from "./ViewCases";
import SubmitCase from "./SubmitCase";
import SupportPage from "./SupportPage";

var navstyle = {
  backgroundColor: "",
};

class ClassicFormPage extends Component {
  state = {
    token: "",
  };
  constructor(props) {
    super(props);
    this.state = { token: "" };
  }
  componentDidMount() {
    window.onload = function () {
      try {
        var url = document.location.href,
          params = url.split("?")[1].split("&"),
          data = {},
          tmp;
        for (var i = 0, l = params.length; i < l; i++) {
          tmp = params[i].split("=");
          data[tmp[0]] = tmp[1];
        }
        if (data.access_token != null) {
          this.setState({ token: data.access_token });
          console.log(this.state.token);
        }
      } catch (e) {
        console.log(e);
      }
    }.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark" style={navstyle}>
          <a className="navbar-brand" href="/">
            Navigate
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="anavbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  CSR
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="a"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Services
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Contact us
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/support">
                  Support
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn1 btn2" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <Router>
          <Route path="/support" exact component={SupportPage} />
          <Route path="/support/cases" exact component={ViewCases} />
          <Route path="/support/submit" exact component={SubmitCase} />
        </Router>
      </React.Fragment>
    );
  }
}

export default ClassicFormPage;
