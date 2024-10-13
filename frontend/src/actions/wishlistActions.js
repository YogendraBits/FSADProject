import axiosInstance from '../utils/axiosInstance';
import {
    WISHLIST_REQUEST,
    WISHLIST_SUCCESS,
    WISHLIST_FAIL,
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
} from '../constants/wishlistConstants';

// Fetch Wishlist
export const fetchWishlist = (pageNumber = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type: WISHLIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const { data } = await axiosInstance.get(`/wishlist?page=${pageNumber}`);

        dispatch({
            type: WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Add an item to the wishlist
export const addTowishlist = (productId, qty) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    if (!userInfo) {
        console.error('User not logged in');
        return;
    }

    try {
        const { data } = await axiosInstance.post('/wishlist', {
            productId,
            quantity: qty,
        });

        // Assuming API returns the updated wishlist
        dispatch({
            type: WISHLIST_ADD_ITEM,
            payload: data.wishlistitems, // Send the entire updated wishlist array
        });
    } catch (error) {
        console.error('Failed to add item to wishlist', error);
    }
};

// Remove an item from the wishlist
export const removeFromwishlist = (itemId) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    if (!userInfo) {
        console.error('User not logged in');
        return;
    }

    try {
        await axiosInstance.delete(`/wishlist/${itemId}`);

        // Dispatch remove action with the item ID directly to update the state
        dispatch({
            type: WISHLIST_REMOVE_ITEM,
            payload: itemId,
        });
    } catch (error) {
        console.error('Failed to remove item from wishlist', error);
    }
};
