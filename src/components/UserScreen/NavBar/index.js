

import "./style.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { setShowLoginForm } from "../../../redux/reducers/auth";
import {
  setrestaurantId,
  setSearchRestaurant,
  setIsShowMenu,
} from "../../../redux/reducers/User";
import { logOut } from "./NavigationMenu";

const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => {
    return state;
  });
  const user = useSelector((state) => {
    return state.User;
  });
  const showLoginPop = () => {
    dispatch(setShowLoginForm(true));
  };
  const createRestaurantCard = (restaurant) => {
    return (
      <div
        className="results-search-div"
        onClick={async () => {
          //kha
          await localStorage.setItem("restaurantId", restaurant.id);
          dispatch(setrestaurantId({ restId: restaurant.id }));
          dispatch(setSearchRestaurant([]));
          navigate("/RestaurantPage");
        }}
      >
        <img src={restaurant.backImg} />
        <strong>{restaurant.name}</strong>
      </div>
    );
  };

  const searchForRestaurant = (name) => {
    if (name.length) {
      dispatch(
        setSearchRestaurant(
          user.restaurants.filter((res) => {
            return res.name.toLowerCase().includes(name.toLowerCase());
          })
        )
      );
    } else {
      dispatch(setSearchRestaurant([]));
    }
  };
  return (
    <div id="main-nav-bar">
      <div id="main-nav-bar-img-div">
        <AiOutlineMenu
          className="main-menu-btn"
          onClick={() => {
            dispatch(setIsShowMenu());
          }}
        />
        <a href="/">
          <img src="https://img.freepik.com/free-vector/restaurant-logo-design-template_79169-56.jpg?w=2000" />
          <p>
            KHK<span>EATS</span>
          </p>
        </a>
      </div>
      <div id="search-div-main-page">
        <input
          placeholder="Search By Restaurant Name"
          onChange={(e) => {
            searchForRestaurant(e.target.value);
          }}
        />
        {user.searchRestaurants.length ? (
          <div id="inner-search-div">
            {user.searchRestaurants.map((restaurant) => {
              return createRestaurantCard(restaurant);
            })}
          </div>
        ) : (
          <></>
        )}
      </div>


      <div id="main-nav-bar-btns">
        <a
        href="/AllRestarnts/all"
          onClick={() => {
            navigate("/AllRestarnts/all",{state:"all"});
          }}
        >
          All Restaurants
        </a>
        {auth.isLoggedIn ? (
          <button
            onClick={() => {
              logOut({ dispatch });
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              <BiLogOut />
              <h4>LogOut</h4>
            </div>
          </button>
        ) : (
          <button onClick={showLoginPop}>My Account</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
