import React, { useState } from "react";
import { logoutUser } from "../api/authAPI";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
  firstName: "",
  lastName: "",
  photo: "",
  role: "",
  email: "",
});
export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initEmail = localStorage.getItem("email");
  const initFirstName = localStorage.getItem("firstName");
  const initAvatarUrl = localStorage.getItem("avatarUrl");
  const initLastName = localStorage.getItem("lastName");
  const initRole = localStorage.getItem("role");
  const [token, setToken] = useState(initToken);
  const [email, setEmail] = useState(initEmail);
  const [firstName, setFirstName] = useState(initFirstName);
  const [lastName, setLastName] = useState(initLastName);
  const [avatarUrl, setAvatarUrl] = useState(initAvatarUrl);
  const [role, setRole] = useState(initRole);

  const userIsLoggedIn = token ? true : false;

  const LoginHandler = (token, firstName, lastName, avatarUrl, email, role) => {
    setToken(token.startsWith("Bearer") ? token : "Bearer " + token);
    localStorage.setItem("token", "Bearer " + token);

    setEmail(email);
    localStorage.setItem("email", email);

    setAvatarUrl(avatarUrl);
    localStorage.setItem("avatarUrl", avatarUrl);

    setFirstName(firstName);
    localStorage.setItem("firstName", firstName);

    setLastName(lastName);
    localStorage.setItem("lastName", lastName);

    setRole(role);
    localStorage.setItem("role", role);
  };
  const LogoutHandler = () => {
    logoutUser()
      .then((res) => {
        setFirstName(null);
        setAvatarUrl(null);
        setLastName(null);
        setEmail(null);
        setRole(null);
        setToken(null);
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("email");
        localStorage.removeItem("avatarUrl");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    firstName: firstName,
    lastName: lastName,
    photo: avatarUrl,
    role: role,
    email: email,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
