import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdmin } from "../../../../controllers/superAdmin";
import { setUsers } from "../../../../redux/reducers/superAdmin";
import "./style.css";

import { EditForm } from "./EditForm";
import { CreateEmployee } from "./CreateEmployee";

export const Users = () => {
  const dispatch = useDispatch();
  const [isEmployeeFormShown, setIsEmployeeFormShown] = useState(false);
  const [isEditFormShown, setIsEditFormShown] = useState(false);
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });

  const createButton = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };
  const createRow = (user, index) => {
    return (
      <div className="user-row" key={user.id + user.email}>
        <h4>{index+1}</h4>
        <h4>{user.firstName + " " + user.lastName}</h4>
        <h4>{user.email}</h4>
        <h4>{user.role}</h4>
        <h4>{user.lastLogin}</h4>
        <div id="edit-btns-div">
          {createButton({
            onClick: () => {
              setCurrentIndex(index);
              setIsEditFormShown(true);
              setCurrentUser(user);
            },
            text: "Edit",
          })}
          {createButton({
            onClick: () => {
              setCurrentUser(user);
              setIsDeleteDialogShown(true);
              setCurrentIndex(index);
            },
            text: "Delete",
          })}
        </div>
      </div>
    );
  };
  const createRow1 = (user, index) => {
    return (
      <div className="user-row1" key={user.id + user.email}>
        <h4>{index+1}</h4>
        <h4>{user.firstName + " " + user.lastName}</h4>
        <h4>{user.name}</h4>
        <h4>{user.salary}</h4>
        <h4>{user.weeklyHours}</h4>
        <h4>{user.shift}</h4>
      </div>
    );
  };

  const deleteDialog = ({ title, text }) => {
    return (
      <div id="delete-pop">
        <div id="inner-delete-pop">
          <h3>{title}</h3>
          <p>{text}</p>
          <div id="edit-btns-div">
            {createButton({
              text: "Yes",
              onClick: async () => {
                await SuperAdmin.deleteUser({
                  id: currentUser.id,
                  token: auth.token,
                });
                const users = [...superAdminPanel.users];
                users.splice(currentIndex, 1);
                dispatch(setUsers(users));
                setIsDeleteDialogShown(false);
              },
            })}
            {createButton({
              text: "Cancel",
              onClick: () => {
                setIsDeleteDialogShown(false);
              },
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {isEmployeeFormShown ? (
        <CreateEmployee setIsEmployeeFormShown={setIsEmployeeFormShown} />
      ) : (
        <></>
      )}
      {isEditFormShown ? (
        <EditForm setIsEditFormShown={setIsEditFormShown} user={currentUser} />
      ) : (
        <></>
      )}

      {isDeleteDialogShown ? (
        deleteDialog({
          text: "User will be deleted, Are you sure?",
          title: "Delete User",
        })
      ) : (
        <></>
      )}
      <div id="adduser-div">
        <p>
          <strong>Employees</strong> you can add,update and remove employee
        </p>

        <button
          onClick={() => {
            setIsEmployeeFormShown(true);
          }}
        >
          {" "}
          + Employee
        </button>
      </div>

      <div className="user-dashboard" style={{ marginTop: "5px" }}>
        <div id="dash-title-div" className="user-row">
          <h4>ID</h4>
          <h4>NAME</h4>
          <h4>EMAIL</h4>
          <h4>ROLE</h4>
          <h4>LAST LOGIN</h4>
          <h4>ACTIONS</h4>
        </div>
        {superAdminPanel.users.length ? (
          superAdminPanel.users.map((user, index) => {
            return createRow(user, index);
          })
        ) : (
          <></>
        )}
      </div>
      <div className="user-dashboard" style={{ marginTop: "2px" }}>
        <div id="dash-title-div" className="user-row">
          <h4>ID</h4>
          <h4>NAME</h4>
          <h4>RESTAURANT</h4>
          <h4>SALARY</h4>
          <h4>WEEKLY HOURS</h4>
          <h4>SHIFT</h4>
        </div>
        {superAdminPanel.users.length ? (
          superAdminPanel.users.map((user, index) => {
            return createRow1(user, index);
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
