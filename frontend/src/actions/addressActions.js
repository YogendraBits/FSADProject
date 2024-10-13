import axiosInstance from '../utils/axiosInstance'; // Adjust path if needed
import {
    ADDRESS_LIST_REQUEST,
    ADDRESS_LIST_SUCCESS,
    ADDRESS_LIST_FAIL,
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL,
    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL,
    ADDRESS_DELETE_REQUEST,
    ADDRESS_DELETE_SUCCESS,
    ADDRESS_DELETE_FAIL,
} from '../constants/addressConstants.js';

// Get Addresses
export const listAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_LIST_REQUEST });

        const { data } = await axiosInstance.get('/addresses');

        dispatch({
            type: ADDRESS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADDRESS_LIST_FAIL,
            payload:
                error.response?.data?.message ?? error.message,
        });
    }
};

// Create Address
export const createAddress = (addressData) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_CREATE_REQUEST });

        const { data } = await axiosInstance.post('/addresses', addressData);

        dispatch({
            type: ADDRESS_CREATE_SUCCESS,
            payload: data,
        });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_CREATE_FAIL,
            payload:
                error.response?.data?.message ?? error.message,
        });
    }
};

// Update Address
export const updateAddress = (id, addressData) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_UPDATE_REQUEST });

        const { data } = await axiosInstance.put(`/addresses/${id}`, addressData);

        dispatch({
            type: ADDRESS_UPDATE_SUCCESS,
            payload: data,
        });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_UPDATE_FAIL,
            payload:
                error.response?.data?.message ?? error.message,
        });
    }
};

// Delete Address
export const deleteAddress = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_DELETE_REQUEST });

        await axiosInstance.delete(`/addresses/${id}`);

        dispatch({ type: ADDRESS_DELETE_SUCCESS });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_DELETE_FAIL,
            payload:
                error.response?.data?.message ?? error.message,
        });
    }
};
