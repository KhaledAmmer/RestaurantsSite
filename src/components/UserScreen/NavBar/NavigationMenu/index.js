import React from "react";
import "./style.css";
import { HiUsers } from "react-icons/hi";
import { BiGitPullRequest, BiLogOut } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { BiDetail } from "react-icons/bi";
import {
  setIsSignUpFormShown,
  setlogout,
  setShowLoginForm,
} from "../../../../redux/reducers/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { setIsShowMenu } from "../../../../redux/reducers/User";
import { User } from "../../../../controllers/user";

export const logOut = async ({ dispatch }) => {
  await localStorage.setItem("token", "");
  dispatch(setlogout(""));
};

//FcFeedback
export const MainNavigationMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });

  const logoArea = () => {
    return (
      <div id="main-nav-bar-logo-div">
        <img  src="https://img.freepik.com/free-vector/restaurant-logo-design-template_79169-56.jpg?w=2000" />
        <p>
          KHK<span>EATS</span>
        </p>
      </div>
    );
  };

  const menuButton = ({ text, onClick, icon }) => {
    return (
      <div className="main-Nav-menu-btn">
        {icon}
        <button onClick={onClick}>{text}</button>
      </div>
    );
  };

  return (
    <div id="main-nav-menu-bar">
      <div id="inner-main-nav-menu-bar">
        <div id="main-title-nav-bar">
          <AiOutlineMenu
            onClick={() => {
              dispatch(setIsShowMenu());
            }}
          />
        </div>
        {logoArea({})}

        {auth.isLoggedIn ? (
          <div>
            <br />
            <h3>Welcome {User.userName}</h3>
            <br />
          </div>
        ) : (
          <div>
            <div id="user-management-div">
              <h4>REGISTRATION</h4>
            </div>
            {menuButton({
              text: "Sign up",
              icon: <HiUsers />,
              onClick: async () => {
                dispatch(setShowLoginForm(true));
                dispatch(setIsSignUpFormShown());
                dispatch(setIsShowMenu());
              },
            })}
            {menuButton({
              text: "Login",
              icon: <IoMdLogIn />,
              onClick: async () => {
                dispatch(setShowLoginForm(true));
                dispatch(setIsShowMenu());
              },
            })}
          </div>
        )}

        <div id="user-management-div">
          <h4>JOIN US</h4>
        </div>
        {menuButton({
          text: "Create Your Restaurant",
          icon: <MdFastfood />,
          onClick: async () => {
            navigate("/joinUs",{ state:true});
            dispatch(setIsShowMenu());
          },
        })}
        <div id="user-management-div">
          <h4>ABOUT</h4>
        </div>
       
        {menuButton({
          text: "Feedback",
          icon: <VscFeedback />,
          onClick: async () => {
            navigate("/joinUs",{ state:false});
            dispatch(setIsShowMenu());
          },
        })}
        {menuButton({
          text: "About",
          icon: <BiDetail />,
          onClick: async () => {},
        })}
        {auth.isLoggedIn ? (
          <button
            onClick={() => {
              logOut({ dispatch });
            }}
            id="logout-btn1"
          >
            <div id="logout-div1">
              <BiLogOut />
              <h4>LogOut</h4>
            </div>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
