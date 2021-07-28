import {
    ADD_TO_CART,
    UPDATECART,
    CLEAR_ERRORS,
    TOTAL_ITEM,
    CLEAR_MESSAGES,
    SAVE_SHIPPING_INFO,
    CLEAR_CART,
    REMOVE_CART
} from '../actions/actionTypes';

const cartItems = localStorage.getItem('cartItems');
const shippingInfo = localStorage.getItem('shippingInfo');

const init = {
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    totalItems: cartItems
        ? JSON.parse(cartItems).reduce((acc, item) => item.quantity + acc, 0)
        : 0,
    shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : {}
};

export const cartReducer = (state = init, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExists = state.cartItems.find(
                (i) => i.productId === item.productId
            );
            if (isItemExists) {
                return {
                    ...state,
                    message: 'Item already added in cart'
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    message: 'Item added successfully'
                };
            }

        case UPDATECART:
            return {
                ...state,
                cartItems: action.payload
            };

        case TOTAL_ITEM: {
            return {
                ...state,
                totalItems: state.cartItems.reduce(
                    (acc, item) => item.quantity + acc,
                    0
                )
            };
        }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };

        case CLEAR_CART:
            return {
                ...init
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            };

        case CLEAR_MESSAGES:
            return {
                ...state,
                message: null
            };

        case REMOVE_CART:
            return {
                cartItems: [],
                totalItems: 0,
            }

        default:
            return state;
    }
};
