import React, { Component } from "react";
import "../style/index.css";

var navstyle = {
  backgroundColor: ""
};

class ClassicFormPage extends Component {
  state = {
    token: ""
  };
  componentDidMount() {
    window.onload = function() {
      try {
        var url = document.location.href,
          params = url.split("?")[1].split("&"),
          data = {},
          tmp;
        for (var i = 0, l = params.length; i < l; i++) {
          tmp = params[i].split("=");
          data[tmp[0]] = tmp[1];
        }
        //document.getElementById("here").innerHTML = data.access_token;
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
          <a className="navbar-brand" href="s">
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
                <a className="nav-link" href="s">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li id="token"></li>
              <li className="nav-item">
                <a className="nav-link" href="a">
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
                  <a className="dropdown-item" href="aasd">
                    Action
                  </a>
                  <a className="dropdown-item" href="a">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="a">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="a">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="a">
                  Contact us
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="cases.html">
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
        <div className="container">
          <form action="../cases.html?access_token=1">
            <button className="btn btn2">Submit a case</button>
          </form>
          <form action="changeCase.html">
            <button className="btn btn2">Modify a case</button>
          </form>
          <form action="ViewCases.html">
            <button className="btn btn2">View all cases</button>
          </form>
          <form>
            <button className="btn btn2">View a case</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ClassicFormPage;
