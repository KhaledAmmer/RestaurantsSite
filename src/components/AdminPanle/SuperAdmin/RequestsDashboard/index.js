import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdmin } from "../../../../controllers/superAdmin";
import { setRequests, setUsers } from "../../../../redux/reducers/superAdmin";
import "./style.css";

export const Requests = () => {
  const dispatch = useDispatch();
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [isAcceptDialogShown, setIsAcceptDialogShown] = useState(false);

  const [currentIndex, setCurrentIndex] = useState({});

  const [currentRequest, setCurrentRequest] = useState({});

  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });
  const createButton = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };
  const createRow = (request, index) => {
    return (
      <div className="user-row" key={request.id + request.email}>
        <h4>{request.id}</h4>
        <h4>{request.firstName + " " + request.lastName}</h4>
        <h4>{request.email}</h4>
        <h4>{request.state}</h4>
        <h4>{request.restaurantName}</h4>
        {request.state === "In Progress" ? (
          <div id="edit-btns-div">
            {createButton({
              onClick: () => {
                setCurrentIndex(index);
                setCurrentRequest(request);
                setIsAcceptDialogShown(true);
              },
              text: "Accept",
            })}
            {createButton({
              onClick: async () => {
                setCurrentRequest(request);
                setIsDeleteDialogShown(true);
                setCurrentIndex(index);
              },
              text: "Reject",
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const updateRequest = async (state) => {
    await SuperAdmin.acceptRequest({
      requestId: currentRequest.id,
      state: state,
      token: auth.token,
    });
    const requests = [...superAdminPanel.requests];
    requests[currentIndex] = {
      ...requests[currentIndex],
      state: state,
    };
    dispatch(setRequests(requests));
  };
  const deleteDialog = ({ title, text, state }) => {
    return (
      <div id="delete-pop">
        <div id="inner-delete-pop">
          <h3>{title}</h3>
          <p>{text}</p>
          <div id="edit-btns-div">
            {createButton({
              text: "Yes",
              onClick: async () => {
                updateRequest(state);
                setIsDeleteDialogShown(false);
                setIsAcceptDialogShown(false);
              },
            })}
            {createButton({
              text: "Cancel",
              onClick: async () => {
                setIsDeleteDialogShown(false);
                setIsAcceptDialogShown(false);
              },
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isDeleteDialogShown ? (
        deleteDialog({
          text: "Request will be rejected, Are you sure?",
          title: "Reject Request",
          state: "Rejected",
        })
      ) : (
        <></>
      )}

      {isAcceptDialogShown ? (
        deleteDialog({
          text: "Request will be Accepted, Are you sure?",
          title: "Accept Request",
          state: "Accepted",
        })
      ) : (
        <></>
      )}
      <div className="user-dashboard" style={{ marginTop: "5px" }}>
        <div id="dash-title-div" className="user-row">
          <h4>ID</h4>
          <h4>NAME</h4>
          <h4>EMAIL</h4>
          <h4>STATE</h4>
          <h4>{"restaurant".toUpperCase()}</h4>
          <h4>ACTIONS</h4>
        </div>
        {superAdminPanel.requests? (
          superAdminPanel.requests.map((request, index) => {
            return createRow(request, index);
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
