import React from "react";
import Login from "./components/Login";
import useCheckLogin from "../../Hooks/auth/useCheckLogin";


const AuthPage = () => {
    const {  loading} = useCheckLogin();
    
   
  return (
    <div>
      <Login />
    </div>
  );
};

export default AuthPage;
