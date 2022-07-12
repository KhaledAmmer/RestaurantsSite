import { useSelector, useDispatch } from "react-redux";
import react, { useEffect, useState } from "react";
import { NavigationMenu } from "./NavigationMenu";
import "./style.css";
import { Users } from "./UsersDashboard";
import { Requests } from "./RequestsDashboard";
import { NavigationBarPanel } from "../SuperAdmin/NavigationBar";
import { Restaurants } from "../SuperAdmin/RestaurantDashboard";
import { Meals } from "./MealsDashboard";
import { Owner } from "../../../controllers/owner";
import { setOrders, setRestaurants } from "../../../redux/reducers/superAdmin";
import { Orders } from "./OrderDashboard";
import { User } from "../../../controllers/user";
import { Employee } from "../../../controllers/employee";
import { ErrorPage } from "../../ErrorPage";

export const OwnerPanel = () => {
  const dispatch = useDispatch();
  const [hideMenu, setHideMenu] = useState(false);
  const [isUsersShown, setIsUsersShown] = useState(0);
  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    (async () => {
      User.roleId = await JSON.parse(localStorage.getItem("user")).roleId;
      if (User.roleId == "2") {
        const { restaurants } = await Owner.getOwnerRestaurants({
          token: auth.token,
        });
      
        dispatch(setRestaurants(restaurants));
        setIsUsersShown(2);
      } else {
        const { restaurants } = await Employee.getEmployeeRestaurant({
          token: auth.token,
        });
        dispatch(setRestaurants(restaurants));

        const { orders } = await Employee.getAllOrder({
          token: auth.token,
          restaurantId: restaurants[0].id,
        });
        dispatch(setOrders(orders));
        setIsUsersShown(5);
      }
    })();
  }, []);
  return User.roleId == 2 || User.roleId == 3 ? (
    <div style={{ width: "100vw", display: "flex" }}>
      {hideMenu ? <NavigationMenu setIsUsersShown={setIsUsersShown} /> : <></>}
      <div style={{ height:"100%", width:"100%"}}>
        <NavigationBarPanel setHideMenu={setHideMenu} hideMenu={hideMenu} />
        {isUsersShown === 0 ? (
          <Users />
        ) : isUsersShown === 1 ? (
          <Requests />
        ) : isUsersShown === 2 ? (
          <Restaurants isOwner={true}/>
        ) : isUsersShown === 3 ? (
          <Meals />
        ) : (
          <Orders />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
//Orders
