import axios from 'axios'
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
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
} from './actionTypes';

export const createNewOrder = order => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })
    } catch (err) {
        console.log(err)
        dispatch({ type: CREATE_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const myOrders = () => async dispatch => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/orders/me')
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (err) {
        console.log(err)
        dispatch({ type: MY_ORDERS_FAIL, payload: err.response.data.errorMessage })
    }
}

export const allOrders = () => async dispatch => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ALL_ORDERS_FAIL, payload: err.response.data.errorMessage })
    }
}

export const orderDetails = id => async dispatch => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ORDER_DETAILS_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updateOrder = (id, status) => async dispatch => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'appliction/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, status, config)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: UPDATE_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteOrder = id => async dispatch => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: DELETE_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearMessages = () => dispatch => {
    dispatch({ type: CLEAR_MESSAGES })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
