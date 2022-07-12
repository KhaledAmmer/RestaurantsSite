import axios from "axios";

import { hostUrl } from "..";

export class Employee {
  static async getAllMeals({ token, restaurant_id }) {
    try {
      const response = await axios.get(
        `${hostUrl}/employee//meals/ ${restaurant_id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }
  static async createMeal({
    name,
    imgUrl,
    category,
    price,
    restaurant_id,
    token,
  }) {
    const body = {
      name,
      imgUrl,
      category,
      price,
      restaurant_id: Number(restaurant_id),
    };
    try {
      const response = await axios.post(`${hostUrl}/employee/`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }
  static async updateMeal({
    name,
    imgUrl,
    category,
    price,
    restaurant_id,
    mealId,
    token,
  }) {
    const body = {
      name,
      imgUrl,
      category,
      price,
      restaurant_id,
    };
    try {
      const response = await axios.put(`${hostUrl}/employee/${mealId}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }
  static async updateOrderState({ orderId, token ,state }) {
    try {
      const response = await axios.put(
        `${hostUrl}/employee/order/${orderId}`,
        {state},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }

  static async deleteOrder({ orderId, token }) {
    try {
      const response = await axios.put(
        `${hostUrl}/employee/order/delete/${orderId}`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }

  static async deleteMealFromRestaurant({ mealId, token }) {
    try {
      const response = await axios.delete(`${hostUrl}/employee/${mealId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }
  static async getAllOrder({ restaurantId, token }) {
    try {
      const response = await axios.get(`${hostUrl}/employee/${restaurantId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }
  static async getEmployeeRestaurant({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/employee/get/restaurant`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        serverError: error.response.data.message,
      };
    }
  }

  //getEmployeeRestaurant

  //deleteOrder
}
