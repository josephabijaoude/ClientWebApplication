import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as msal from "@azure/msal-browser";
import * as Msal from "msal";

class SupportPage extends Component {
  state = {
    idToken: "",
    accessToken: "",
  };
  getToken = (idtoken, myMSALObj) => {
    // if the user is already logged in you can acquire a token
    if (myMSALObj.getAccount()) {
      var tokenRequest = {
        scopes: ["api://fb1b1f8b-c282-46bc-87fe-d9e4363a7113/user_access"],
      };
      myMSALObj
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
          // get access token from response
          // response.accessToken
          this.setState({
            idToken: idtoken,
            accessToken: response.accessToken,
          });
          console.log(this.state);
        })
        .catch((err) => {
          // could also check if err instance of InteractionRequiredAuthError if you can import the class.
          if (err.name === "InteractionRequiredAuthError") {
            return myMSALObj
              .acquireTokenPopup(tokenRequest)
              .then((response) => {})
              .catch((err) => {
                // handle error
                console.log(err);
              });
          }
        });
    } else {
      // user is not logged in, you will need to log them in to acquire a token
      console.log("User not Logged in");
    }
  };
  SignInAuthorizationCode = async () => {
    const msalConfig = {
      auth: {
        clientId: "fb1b1f8b-c282-46bc-87fe-d9e4363a7113",
        authority:
          "https://login.microsoftonline.com/f38bccdc-d202-4429-9d61-2e0317bddc5f",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    //const myMSALObj = new msal.UserAgentApplication(msalConfig);
    /* eslint-disable no-unused-vars */
    const loginResponse = await msalInstance
      .loginPopup(loginRequest)
      .catch((err) => {
        // handle error
      });
    /* eslint-enable no-unused-vars */
    var request = {
      scopes: ["openid", "profile", "User.Read"],
    };
    const tokenResponse = await msalInstance
      .acquireTokenSilent(request)
      .catch(async (error) => {
        // fallback to interaction when silent call fails
        return await msalInstance.acquireTokenPopup(request).catch((error) => {
          console.log(error);
        });
      });
    this.setState({ token: tokenResponse.accessToken });
    console.log(this.state);
    return tokenResponse;
  };
  SignInImplicitFlow = async () => {
    const msalConfig = {
      auth: {
        clientId: "fb1b1f8b-c282-46bc-87fe-d9e4363a7113",
        authority:
          "https://login.microsoftonline.com/f38bccdc-d202-4429-9d61-2e0317bddc5f",
        redirectUri: "http://localhost:3000",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };
    const loginRequest = {
      scopes: [
        "openid",
        "profile",
        "User.Read",
        "api://fb1b1f8b-c282-46bc-87fe-d9e4363a7113/user_access",
      ],
    };
    const myMSALObj = new Msal.UserAgentApplication(msalConfig);
    var idToken = "";
    await myMSALObj
      .loginPopup(loginRequest)
      .then((loginResponse) => {
        idToken = loginResponse.idToken;
        console.log(idToken);
      })
      .catch((error) => {
        console.log(error);
      });
    this.getToken(idToken.rawIdToken, myMSALObj);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <button onClick={this.SignInImplicitFlow} className="btn btn2">
            Login with Murex
          </button>{" "}
          <Link
            to={{
              pathname: "/support/submit",
              state: {
                token: this.state.idToken,
                accessToken: this.state.accessToken,
              },
            }}
          >
            <button className="btn btn2">Submit a new case</button>{" "}
          </Link>
          <form>
            <Link to="/support/cases">
              <button className="btn btn2">Search cases</button>{" "}
            </Link>
          </form>
        </div>{" "}
      </React.Fragment>
    );
  }
}
export default SupportPage;
