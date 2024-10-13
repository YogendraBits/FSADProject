import axiosInstance from '../utils/axiosInstance'; // Adjust path if needed
import {
    CART_ADD_ITEM,
    CART_LOAD_ITEMS,
    CART_UPDATE_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

// Load Cart Items
export const loadCart = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/cart/mycart');
        dispatch({
            type: CART_LOAD_ITEMS,
            payload: data.cartItems, // Assuming this structure
        });
    } catch (error) {
        console.error('Error loading cart:', error);
    }
};

// Check if Product Exists in Cart
export const checkIfProductExistsInCart = (productId) => async () => {
    try {
        const { data: cart } = await axiosInstance.get('/cart/mycart');
        return cart.cartItems.some(item => item.product.toString() === productId.toString());
    } catch (error) {
        console.error('Error checking product in cart:', error);
        return false;
    }
};

// Add to Cart
export const addToCart = (id, qty) => async (dispatch) => {
    try {
        const { data: product } = await axiosInstance.get(`/products/${id}`);

        const cartItem = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        };

        const { data: existingCart } = await axiosInstance.get('/cart/mycart');

        const existingItem = existingCart.cartItems.find(item => item.product === cartItem.product);

        if (existingItem) {
            existingItem.qty += qty;
            await axiosInstance.put(`/cart/${existingCart._id}`, { cartItems: existingCart.cartItems });
        } else {
            await axiosInstance.post('/cart', { cartItem });
        }

        dispatch({
            type: CART_ADD_ITEM,
            payload: cartItem,
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

// Remove from Cart
export const removeFromCart = (itemId) => async (dispatch) => {
    try {
        const { data: cart } = await axiosInstance.get('/cart/mycart');
        await axiosInstance.delete(`/cart/${cart._id}/item/${itemId}`);

        dispatch({
            type: CART_REMOVE_ITEM,
            payload: itemId,
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

// Update Cart Item Quantity
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.put(`/cart/${itemId}`, { qty: quantity });
        dispatch({
            type: CART_UPDATE_ITEM,
            payload: data,
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
    }
};

// Save Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save Payment Method
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
