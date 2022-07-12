import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdmin } from "../../../../controllers/superAdmin";
import { setUsers } from "../../../../redux/reducers/superAdmin";
import "./style.css";
import { RegisterComponent } from "../../../Registration/Register";
import { EditForm } from "./EditForm";

export const Users = () => {
  const dispatch = useDispatch();
  const [isRegisterShown, setIsRegisterShown] = useState(false);
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
        <h4>{index + 1}</h4>
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
    <div style={{width:"100%"}}>
      {isRegisterShown ? (
        <RegisterComponent
          superAdminRegister={true}
          setIsRegisterShown={setIsRegisterShown}
        />
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
          <strong>Users</strong> you can add,update and remove users
        </p>

        <button
          onClick={() => {
            setIsRegisterShown(true);
          }}
        >
          {" "}
          + Users
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
    </div>
  );
};
