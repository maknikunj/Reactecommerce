import axios from "axios";

import {
  ALL_STORE_FAIL,
  ALL_STORE_REQUEST,
  ALL_STORE_SUCCESS,
  NEW_STORE_REQUEST,
  NEW_STORE_SUCCESS,
  NEW_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_FAIL,
  STORE_DETAILS_SUCCESS,
  NEW_STORE_RESET,
  DELETE_STORE_RESET,
  UPDATE_STORE_RESET,
  CLEAR_ERRORS,

} from "../constants/StoreConstants";


export const StoreReducer = (state = { Store: [] }, action) => {
    switch (action.type) {
      case ALL_STORE_REQUEST:
        return {
          loading: true,
          Store: [],
        };
      case ALL_STORE_SUCCESS:
        return {
          loading: false,
          Store: action.payload,
          
        };
      case ALL_STORE_FAIL:
        return {
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

  export const NewStoreReducer = (state = { Store: {} }, action) => {
    switch (action.type) {
      case NEW_STORE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_STORE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          Store: action.payload.Store,
        };
      case NEW_STORE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_STORE_RESET:
        return {
          ...state,
          success: false,
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

  export const StoreActionsReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_STORE_REQUEST:
      case UPDATE_STORE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_STORE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_STORE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_STORE_FAIL:
      case UPDATE_STORE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_STORE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_STORE_RESET:
        return {
          ...state,
          isUpdated: false,
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

  export const StoreDetailsReducer = (state = { Store: {} }, action) => {
    switch (action.type) {
      case STORE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case STORE_DETAILS_SUCCESS:
        return {
          loading: false,
          Store: action.payload,
        };
      case STORE_DETAILS_FAIL:
        return {
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
  