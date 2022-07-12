import axios from 'axios'
import { hostUrl } from '..'
export class User {
  static userName =null;
  static imgUrl = null;
  static id =null;
  static roleId = 4;


  static async getAllRestaurants() {
    try {
      const response = await axios.get(`${hostUrl}/user/`)

      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
      }
    }
  }

  static async getRestaurantByName({ restaurantName }) {
    try {
      const response = await axios.get(`${hostUrl}/user/${restaurantName}`)

      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }

  static async getRestaurantById({ restaurantId }) {
    try {
      const response = await axios.get(`${hostUrl}/user/id/${restaurantId}`)
      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }

  static async getMealsByRestaurant({ restaurantId }) {
    try {
      const response = await axios.get(`${hostUrl}/user/${restaurantId}`)
      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }

  static async UpdateAddress({ userid, city, buldingNumber, street, notes }) {
    console.log(userid, 'userssss', city, buldingNumber, street)
    try {
      const response = await axios.put(`${hostUrl}/user/${userid}`, {
        street,
        city,
        notes,
        buldingNumber,
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }

  static async getaddrssByuserTd({ userid }) {
    // console.log(userid)
    try {
      const response = await axios.get(`${hostUrl}/user/address/${userid}`, {})
      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }
  // userid: id,
  // state: 'progess',
  // receipt: Userinfor.sumPrice,
  // resturant_id: Userinfor.yourPrice[0].resturant_id,
  // mealarray: Userinfor.yourPrice,

  static async sentOrder({ userid, state, receipt, resturantId, mealarray, Quntity }) {
    console.log(userid, state, receipt, resturantId, mealarray)
    try {
      const response = await axios.post(`${hostUrl}/user/sent/${userid}`, {
        userid,
        state,
        receipt,
        resturantId,
        mealarray,
        Quntity
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }

  static async getSortResturants({ restaurantCategory }) {
    try {
      const response = await axios.get(`${hostUrl}/user/category/${restaurantCategory}`)

      return response.data
    } catch (error) {
      return {
        success: false,
        massage: 'Server Error',
        error,
        result: [],
      }
    }
  }


}
