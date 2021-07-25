import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../actions/actionTypes';

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }

        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

export const orderDetailsReducer = (state = { order: {}, loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload.order
            }

        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

export const updateOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return {
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }

        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                message: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

export const deleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return {
                loading: true
            }

        case DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }

        case DELETE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_ORDER_RESET:
            return {
                ...state,
                message: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}

