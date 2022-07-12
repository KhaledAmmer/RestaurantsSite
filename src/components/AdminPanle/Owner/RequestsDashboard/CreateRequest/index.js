import React, { useContext, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Owner } from "../../../../../controllers/owner";
import { setRequests } from "../../../../../redux/reducers/superAdmin";

export const CreateRequest = ({setIsRequestDialogShown}) => {
  const [name, setName] = useState("");
  const [isDialogShown, setIsDialogShown] = useState("");
  const dispatch = useDispatch();

  const { auth, superAdminPanel } = useSelector((state) => {
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
  const createInput = ({ placeholder, setState, type = "text", key = "" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setState(e.target.value);
          }}
          className="input"
        />
      </div>
    );
  };

  const createRequest = async () => {
    if (name.replaceAll(" ", "") !== "") {
      const { results } = await Owner.createRequest({
        token: auth.token,
        restaurantName: name,
      });
      const requests = [...superAdminPanel.requests];
     console.log(requests);
      requests.push({
        ...requests[0],
        id: results.insertId,
        state: "In Progress",
        restaurantName:name
      });
      setIsRequestDialogShown(false)
      setIsDialogShown(true)
     dispatch(setRequests(requests))
    }
  };
  return (
    <div id="signup-form">
      {isDialogShown ? (
        buildAlertDialog({
          bgColor: "green",
          color: "white",
          text: "Request Created Successfully",
          text2: `The response will be in few hours `,
        })
      ) : (
        <></>
      )}
      <div id="create-request-form-inner">
        <div id="signup--exit-button">
          <button onClick={() => {
            setIsRequestDialogShown(false)
          }}>X</button>
        </div>

        <h1>Create Request</h1>
        <hr />

        {createInput({
          placeholder: "Restaurant Name",
          type: "text",
          key: "text",
          setState: setName,
        })}

        <div id="signup-button-div">
          <button onClick={createRequest}>Send Request</button>
        </div>
      </div>
    </div>
  );
};
