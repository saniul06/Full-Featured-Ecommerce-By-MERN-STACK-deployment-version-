import {
    ADD_TO_CART,
    UPDATECART,
    TOTAL_ITEM,
    CLEAR_ERRORS,
    CLEAR_MESSAGES,
    SAVE_SHIPPING_INFO,
    CLEAR_CART,
    REMOVE_CART
} from './actionTypes';

export const addToCart = (product, quantity) => (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            quantity
        }
    });
    dispatch({ type: TOTAL_ITEM });
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};

export const updateCart = (cartItems) => (dispatch, getState) => {
    dispatch({ type: UPDATECART, payload: cartItems });
    dispatch({ type: TOTAL_ITEM });
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
    localStorage.setItem('shippingInfo', JSON.stringify(data));
};

export const clearCart = () => (dispatch) => {
    dispatch({ type: CLEAR_CART });
    dispatch({ type: REMOVE_CART });
    localStorage.removeItem('cartItems');
    sessionStorage.removeItem('orderInfo')
};

export const clearCartErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearCartMessages = () => (dispatch) => {
    dispatch({ type: CLEAR_MESSAGES });
};
