import axios from "axios";

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
    CLEAR_ERRORS,
} from "../constants/Coupan";

// Get All COUPAN
export const getcoupan = (coupandata) => async (dispatch) => {
    console.log(coupandata)
    try {
        dispatch({ type: ALL_COUPAN_REQUEST });

        const { data } = await axios.get("/api/v1/getcouponcode");
        console.log(data)

        dispatch({
            type: ALL_COUPAN_SUCCESS,
            payload: data.couponCode,
            coupandata:coupandata,
        });
    } catch (error) {
        dispatch({
            type: ALL_COUPAN_FAIL,
            payload: error.response.data.message,
        });
    }
}
// for create store
export const createcoupan = (coupandata) => async (dispatch) => {
    console.log(coupandata)

    try {
        dispatch({ type: NEW_COUPAN_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post("/api/v1/admin/createcoupon",
            coupandata,
            config
        );
        console.log(data)


        dispatch({
            type: NEW_COUPAN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_COUPAN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update store
export const updateCoupan = (id, couponData) => async (dispatch) => {

    console.log(id, couponData)
    try {
        dispatch({ type: UPDATE_COUPAN_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/admin/updatecouponcode/${id}`,
            couponData,
            config
        );

        dispatch({
            type: UPDATE_COUPAN_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_COUPAN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete store
export const deleteCoupan = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COUPAN_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.delete(`/api/v1/admin/deletetcouponcode/${id}`);

        dispatch({
            type: DELETE_COUPAN_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_COUPAN_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get store Details
// export const getCoupanDetails = (id,findcouonitem) => async (dispatch) => {
//     console.log(id)
//     try {
//         dispatch({ type: COUPAN_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/v1/admin/singlevendordetails/${id}`);
//         console.log(data)

//         dispatch({
//             type: COUPAN_DETAILS_SUCCESS,
//             payload: findcouonitem
//         });
//     } catch (error) {
//         dispatch({
//             type: COUPAN_DETAILS_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
