import axiosInstance from '../utils/axiosInstance'; // Adjust the path if necessary
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCESS,
  PRODUCT_UPDATE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
} from '../constants/productConstants';

// List Products
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axiosInstance.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Get Product Details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axiosInstance.delete(`/products/${id}`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Create Product
export const createProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { data } = await axiosInstance.post('/products', {});

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update Product
export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await axiosInstance.put(`/products/${product._id}`, product);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Create Product Review
export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    await axiosInstance.post(`/products/${productId}/reviews`, review);

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// List Top Products
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axiosInstance.get('/products/top');

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update Product Review
export const updateProductReview = (productId, reviewId, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REVIEW_REQUEST });

    const { data } = await axiosInstance.put(`/products/${productId}/reviews/${reviewId}`, reviewData);

    dispatch({ type: PRODUCT_UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_REVIEW_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Delete Product Review
export const deleteProductReview = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REVIEW_REQUEST });

    await axiosInstance.delete(`/products/${productId}/reviews/${reviewId}`);

    dispatch({ type: PRODUCT_DELETE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_REVIEW_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
