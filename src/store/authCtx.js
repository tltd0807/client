import React, { useState } from "react";
import { isLoggedIn } from "../api/authAPI";

const AuthContext = React.createContext({
  isLoggedIn: () => {},
  logout: () => {},
  userFirstName: "",
  photo: "",
  role: "",
});
export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initFirstName = localStorage.getItem("firstName");
  const initAvatarUrl = localStorage.getItem("avatarUrl");
  const initLastName = localStorage.getItem("lastName");
  const initRole = localStorage.getItem("role");
  const [token, setToken] = useState(initToken);
  const [firstName, setFirstName] = useState(initFirstName);
  const [lastName, setLastName] = useState(initLastName);
  const [avatarUrl, setAvatarUrl] = useState(initAvatarUrl);
  const [role, setRole] = useState(initRole);

  const userIsLoggedIn = (token) => {
    isLoggedIn(token)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };
  const LoginHandler = (token, firstName, lastName, avatarUrl, role) => {
    setToken(token);
    localStorage.setItem("token", "Bearer " + token);
    console.log("Bearer " + token);
    setAvatarUrl(avatarUrl);
    localStorage.setItem("avatarUrl", avatarUrl);

    setFirstName(firstName);
    localStorage.setItem("firstName", firstName);

    setFirstName(lastName);
    localStorage.setItem("lastName", lastName);

    setRole(role);
    localStorage.setItem("role", role);
  };
  const LogoutHandler = () => {
    setFirstName(null);
    setAvatarUrl(null);
    setLastName(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    firstName: firstName,
    lastName: lastName,
    avatarUrl: avatarUrl,
    role: role,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
