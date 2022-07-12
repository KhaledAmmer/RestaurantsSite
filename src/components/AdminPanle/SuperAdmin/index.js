import { useSelector, useDispatch } from "react-redux";
import react, { useEffect, useState } from "react";
import { NavigationMenu } from "./NavigationMenu";
import "./style.css";
import { Users } from "./UsersDashboard";
import { Requests } from "./RequestsDashboard";
import { NavigationBarPanel } from "./NavigationBar";
import { Restaurants } from "./RestaurantDashboard";
import { User } from "../../../controllers/user";
import { ErrorPage } from "../../ErrorPage";
import { SuperAdmin } from "../../../controllers/superAdmin";
import { setUsers } from "../../../redux/reducers/superAdmin";
export const SuperAdminPanel = () => {
  const dispatch = useDispatch();
  const [hideMenu,setHideMenu] = useState(false);
  const [isUsersShown, setIsUsersShown] = useState(0);
  const { superAdminPanel,auth } = useSelector((state) => {
    return state;
  });
  useEffect(()=>{
    ( async () => {
      const {users} = await SuperAdmin.getAllUsers({token:auth.token});
      setIsUsersShown(0);
      dispatch(setUsers(users))
    })()
  },[])
  
  return User.roleId === 1 ?(
    <div style={{ height:"100%",display: "flex" }}>
      {hideMenu?<NavigationMenu setIsUsersShown={setIsUsersShown} />:<></>}
      <div style={{ height:"100%", width:"100%"}}>
        <NavigationBarPanel setHideMenu={setHideMenu} hideMenu={hideMenu}/>
        {isUsersShown === 0
          ? <Users/>
          :(isUsersShown === 1?<Requests/>:<Restaurants/>)} 
      </div>
    </div>
  ):<></>;
};
