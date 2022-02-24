import axios from "axios";

import {
  ALL_STORE_FAIL,
  ALL_STORE_REQUEST,
  ALL_STORE_SUCCESS,
  ADMIN_STORE_REQUEST,
  ADMIN_STORE_SUCCESS,
  ADMIN_STORE_FAIL,
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
  CLEAR_ERRORS,
} from "../constants/StoreConstants";

// Get All store
export const getstore =() =>async (dispatch) => {
    try {
      dispatch({ type: ALL_STORE_REQUEST });

      const  {data}  = await axios.get("/api/v1/admin/getallvendors");

      dispatch({
        type: ALL_STORE_SUCCESS,
        payload: data.data
      });
    } catch (error) {
      dispatch({
        type: ALL_STORE_FAIL,
        payload: error.response.data.message,
      });
    }
}
// for create store
export const createstore = (storedata) => async (dispatch) => {
  console.log(storedata)
    try {
      dispatch({ type: NEW_STORE_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post("/api/v1/admin/createvendor",
        storedata,
        config
      );
console.log(data)
  
      dispatch({
        type: NEW_STORE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_STORE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update store
export const updateStore = (id, storeData) => async (dispatch) => {

  console.log(id,storeData)
    try {
      dispatch({ type: UPDATE_STORE_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/vendorupdate/${id}`,
        storeData,
        config
        );
  
      dispatch({
        type: UPDATE_STORE_SUCCESS,
        payload: data.success
      });
    } catch (error) {
      dispatch({
        type: UPDATE_STORE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete store
export const deleteStore = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_STORE_REQUEST });
        
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.delete(`/api/v1/admin/vendordelete/${id}`);
  
      dispatch({
        type: DELETE_STORE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_STORE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Get store Details
export const getStoreDetails = (id) => async (dispatch) => {
  console.log(id)
    try {
      dispatch({ type: STORE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/admin/singlevendordetails/${id}`);
      console.log(data)
  
      dispatch({
        type: STORE_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: STORE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  