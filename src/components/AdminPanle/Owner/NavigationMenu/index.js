import React from "react";
import "./style.css";
import { HiUsers } from "react-icons/hi";
import { BiGitPullRequest, BiLogOut } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { SuperAdmin } from "../../../../controllers/superAdmin";
import {
  setMeals,
  setOrders,
  setRequests,
  setRestaurants,
  setUsers,
} from "../../../../redux/reducers/superAdmin";
import { Owner } from "../../../../controllers/owner";
import { Employee } from "../../../../controllers/employee";
import { User } from "../../../../controllers/user";
import { setlogout } from "../../../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

export const NavigationMenu = ({ setIsUsersShown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });

  const userArea = ({ name = User.userName, imgUrl = User.imgUrl?User.imgUrl:"https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" }) => {
    return (
      <div id="user-img-div">
        <div>
          <img src={imgUrl} />
        </div>
        <div>
          <h4>{name} </h4>
        </div>
      </div>
    );
  };

  const menuButton = ({ text, onClick, icon }) => {
    return (
      <div className="Nav-menu-btn">
        {icon}
        <button onClick={onClick}>{text}</button>
      </div>
    );
  };

  return (
    <div id="nav-menu-bar">
      <div id="title-nav-bar">
        <h2>UMS</h2>
      </div>
      {userArea({})}

      {User.roleId == "2" ? (
        <div>
          <div id="user-management-div">
            <h4>User Management</h4>
          </div>
          {menuButton({
            text: "Employee",
            icon: <HiUsers />,
            onClick: async () => {
              const { users } = await Owner.getAllEmployee({
                token: auth.token,
              });
              setIsUsersShown(0);
              dispatch(setUsers(users));
            },
          })}
          {menuButton({
            text: "Requests",
            icon: <BiGitPullRequest />,
            onClick: async () => {
              const { requests } = await Owner.getOwnerRequests({
                token: auth.token,
              });
              setIsUsersShown(1);
              dispatch(setRequests(requests));
            },
          })}
          {menuButton({
            text: "My Restaurants",
            icon: <MdFastfood />,
            onClick: async () => {
              const { restaurants } = await Owner.getOwnerRestaurants({
                token: auth.token,
              });
              setIsUsersShown(2);
              dispatch(setRestaurants(restaurants));
            },
          })}
        </div>
      ) : (
        <></>
      )}

      <div id="user-management-div">
        <h4>Restaurant Management</h4>
      </div>
      {menuButton({
        text: "Orders",
        icon: <MdFastfood />,
        onClick: async () => {
          console.log(superAdminPanel.restaurants.length);
          const { orders } = await Employee.getAllOrder({
            token: auth.token,
            restaurantId:
              User.roleId == "2"
                ? superAdminPanel.restaurants.length
                  ? superAdminPanel.restaurants[0].id
                  : 1
                : superAdminPanel.restaurants.length
                ? superAdminPanel.restaurants[0].restaurant_id
                : 1,
          });

          setIsUsersShown(4);
          dispatch(setOrders(orders));
        },
      })}
      {menuButton({
        text: "meals",
        icon: <MdFastfood />,
        onClick: async () => {
          const { meals } = await Employee.getAllMeals({
            token: auth.token,
            restaurant_id:
              User.roleId == "2"
                ? superAdminPanel.restaurants.length
                  ? superAdminPanel.restaurants[0].id
                  : 1
                : superAdminPanel.restaurants.length
                ? superAdminPanel.restaurants[0].restaurant_id
                : 1,
          });
          setIsUsersShown(3);
          dispatch(setMeals(meals));
        },
      })}
      <button
        onClick={() => {
          dispatch(setlogout());
          navigate("/");
        }}
        id="logout-btn"
      >
        <div id="logout-div">
          <BiLogOut />
          <h4>LogOut</h4>
        </div>
      </button>
    </div>
  );
};
