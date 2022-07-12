import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests, setUsers } from "../../../../redux/reducers/superAdmin";
import { Owner } from "../../../../controllers/owner";
import "./style.css";
import { CreateRequest } from "./CreateRequest";
import { CreateRestaurant } from "./CreateRestaurant";
import{ User} from "../../../../controllers/user"

export const Requests = () => {
  const dispatch = useDispatch();
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [isCreateRequestDialogShown, setIsRequestDialogShown] = useState(false);
  const [isCreateRestaurantDialogShown, setIsRestaurantDialogShown] =
    useState(false);

  const [currentIndex, setCurrentIndex] = useState({});

  const [currentRequest, setCurrentRequest] = useState({});

  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });
  const createButton = ({ onClick, text, state }) => {
    return (
      <button
        onClick={onClick}
        style={
          state !== "Accepted"
            ? { backgroundColor: "red" }
            : { backgroundColor: "green" }
        }
      >
        {text}
      </button>
    );
  };
  const createRow = (request, index) => {
    return (
      <div className="user-row" key={request.id + request.email}>
        <h4>{index+1}</h4>
        <h4>{User.userName}</h4>
        <h4>{request.email}</h4>
        <h4>{request.state}</h4>
        <h4>{request.restaurantName}</h4>
        <div id="edit-btns-div">
          {request.state !== "Accepted" ? (
            createButton({
              onClick: () => {
                setCurrentIndex(index);
                setCurrentRequest(request);
                setIsDeleteDialogShown(true);
              },
              text: "Delete",
              state: request.state,
            })
          ) : request.state === "Accepted" ? (
            createButton({
              onClick: async () => {
                setCurrentRequest(request);
                setCurrentIndex(index);
                setIsRestaurantDialogShown(true);
              },
              text: "Create Restaurant",
              state: request.state,
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const updateRequest = async (state) => {
    if (state !== "Accepted") {
      await Owner.deleteRequest({
        token: auth.token,
        requestId: currentRequest.id,
      });
      const requests = [...superAdminPanel.requests];
      requests.splice(currentIndex, 1);
      dispatch(setRequests(requests));
    } else {
    }
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
                updateRequest(currentRequest.state);
                setIsDeleteDialogShown(false);
              },
            })}
            {createButton({
              text: "Cancel",
              onClick: async () => {
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
      <div id="request-div">
        <p>
          <strong>Requests,</strong> you can send and remove restaurant request
        </p>

        <button
          onClick={() => {
            setIsRequestDialogShown(true);
          }}
        >
          {" "}
          + Request
        </button>
      </div>
      {isDeleteDialogShown ? (
        deleteDialog({
          text: "Request will be Deleted, Are you sure?",
          title: "Delete Request",
        })
      ) : (
        <></>
      )}
      {isCreateRequestDialogShown ? (
        <CreateRequest setIsRequestDialogShown={setIsRequestDialogShown} />
      ) : (
        <></>
      )}
      {isCreateRestaurantDialogShown ? (
        <CreateRestaurant
          setIsRestaurantDialogShown={setIsRestaurantDialogShown}
          currentIndex={currentIndex}
        />
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
        {superAdminPanel.requests.length ? (
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
