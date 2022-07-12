import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    Iduser: localStorage.getItem("userid") || "",
    cart: [],
    price: [],
    searchRestaurants: [],
    restaurants: [],
    total: 0,
    sumpriceUser: 0,
    name: '',
    userId: '',
    restaurantIdId:localStorage.getItem("restaurantId") || "",
    Sumitems:0,
    showMenu: false,

    
   

  },
  reducers: {
    setCart: (state, action) => {
      if (state.cart.length == 0) {
        state.cart.push(action.payload.items);
      } else {
        let loop = true;

        state.cart = state.cart.filter((element, index) => {
          if (element.id == action.payload.items.id) {
            element = action.payload.items;
            loop = false;
            return element;
          } else {
            return element;
          }
        });
        if (loop == true) {
          state.cart.push(action.payload.items);
        }
      }
    },
    //!......................................................................
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((cartitem, index) => {
        return cartitem.id != action.payload.id;
      });

      state.price = state.price.filter((cartitem, index) => {
        return cartitem.id != action.payload.id;
      });
    },
    //!......................................................................
    setPrice: (state, action) => {
      if (state.price.length == 0) {
        state.price.push({
          price: action.payload.price,
          id: action.payload.indexitem,
          priceOne: action.payload.priceOne,
          name: action.payload.name,
          restaurant: action.payload.restaurantid,
        });
      } else {
        let loop = false;

        state.price = state.price.filter((element, index) => {
          if (element.id == action.payload.indexitem) {
            element.price = action.payload.price;
            loop = true;
            return element;
          } else {
            return element;
          }
        });

        if (loop == false) {
          state.price.push({
            price: action.payload.price,
            id: action.payload.indexitem,
            priceOne: action.payload.priceOne,
            name: action.payload.name,
            restaurant: action.payload.restaurantid,
          });
        }
      }
    },
    //!......................................................................
    setsumPriceUser: (state, action) => {
      state.sumpriceUser = state.price.reduce((acc, elemnt, index) => {
        return acc + elemnt.price;
      }, 0);
    },

    //!......................................................................
    setTotal: (state, action) => {
      //payload = {"opr":"+" , value:10}

      if (action.payload.opr === "+") {
        state.total = state.total + action.payload.value;
      } else {
        state.total = state.total - action.payload.value;
      }
    },
    //!......................................................................

    setNameRest: (state, action) => {
      if (state.name == "") {
        state.name = action.payload.name;
      } else {
        state.name = action.payload.name;
      }
    },

    //!......................................................................
    setidUser: (state, action) => {
      //khs
      state.userId = action.payload.userId;
      localStorage.setItem("userid", action.payload.userId);
    },
    //!......................................................................
    setrestaurantId: (state, action) => {
        state.restaurantIdId = action.payload.restId
      },
    //!......................................................................
    setSumitems: (state, action) => {
         let sumSum=0
         state.price.map((element,index)=>{
        sumSum=sumSum+(element.price / element.priceOne)

         })


         state.Sumitems=sumSum
      },
    
    //!......................................................................
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    //!......................................................................
    setSearchRestaurant: (state, action) => {
      state.searchRestaurants = action.payload;
    },
    //!......................................................................
    setIsShowMenu: (state, action) => {
      state.showMenu = !state.showMenu;
    },

  },
});

export const {
  setCart,
  deleteCart,
  setPrice,
  setsumPriceUser,
  setTotal,
  setNameRest,
  setidUser,
  setrestaurantId,
  setSumitems,
  setRestaurants,
  setIsShowMenu,
  setSearchRestaurant,
} = UserSlice.actions


export default UserSlice.reducer;
