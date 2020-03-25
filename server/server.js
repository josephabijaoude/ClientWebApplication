var ClientOAuth2 = require("client-oauth2");

var githubAuth = new ClientOAuth2({
  clientId: "fb1b1f8b-c282-46bc-87fe-d9e4363a7113",
  clientSecret: "iW7c=V_8vz7-=ihP8IF?fcpM504Btpo?",
  accessTokenUri:
    "https://login.microsoftonline.com/f38bccdc-d202-4429-9d61-2e0317bddc5f/oauth2/v2.0/token",
  authorizationUri:
    "https://login.microsoftonline.com/f38bccdc-d202-4429-9d61-2e0317bddc5f/oauth2/v2.0/authorize",
  redirectUri: "http://localhost:3001/callback",
  scopes: [
    "openid",
    "profile",
    "api://fb1b1f8b-c282-46bc-87fe-d9e4363a7113/user_access",
    "offline_access"
  ]
});

var express = require("express");
var app = express();

app.get("/login", function(req, res) {
  var uri = githubAuth.code.getUri();
  console.log(uri);
  res.redirect(uri);
});

app.get("/callback", function(req, res) {
  githubAuth.code.getToken(req.originalUrl).then(function(user) {
    console.log(user); //=> { accessToken: '...', tokenType: 'bearer', ... }

    // Refresh the current users access token.
    user.refresh().then(function(updatedUser) {
      console.log(updatedUser !== user); //=> true
      console.log(updatedUser.accessToken);
    });

    // We should store the token into a database.
    res.redirect("http://localhost:3000?access_token=" + user.accessToken);
    return res.send("Bearer " + user.accessToken);
  });
});
const PORT = 3001;
app.listen(PORT);
