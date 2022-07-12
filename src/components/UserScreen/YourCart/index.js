import "./style.css";
import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Counter from "./Counter";
import { useNavigate } from "react-router-dom";
import { setsumPriceUser, setSumitems } from "../../../redux/reducers/User";
import { setShowLoginForm } from "../../../redux/reducers/auth";

const YourCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Userinfor = useSelector((state) => {
    return {
      yourCart: state.User.cart,
      yourPrice: state.User.price,
      yourTotal: state.User.total,
      islogin: state.auth.isLoggedIn,
      name: state.User.name,
    };
  });

  const [totalPrice, setTotalPrice] = useState(
    Userinfor.yourPrice.reduce((acc, element, index) => {
      return acc + Number(element.price);
    }, 0)
  );

  const complete = () => {
    Userinfor.islogin == true
      ? navigate("/CompleteOrder")
      : dispatch(setShowLoginForm(true));
  };

  return (
    <div>
      {Userinfor.yourCart !== 0 && Userinfor.yourCart.length ? (
        Userinfor.yourCart.map((element, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "transparent",
                marginTop: "2px",
                margin: "0",
                padding: "2px",
              }}
            >
              {<Counter element={element} />}
            </div>
          );
        })
      ) : (
        <div id="empty-cart">
          <img src="https://freepngimg.com/thumb/categories/1325.png" />
          <h4>Your cart is empty, add meals to get started 😋</h4>
        </div>
      )}
      <h1>
        {Userinfor.yourCart !== 0 && Userinfor.yourCart.length ? (
          <div>
            <h5>Total:{Userinfor.yourTotal}</h5>
            <button
              className="checkout-btn"
              onClick={() => {
                complete();
                dispatch(setsumPriceUser());
                dispatch(setSumitems());
              }}
            >
              Go to the checkout
            </button>
          </div>
        ) : (
          ""
        )}
      </h1>
    </div>
  );
};

export default YourCart;
