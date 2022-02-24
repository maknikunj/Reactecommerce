import axios from "axios";

import {
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_SUCCESS,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS,
  } from "../constants/categoryConstants";

 // Get All Categories
export const getCategory =() =>async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORY_REQUEST });

      const { data } = await axios.get(`/api/v1/categories`);

      dispatch({
        type: ALL_CATEGORY_SUCCESS,
        payload: data.categoryList,
      });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
}

// Create Category
export const createCategory = (categoryData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORY_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/admin/category/new`,
        categoryData,
        config
      );
  
      dispatch({
        type: NEW_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update Category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/category`,
        categoryData,
        config
      );
  
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Category
export const deleteCategory = (payload) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CATEGORY_REQUEST });
        
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(`/api/v1/admin/category`,
      payload,//is object which contains group of ids..
      config
      );
  
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Get categorys Details
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/category/${id}`);
    
  
      dispatch({
        type: CATEGORY_DETAILS_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  