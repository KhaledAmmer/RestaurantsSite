import React from "react";
import "./style.css";
import { HiUsers } from "react-icons/hi";
import { BiGitPullRequest, BiLogOut } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import react, { useEffect, useState } from "react";
import { SuperAdmin } from "../../../../controllers/superAdmin";
import { setRequests, setRestaurants, setUsers } from "../../../../redux/reducers/superAdmin";

import { User } from "../../../../controllers/user";
import { setlogout } from "../../../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";


export const NavigationMenu = ({setIsUsersShown}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });

  const userArea = ({
    name = User.userName,
    imgUrl = User.imgUrl,
  }) => {
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
      <div id="user-management-div">
        <h4>User Management</h4>
      </div>
      {menuButton({ text: "Users", icon: <HiUsers />, onClick: async () => {
        const {users} = await SuperAdmin.getAllUsers({token:auth.token});
        setIsUsersShown(0);
        dispatch(setUsers(users))
      } })}
      {menuButton({
        text: "Requests",
        icon: <BiGitPullRequest />,
        onClick:async () => {
          const {requests} =await SuperAdmin.getAllRequests({token:auth.token});
          setIsUsersShown(1);
          dispatch(setRequests(requests))
        },
      })}
      {menuButton({
        text: "Restaurants",
        icon: <MdFastfood />,
        onClick: async () => {
          const {restaurants} = await SuperAdmin.getAllRestaurants({token:auth.token});
          setIsUsersShown(2);
          dispatch(setRestaurants(restaurants));
        },
      })}
      <button  onClick = {()=>{
        dispatch(setlogout());
        navigate("/")
      }}id="logout-btn">
        <div id="logout-div">
          <BiLogOut />
          <h4>LogOut</h4>
        </div>
      </button>
    </div>
  );
};
