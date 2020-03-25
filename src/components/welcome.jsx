import React, { Component } from "react";
import Background from "../images/cs.jpg";

var sectionStyle = {
  width: "100%",
  height: "900%",
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

class Home extends Component {
  state = {};
  render() {
    return (
      <div style={sectionStyle}>
        <h1 align="center">Welcome to the Support page</h1>
        <div>
          <button class="btn btn1">View a case</button>
          <button class="btn btn1">Modify a case</button>
          <button class="btn btn1">View a case</button>
        </div>
      </div>
    );
  }
}

export default Home;
