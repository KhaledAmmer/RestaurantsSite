import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Registration } from "../../../../controllers/registration";
import { ErrorsDiv } from "../../Register/ErrorsDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSignUpFormShown,
  setlogin,
  setShowLoginForm,
} from "../../../../redux/reducers/auth";

import { setidUser } from "../../../../redux/reducers/User";
import { FcGoogle } from "react-icons/fc";
import { User } from "../../../../controllers/user";
export const LoginForm = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => {
    return state;
  });
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const createInput = ({ placeholder, setState, type = "text", key = "" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setErrors(
              Registration.removeErrors({
                isLoginForm: false,
                key: key,
                value: e.target.value,
                errors,
              })
            );
            setState(e.target.value);
          }}
          className="input1"
        />
      </div>
    );
  };
  const login = async () => {
    const inputForm = {
      Email: email,
      Password: password,
    };

    errors = Registration.checkFormErrors({
      isLoginForm: true,
      inputForm: inputForm,
    });

    if (errors.length === 0) {
      email = email.toLowerCase().trim();
      const response = await Registration.login({
        email,
        password,
      });
      User.id = response.userId;
      User.userName = response.userName;
      User.imgUrl = response.imgUrl;
      User.roleId = response.roleId;
      console.log(response);
     await localStorage.setItem(
        "user",
        JSON.stringify({
          id: User.id,
          userName: User.userName,
          imgUrl: User.imgUrl,
          roleId: User.roleId,
        })
      );
     
      dispatch(setidUser({ userId: response.userId }));

      dispatch(setlogin(response.token));
      if (response.message !== "Login Successful") {
        setErrors([...errors, response.message]);
      } else {
        dispatch(setShowLoginForm());
        switch (User.roleId) {
          case 1:
            navigate(`/superAdminPanel/${User.userName}`);
            break;
          case 4:
            navigate("/");
            break;
          default:
            navigate(`/ownerPanel/${User.userName}`);
            break;
        }
      }
    } else {
      setErrors(errors);
    }
  };
  const createButton = ({ text, onClick, bkc, color }) => {
    return (
      <button
        className="login-btn"
        style={{ backgroundColor: bkc, color: color }}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };

  return (
    <div id="login-form-email-password-div">
      <div id="signup--exit-button">
        <button
          onClick={() => {
            dispatch(setShowLoginForm(false));
          }}
        >
          X
        </button>
      </div>
      <p id="login-label">LOGIN</p>
      <hr />
      {createInput({
        placeholder: "Email",
        type: "text",
        key: "Email",
        setState: setEmail,
      })}
      {createInput({
        placeholder: "Password",
        type: "password",
        key: "Password",
        setState: setPassword,
      })}
      <ErrorsDiv errors={errors} />
      <div id="btns-div-login">
        {createButton({
          text: "Login",
          onClick: login,
          bkc: "orange",
          color: "black",
        })}
        <h5>OR</h5>
        {createButton({
          text: "Create New Account",
          onClick: () => {
            dispatch(setIsSignUpFormShown(true));
          },
          color: "white",
        })}
        <div id="google-div">
          <FcGoogle />
          {createButton({
            text: "Login With Google",
            onClick: () => {},
            color: "white",
          })}
        </div>
      </div>
    </div>
  );
};
