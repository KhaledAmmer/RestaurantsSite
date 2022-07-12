import axios from "axios";

import { hostUrl } from "..";

export class Owner {
  static async createRequest({ restaurantName, token }) {
    try {
      const response = await axios.post(
        `${hostUrl}/owner/request`,
        { restaurantName },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        error,
      };
    }
  }
  static async createRestaurant({
    location,
    lat,
    lng,
    name,
    token,
    Logo,
    category,
  }) {
    try {
      const body = {
        location,
        lat,
        lng,
        name,
        Logo,
        rest_category: category,
        token,
      };

      const response = await axios.post(`${hostUrl}/owner/restaurant`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Error",
        error,
      };
    }
  }
  static async createEmployee({
   
    firstName,
    lastName,
    email,
    password,
    gender,
    restaurant_id,
    shift,
    salary,
    weeklyHours,
    token,
    
  }) {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + "/" + month + "/" + day;
    try {
      const body = {
        firstName,
        gender,
        lastName,
        email,
        password,
        shift,
        salary,
        weeklyHours,
        lastLogin:newDate,
        imgUrl:"https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      };
      const response = await axios.post(
        `${hostUrl}/owner/employee/${restaurant_id}`,
        body,
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
  static async deleteEmployee({ employeeId, token }) {
    try {
      const response = await axios.delete(`${hostUrl}/owner/employee`, {
        headers: { authorization: `Bearer ${token}` },
        data: { employeeId },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Server Error",
        error,
      };
    }
  }
  static async deleteRequest({ requestId, token }) {
    try {
      const response = await axios.delete(`${hostUrl}/owner/request`, {
        headers: { authorization: `Bearer ${token}` },
        data: { requestId },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Server Error",
        error,
      };
    }
  }
  static async getOwnerRequests({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/owner/requests`, {
        headers: { authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        success: "false",
        massage: "Server Error",
        error,
        requests:[]
      };
    }
  }
  static async getOwnerRestaurants({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/owner/restaurants`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return {
        success: "false",
        massage: "Server Error",
        error,
        restaurants: [],
      };
    }
  }
  static async getAllEmployee({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/owner/employees`, {
        headers: { authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        success: "false",
        massage: "Server Error",
        error,
        users: [],
      };
    }
  }
  //
  static async updateRequest({ requestId, state, token }) {
    try {
      const response = await axios.put(
        `${hostUrl}/owner/request`,
        { requestId, state },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: true,
        massage: "Request State Change",
      };
    }
  }
  static async deleteRestaurant({ id, token }) {
    console.log( "id, token");
    try {
      console.log( id, token);
      const response = await axios.delete(`${hostUrl}/owner/restaurant`, {
        headers: { authorization: `Bearer ${token}` },
        data: { id },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}
