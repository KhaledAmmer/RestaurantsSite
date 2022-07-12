import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../../../redux/reducers/superAdmin";
import "./style.css";
import { CreateMeal } from "./CreateMeal";
import { Employee } from "../../../../controllers/employee";

export const createOption = (restaurant, index) => {
  return (
    <option key={restaurant.id} value={index}>
      {restaurant.name}
    </option>
  );
};

export const Meals = () => {
  const dispatch = useDispatch();
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [isCreateMealDialogShown, setIsMealDialogShown] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});
  const [currentMeal, setCurrentMeal] = useState({});
  const { superAdminPanel, auth } = useSelector((state) => {
    return state;
  });
  const [resId, setResId] = useState(superAdminPanel.restaurants.length ?superAdminPanel.restaurants[0].id:1);

  const createButton = ({ onClick, text, state }) => {
    return (
      <button
        onClick={onClick}
        style={
          text !== "Edit"
            ? { backgroundColor: "red" }
            : { backgroundColor: "green" }
        }
      >
        {text}
      </button>
    );
  };
  const createRow = (meal, index) => {
    return (
      <div className="user-row" key={meal.id + meal.name}>
        <h4>{index + 1}</h4>
        <h4>{meal.name}</h4>
        <div id="meal-img-div">
        <img src={`${meal.imgUrl}`} />
        </div>
      
        <h4>{meal.price} $</h4>
        <h4>{meal.category} </h4>
        <div id="edit-btns-div">
          {createButton({
            onClick: async () => {
              setCurrentMeal(meal);
              setCurrentIndex(index);
              setIsUpdate(true);
              setIsMealDialogShown(true);
            },
            text: "Edit",
            state: meal.state,
          })}
          {createButton({
            onClick: () => {
              setCurrentIndex(index);
              setCurrentMeal(meal);
              setIsDeleteDialogShown(true);
            },
            text: "Delete",
            state: meal.state,
          })}
        </div>
      </div>
    );
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
                deleteMeal(currentMeal.id);
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

  const deleteMeal = async () => {
    await Employee.deleteMealFromRestaurant({
      mealId: currentMeal.id,
      token: auth.token,
    });
    const meals = [...superAdminPanel.meals];
    meals.splice(currentIndex,1);
    dispatch(setMeals(meals))
  };

  return (
    <div>
      <div id="request-div">
        <p>
          <strong>Meals,</strong> you can add,update and remove restaurant meal
        </p>

        <button
          onClick={() => {
            setIsMealDialogShown(true);
          }}
        >
          + Meal
        </button>
      </div>
      <div id="selector-div">
        <h3>Restaurant Name</h3>
        <select
          onChange={async (e) => {
            const { meals } = await Employee.getAllMeals({
              token: auth.token,
              restaurant_id: superAdminPanel.restaurants[e.target.value].id,
            });
            setResId(superAdminPanel.restaurants[e.target.value].id);
            dispatch(setMeals(meals));
          }}
        >
          {superAdminPanel.restaurants.map((restaurant, index) => {
            return createOption(restaurant, index);
          })}
        </select>
      </div>

      {isDeleteDialogShown ? (
        deleteDialog({
          text: "Meal will be Deleted, Are you sure?",
          title: "Delete Meal",
        })
      ) : (
        <></>
      )}

      {isCreateMealDialogShown ? (
        <CreateMeal
          setIsMealDialogShown={setIsMealDialogShown}
          currentIndex={currentIndex}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          resId={resId}
        />
      ) : (
        <></>
      )}
      <div className="user-dashboard" style={{ marginTop: "5px" }}>
        <div id="dash-title-div" className="user-row">
          <h4>ID</h4>
          <h4>NAME</h4>
          <h4>IMAGE</h4>
          <h4>PRICE</h4>
          <h4>CATEGORY</h4>
          <h4>ACTIONS</h4>
        </div>
        {superAdminPanel.meals ? (
          superAdminPanel.meals.map((meal, index) => {
            return createRow(meal, index);
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
