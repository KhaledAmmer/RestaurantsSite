import "./App.css";
import { SuperAdminPanel } from "./components/AdminPanle/SuperAdmin";
import { Route, Routes } from "react-router-dom";
import ScreenHome from "./components/UserScreen/ScreenHome";
import AllRestaurants from "./components/UserScreen/AllRestarnts";
import RestaurantPage from "./components/UserScreen/RestaurantPage";
import { LoginComponent } from "./components/Registration/Login";
import { OwnerPanel } from "./components/AdminPanle/Owner";
import CompleteOrder from "./components/UserScreen/YourCart/CompleteOrder";

import { useEffect } from "react";
import { User } from "./controllers/user";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "./redux/reducers/User";
import { ContactUs } from "./components/UserScreen/ScreenHome/ContactUs";
import { MainNavigationMenu } from "./components/UserScreen/NavBar/NavigationMenu";
import { ErrorPage } from "./components/ErrorPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        User.userName = user.userName;
        User.roleId = user.roleId;
        User.imgUrl = user.imgUrl;
        User.id = user.id;
      }

      const { result } = await User.getAllRestaurants();
      dispatch(setRestaurants(result));
    })();
  }, []);
  const user = useSelector((state) => {
    return state.User;
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  return (
    <div className="App">
      {auth.showLoginForm ? <LoginComponent /> : <></>}
      {user.showMenu ? <MainNavigationMenu /> : <></>}
      <Routes>
        <Route path={"/"} element={<ScreenHome />} />
        <Route path={"/joinUs"} element={<ContactUs />} />
        <Route
          path="/SuperAdminPanel/:name"
          element={<SuperAdminPanel />}
        />
        <Route path="/OwnerPanel/:name" element={<OwnerPanel />} />
        <Route path={"/AllRestarnts/:category"} element={<AllRestaurants />} />
        <Route path={"/RestaurantPage"} element={<RestaurantPage />} />
        <Route path={"/login"} element={<LoginComponent />} />

        <Route path={"/CompleteOrder"} element={<CompleteOrder />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
