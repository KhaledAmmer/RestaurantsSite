import React, { useContext, useState } from "react";
import "./style.css";
import { Registration } from "../../../../../controllers/registration";
import { ErrorsDiv } from "../../../../Registration/Register/ErrorsDiv";
import "./style.css";
import { Gender } from "./../../../../Registration/Register/GenderDiv";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignUpFormShown } from "../../../../../redux/reducers/auth";
import { SuperAdmin } from "../../../../../controllers/superAdmin";
export const EditForm = ({ user = {}, setIsEditFormShown }) => {

  const [firstName, setFirstName] = useState(`${user.firstName}`);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [role_id, setRole] = useState(user.role_id);
  const [password, setPassword] = useState(user.password);
  const [isDialogShown, setIsDialogShown] = useState("");
  let [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => {
    return state;
  });
  const buildAlertDialog = ({ bgColor, color, text, text2 }) => {
    setTimeout(() => {
      setIsDialogShown(false);
    }, 2500);

    return (
      <div id="Alert">
        <div style={{ backgroundColor: `${bgColor}` }}>
          <p>
            <strong style={{ color: `${color}` }}>{text}</strong>
            <br />
            <small style={{ color: `${color}` }}>{text2}</small>
          </p>
        </div>
      </div>
    );
  };
  const createInput = ({
    placeholder,
    setState,
    type = "text",
    key = "",
    name = "",
  }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={name}
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
          className="input"
        />
      </div>
    );
  };

  const updateUser = async () => {
    const inputForm = {
      FirstName: `${firstName} `,
      LastName: ` ${lastName}`,
      Email: email,
      Password: password,
      Gender: gender,
    };

    errors = Registration.checkFormErrors({
      isLoginForm: false,
      inputForm: inputForm,
    });
    if (errors.length === 0) {
      const body = {
        id:user.id,
        firstName,
        lastName,
        email,
        password,
        role_id,
        gender,
      };
      const serverError = await SuperAdmin.updateUser({
        user: body,
        token: auth.token,
      });
    } else {
      setErrors(errors);
    }
  };
  return (
    <div id="signup-form">
      {isDialogShown ? (
        buildAlertDialog({
          bgColor: "green",
          color: "white",
          text: "SignUp Completed Successfully",
          text2: `Welcome to our community ${firstName + " " + lastName}`,
        })
      ) : (
        <></>
      )}
      <div id="create-request-form-inner">
        <div id="signup--exit-button">
          <button
            onClick={() => {
              setIsEditFormShown(false)
            }}
          >
            X
          </button>
        </div>

        <h1>UPDATE USER </h1>
       
        <hr />
        <div id="register-username-div">
          {createInput({
            placeholder: "First Name",
            type: "text",
            key: "FirstName",
            name: firstName,
            setState: setFirstName,
          })}
          {createInput({
            placeholder: "Last Name",
            type: "text",
            key: "LastName",
            name: lastName,
            setState: setLastName,
          })}
        </div>

        {createInput({
          placeholder: "Email",
          type: "text",
          key: "Email",
          name: email,
          setState: setEmail,
        })}
        {createInput({
          placeholder: "Password",
          type: "password",
          key: "Password",
          name: password,
          setState: setPassword,
        })}

        {createInput({
          placeholder: "Role Id",
          type: "number",
          key: "number",
          name: role_id,
          setState: setRole,
        })}
        <Gender setGender={setGender} errors={errors} setErrors={setErrors} />
        <ErrorsDiv errors={errors} />
        <div id="signup-button-div">
          <button onClick={updateUser}>Update</button>
        </div>
      </div>
    </div>
  );
};
