import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  newCategoryReducer,
  categoryReducer,
  categoryActionsReducer,
  categoryDetailsReducer
} from "./reducers/categoryReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import{
  StoreReducer,
  NewStoreReducer,
  StoreActionsReducer,
  StoreDetailsReducer
} from './reducers/StoreReducer';

import {CoupanReducer,
  NewCoupanReducer,
  CoupanActionsReducer,
  CoupanDetailsReducer,
} from './reducers/CoupanReducer';

const reducer = combineReducers({
  //user
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  //cart
  cart: cartReducer,
  //product
  products: productsReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  //order
  allOrders: allOrdersReducer,
  order: orderReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  //category
  categories: categoryReducer,
  newCategory: newCategoryReducer,
  categoryActions: categoryActionsReducer,
  categoryDetails:categoryDetailsReducer,
  // Store
  storedata:StoreReducer,
  newstore:NewStoreReducer,
  storeActions:StoreActionsReducer,
  storeDetails:StoreDetailsReducer,
  // Coupancode
  coupandata:CoupanReducer,
  newcoupan:NewCoupanReducer,
  coupanActions:CoupanActionsReducer,
  coupanDetails:CoupanDetailsReducer,

});

let initialState = {
  cart: {
    cartItems: {},
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
