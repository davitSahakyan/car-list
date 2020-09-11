function statusChangeCallback(response) {
  FB.getAuthResponse();
  if (response.status === "connected") {
    const { access_token } = FB.getAuthResponse();

    FB.api(
      "/me",
      "get",
      { access_token, fields: "id,name,last_name,first_name,picture ,email" },
      function (response) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach((user) => (user.isLogged = false));
        const name = response.first_name;
        const lastname = response.last_name;
        const login = response.email;
        const password = response.id;
        const img = response.picture.data.url;
        const foundRegistredUser = users.find((user) => user.login === login);
        if (foundRegistredUser) {
          foundRegistredUser.language = document.getElementById(
            "language"
          ).value;
          localStorage.setItem(
            "currentUser",
            JSON.stringify(foundRegistredUser)
          );
        } else {
          const newUser = {
            img,
            name,
            lastname,
            login,
            password,
            language: document.getElementById("language").value,
            type: "facebook",
          };
          users = [...users, newUser];
          localStorage.setItem("currentUser", JSON.stringify(newUser));
        }
        localStorage.setItem("users", JSON.stringify(users));
      }
    );
    testAPI();
    FB.login();
    window.location.assign("../home/home.html");
  } else {
    document.getElementById("status").innerHTML =
      "Please log" + "into this webpage.";
  }
}
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}
window.fbAsyncInit = function () {
  FB.init({
    appId: "723009974920333",
    cookie: true,
    xfbml: true,
    version: "v8.0 ",
  });
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};
function testAPI() {
  FB.api("/me", function (response) {
    document.getElementById("status").innerHTML =
      "Thanks for logging in, " + response.name + "!";
  });
}
