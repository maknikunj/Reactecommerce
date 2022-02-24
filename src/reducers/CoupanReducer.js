// import axios from "axios";

import {
  ALL_COUPAN_FAIL,
  ALL_COUPAN_REQUEST,
  ALL_COUPAN_SUCCESS,
  NEW_COUPAN_REQUEST,
  NEW_COUPAN_SUCCESS,
  NEW_COUPAN_FAIL,
  UPDATE_COUPAN_REQUEST,
  UPDATE_COUPAN_SUCCESS,
  UPDATE_COUPAN_FAIL,
  DELETE_COUPAN_REQUEST,
  DELETE_COUPAN_SUCCESS,
  DELETE_COUPAN_FAIL,
  COUPAN_DETAILS_REQUEST,
  COUPAN_DETAILS_FAIL,
  COUPAN_DETAILS_SUCCESS,
  NEW_COUPAN_RESET,
  DELETE_COUPAN_RESET,
  UPDATE_COUPAN_RESET,
  CLEAR_ERRORS,

} from "../constants/Coupan";


export const CoupanReducer = (state = { coupanitem: [],coupandata : "" }, action) => {
    switch (action.type) {
      case ALL_COUPAN_REQUEST:
        return {
          loading: true,
          coupanitem: [],
        };
      case ALL_COUPAN_SUCCESS:
        return {
          loading: false,
          coupanitem: action.payload,
          coupandata:action.coupandata,
        };
      case ALL_COUPAN_FAIL:
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
      };
  };

  export const NewCoupanReducer = (state = { coupanitem: {} }, action) => {
    switch (action.type) {
      case NEW_COUPAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_COUPAN_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          coupanitem: action.payload.coupanitem,
        };
      case NEW_COUPAN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_COUPAN_RESET:
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

  export const CoupanActionsReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COUPAN_REQUEST:
      case UPDATE_COUPAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_COUPAN_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_COUPAN_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_COUPAN_FAIL:
      case UPDATE_COUPAN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_COUPAN_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_COUPAN_RESET:
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

  export const CoupanDetailsReducer = (state = { coupanitems: {} }, action) => {
    switch (action.type) {
      case COUPAN_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case COUPAN_DETAILS_SUCCESS:
        return {
          loading: false,
          coupanitems: action.payload,
        };
      case COUPAN_DETAILS_FAIL:
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
  
