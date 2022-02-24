import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_FAIL,
  SAVE_SHIPPING_INFO,
  EMPTY_CART_REQUEST,
  EMPTY_CART,
  EMPTY_CART_FAIL,

  EMPTY_CART_FROM_CLIENT_REQUEST,
  EMPTY_CART_FROM_CLIENT,
  EMPTY_CART_FROM_CLIENT_FAIL,

  GET_CART_REQUEST,
  GET_CART,
  GET_CART_FAIL,
  CLEAR_ERRORS
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(`/api/v1/cart/${id}`, { quantity }, config);

    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_TO_CART_FAIL, payload: error.response.data.message });
  }
};


//emptycart from server
export const emptyCart = () => async (dispatch) => {
  try {
    dispatch({ type: EMPTY_CART_REQUEST });

    const data = await axios.delete(`/api/v1/empty-cart`);

    dispatch({
      type: EMPTY_CART,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: EMPTY_CART_FAIL, payload: error.response.data.message });
  }
};

//emptycart from client --logout thaie ele cart emnem khalui karavy pade -->jo server thi khali karaisu to at the time of login aakhu cart khali malse etle just client mathi kghali karayu
export const emptyCartFromClient = () => async (dispatch) => {
  try {
    dispatch({ type: EMPTY_CART_FROM_CLIENT_REQUEST });

    const data = {message:"cart empty from client"};

    dispatch({
      type: EMPTY_CART_FROM_CLIENT,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: EMPTY_CART_FROM_CLIENT_FAIL, payload: "Failed to empty the cart" });
  }
};

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const data = await axios.get(`/api/v1/cart`);

    dispatch({
      type: GET_CART,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_CART_FAIL, payload: error.response.data.message });
  }
};

//remove single item from cart
export const removeItemsFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    
    const data = await axios.delete(`/api/v1/cart/${id}`);

    dispatch({
      type: REMOVE_CART_ITEM,
      payload: data, //data.data=data che and data.message=backend no message che
    });
  } catch ( error ){
    console.log(error);
    dispatch({ type: REMOVE_CART_ITEM_FAIL, payload: error.response.data.message });
  }
};

  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
