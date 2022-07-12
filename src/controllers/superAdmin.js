import axios from "axios";
import { hostUrl } from "..";

export class SuperAdmin {
  static async createOwner({ firstName, lastName, email, password, token }) {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + "/" + month + "/" + day;
    try {
      const body = {
        firstName,
        lastName,
        email,
        password,
        lastLogin: newDate,
        imgUrl:
          "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
      };
      const response = await axios.post(`${hostUrl}/superAdmin/owner`, body, {
        headers: { authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "The email already exists",
        error,
      };
    }
  }
  static async deleteUser({ id, token }) {
    try {
      const response = await axios.delete(
        `${hostUrl}/superAdmin/delete/owner`,
        {
          headers: { authorization: `Bearer ${token}` },
          data: { id },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  static async deleteRestaurant({ id, token }) {
    try {
      const response = await axios.delete(
        `${hostUrl}/superAdmin/delete/restaurant`,
        {
          headers: { authorization: `Bearer ${token}` },
          data: { id },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  static async getAllRequests({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/superAdmin/requests`, {
        headers: { authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        success: "false",
        massage: "Server Error",
        error,
      };
    }
  }
  static async getAllUsers({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/superAdmin/users`, {
        headers: { authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: "Server Error",
        error,
        users: [],
      };
    }
  }

  static async getAllOwners({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/superAdmin/owners`, {
        headers: { authorization: `Bearer ${token}` },
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

  static async getAllRestaurants({ token }) {
    try {
      const response = await axios.get(`${hostUrl}/superAdmin/restaurants`, {
        headers: { authorization: `Bearer ${token}` },
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

  static async acceptRequest({ requestId, state, token }) {
    try {
      const response = await axios.put(
        `${hostUrl}/superAdmin/requests`,
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

  static async updateUser({ user, token }) {
    try {
      const response = await axios.put(
        `${hostUrl}/superAdmin/update/user`,
        { ...user },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        massage: error,
      };
    }
  }
}
