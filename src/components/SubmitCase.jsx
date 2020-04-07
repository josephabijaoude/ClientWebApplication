import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class SubmitCase extends Component {
  continue = () => {};
  state = {
    idToken: "",
    accessToken: "",
    project: "",
    description: "",
    priority: "",
    type: "",
    attachments: "",
  };
  testToken = () => {
    console.log(this.state);
  };
  componentDidMount() {
    var msg = this.props.location.state;
    this.setState(msg);
  }
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Case Details" />
          <TextField
            hintText="Enter Your Project Name"
            floatingLabelText="Project 1"
            onChange={this.handleChange("project")}
            defaultValue="Project Name"
          />
          <br />
          <TextField
            hintText="Enter Your Project Name"
            floatingLabelText="Project 1"
            onChange={this.handleChange("project")}
            defaultValue="Project Name"
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
const styles = {
  button: {
    margin: 15,
  },
};
export default SubmitCase;
