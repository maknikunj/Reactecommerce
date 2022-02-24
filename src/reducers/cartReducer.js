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
  CLEAR_ERRORS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: {}, shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case EMPTY_CART_REQUEST:
    case EMPTY_CART_FROM_CLIENT_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART:
    case GET_CART:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.data,
        message: action.payload.message,
      };
    case EMPTY_CART:
    case EMPTY_CART_FROM_CLIENT:
      return {
        ...state,
        loading: false,
        cartItems: {},
        message: action.payload,
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.data,
        message: action.payload.message,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case ADD_TO_CART_FAIL:
    case EMPTY_CART_FAIL:
    case EMPTY_CART_FROM_CLIENT_FAIL:
    case REMOVE_CART_ITEM_FAIL:
    case GET_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
