import { LoginForm } from "./LoginForm";
import { useDispatch,useSelector } from "react-redux";
import "./style.css";
import { useEffect } from "react";
import { RegisterComponent } from "../Register";

export const LoginComponent = () => {
    
    const {auth} = useSelector((state)=>{
        return state;
    })
   
  return (
    <div id="login-form" style={false ? { opacity: "0.5" } : { opacity: "1" }}>
      <div id="login-form-inner">
        <div id="login-form-inner2">
          <LoginForm />
          {auth.isSignUpFormShown?<RegisterComponent/>:<></>}
        </div>
      </div>
    </div>
  );
};
