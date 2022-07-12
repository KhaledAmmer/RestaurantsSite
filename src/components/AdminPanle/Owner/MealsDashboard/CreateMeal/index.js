import React, { useContext, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

import { Employee } from "../../../../../controllers/employee";

import { setMeals } from "../../../../../redux/reducers/superAdmin";
import { createOption } from "..";

export const CreateMeal = ({
  setIsMealDialogShown,
  isUpdate = false,
  currentIndex,
  setIsUpdate,
  resId,
}) => {
  const { auth, superAdminPanel } = useSelector((state) => {
    return state;
  });
  const currentMeal = superAdminPanel.meals[currentIndex];
  const [name, setName] = useState(isUpdate ? currentMeal.name : "");
  const [imgUrl, setImgUrl] = useState(isUpdate ? currentMeal.imgUrl : "");
  const [category, setCategory] = useState(
    isUpdate ? currentMeal.category : ""
  );
  const [price, setPrice] = useState(isUpdate ? currentMeal.price : "");
  const [restaurant_id, setRestaurant_id] = useState(isUpdate ? resId : 1);
  const [isDialogShown, setIsDialogShown] = useState("");
  const dispatch = useDispatch();

  const buildAlertDialog = ({ bgColor, color, text, text2 }) => {
    setTimeout(() => {
      setIsDialogShown(false);
      setIsMealDialogShown(false);
    }, 2500);

    return (
      <div id="Alert">
        <div style={{ backgroundColor: `${bgColor}` }}>
          <p>
            <strong style={{ color: `${color}` }}>{text}</strong>
            <br />
            <small style={{ color: `${color}` }}>{text2}</small>
          </p>
        </div>
      </div>
    );
  };
  const createInput = ({ placeholder, setState, type = "text", value }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          min={1}
          onChange={(e) => {
            setState(e.target.value);
          }}
          className="input"
        />
      </div>
    );
  };

  const createMeal = async () => {
    const meal = { category, imgUrl, name, price };
    console.log({
      ...meal,
      restaurant_id,
      token: auth.token,
    });
    if (!isUpdate) {
      const response = await Employee.createMeal({
        ...meal,
        restaurant_id,
        token: auth.token,
      });
      if (response.success) {
        meal.id = response.result.insertId;
        setIsDialogShown(true);
        dispatch(setMeals([...superAdminPanel.meals, meal]));
      }
    } else {
      const response = await Employee.updateMeal({
        category,
        imgUrl,
        name,
        price,
        restaurant_id,
        mealId: currentMeal.id,
        token: auth.token,
      });

      if (response.success) {
        setIsDialogShown(true);
        const meals = [...superAdminPanel.meals];
        meals[currentIndex] = {
          category,
          imgUrl,
          name,
          price,
          id: currentMeal.id,
        };
        dispatch(setMeals(meals));
      }
    }
  };
  return (
    <div id="signup-form">
      {isDialogShown ? (
        buildAlertDialog({
          bgColor: "green",
          color: "white",
          text: `Meal ${isUpdate ? "Updated" : "Created"} Successfully`,
          text2: `The meal is added to the stor `,
        })
      ) : (
        <></>
      )}
      <div id="signup-form-inner">
        <div id="signup--exit-button">
          <button
            onClick={() => {
              setIsMealDialogShown(false);
              setIsUpdate(false);
            }}
          >
            X
          </button>
        </div>

        <h1>{isUpdate ? "Update Meal" : "Create Meal"}</h1>
        <hr />

        {createInput({
          placeholder: "Meal Name",
          type: "text",
          value: isUpdate ? currentMeal.name : name,
          setState: setName,
        })}
        {createInput({
          placeholder: "Meal Image Url",
          type: "text",
          value: isUpdate ? currentMeal.imgUrl : imgUrl,
          setState: setImgUrl,
        })}

        {createInput({
          placeholder: "Category",
          type: "text",
          value: isUpdate ? currentMeal.category : category,
          setState: setCategory,
        })}

        {createInput({
          placeholder: "Price",
          type: "number",
          value: isUpdate ? currentMeal.price : price,
          setState: setPrice,
        })}

        {isUpdate ? (
          <></>
        ) : (
          <select
            style={{ padding: "10px", borderRadius: "5px" }}
            onClick={(e) => {
              setRestaurant_id(superAdminPanel.restaurants[e.target.value].id);
            }}
            onChange={async (e) => {
              setRestaurant_id(superAdminPanel.restaurants[e.target.value].id);
            }}
          >
            {superAdminPanel.restaurants.map((restaurant, index) => {
              return createOption(restaurant, index);
            })}
          </select>
        )}

        <div id="signup-button-div">
          <button onClick={createMeal}>
            {isUpdate ? "Update Meal" : "Create Meal"}
          </button>
        </div>
      </div>
    </div>
  );
};
