import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { User } from "../../../controllers/user";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setrestaurantId } from "../../../redux/reducers/User";

const AllRestaurants = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState("");
  let [totalPages, setTotalPages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtn, setPageBtn] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    state == "all" ? "" : state
  );
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [categoriesRest, setS] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    let responseRest = await User.getAllRestaurants();
    setRestaurants(responseRest.result);
    totalPages = Math.ceil(responseRest.result.length / 9);
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    setTotalPages(totalPages);
    setPageBtn(arr);
  };
  const buildCategoryIcon = ({ url, text = "Pizza" }) => {
    return (
      <div
        key={text}
        id="categoryIcon"
        onClick={() => {
          const arr = restaurants.filter((ele) => {
            return ele.rest_category.toLowerCase().includes(text.toLowerCase());
          });
         
          setS(arr);
          setIsCategoryClicked(true);
          setCurrentIndex(1);
          setCurrentPage(1);
          setTotalPages(Math.ceil(arr.length / 9));
          setCurrentCategory(text.toLowerCase());
          const arr1 =[];
          for (let i = 0; i < Math.ceil(arr.length / 9); i++) {
            arr1.push(i+1)
          }
          setPageBtn(arr1);

          navigate(`/AllRestarnts/${text.toLowerCase()}`);
        }}
      >
        <div className="DivimgCategory">
          <img className="imgCategory" src={url} />
        </div>

        <h3 className="h3h3NameCategory">{text}</h3>
      </div>
    );
  };

  const buildRestaurantCard = ({ element, index }) => {
    return (
      <div
        key={element.id}
        onClick={async () => {
          await localStorage.setItem("restaurantId", element.id);
          dispatch(setrestaurantId({ restId: element.id }));

          navigate("/RestaurantPage", {
            state: { id: localStorage.getItem("restaurantId") },
          });
        }}
        id="rest-card-div"
      >
        <img src={element.backImg} />
        <h3>{element.name}</h3>
      </div>
    );
  };
  const buildPageButton = (i) => {
    return (
      <div style={{ display: "flex" }} key={i + "k"}>
        <button
          style={
            currentPage === i
              ? { backgroundColor: "white", color: "black" }
              : {}
          }
          onClick={() => {
            if (currentPage < i) {
              setCurrentIndex(currentIndex + (i - currentPage) * 9);
              setCurrentPage(i);
            } else if (currentPage > i) {
              setCurrentIndex(currentIndex - (currentPage - i) * 9);
              setCurrentPage(i);
            }
          }}
        >
          {i}
        </button>
        {i !== totalPages ? <div id="border"></div> : <></>}
      </div>
    );
  };
  const categories = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zyu-T5WQ7bLxROPZPWo7u65WqNKpnk7NWQ&usqp=CAU",
      text: "Pizza",
    },
    {
      url: "https://media-cdn.tripadvisor.com/media/photo-s/17/57/7d/17/2-egg-breakfast.jpg",
      text: "Breakfast",
    },
    {
      url: "https://c8.alamy.com/comp/2F7BRP8/french-potato-pack-box-cartoon-fastfood-fry-potato-isolated-illustration-fast-food-2F7BRP8.jpg",
      text: "Fast food",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKopRRHoSDAgqTfKGo8tn1y_iggg0CtY-YPVx-5V9elOO0080P-eAJi8zbqtpytywskg&usqp=CAU",
      text: "Burgers",
    },
    {
      url: "https://thumbs.dreamstime.com/b/vector-illustration-heart-shape-red-fruits-vegetables-healthy-nutrition-organic-concept-flat-style-127159995.jpg",
      text: "Healthy",
    },
    {
      url: "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
      text: "Sweets",
    },
    {
      url: "https://images.deliveryhero.io/image/talabat/Menuitems/80850219637895358999912265.jpg",
      text: "Juices",
    },
  ];

  return (
    <div className="Al">
      <NavBar />
      <div className="first-restaurant-div">
        <div className="Continert1">
          <div className="Continer_A_A">
            {categories.map((category) => {
              return buildCategoryIcon({
                url: category.url,
                text: category.text,
              });
            })}
          </div>
          <div className="Continert">
            <div id="restaurants-div">
              {!isCategoryClicked ? (
                restaurants.length ? (
                  restaurants.map((element, index) => {
                    if (
                      index >= currentIndex - 1 &&
                      index < currentIndex + 8 &&
                      element.rest_category
                        .toLowerCase()
                        .includes(currentCategory)
                    ) {
                      return buildRestaurantCard({ element, index });
                    }
                  })
                ) : (
                  <></>
                )
              ) : categoriesRest.length ? (
                categoriesRest.map((element, index) => {
                  if (
                    index >= currentIndex - 1 &&
                    index < currentIndex + 8 &&
                    element.rest_category
                      .toLowerCase()
                      .includes(currentCategory)
                  ) {
                    return buildRestaurantCard({ element, index });
                  }
                })
              ) : (
                <></>
              )}
            </div>
            {pageBtn.length > 1 ? (
              <div id="pagination-div">
                {pageBtn.map((i) => {
                  return buildPageButton(i);
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
