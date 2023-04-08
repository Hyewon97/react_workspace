import { useEffect } from "react";
// import { useNaigate } from "react-router-dom";

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    localStorage.clear();
    // navigator("/");
    window.location.replace("/");
  });
};

export default LogOut;
