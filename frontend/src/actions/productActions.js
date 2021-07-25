import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../actions/actionTypes';

export const getAllProducts = (currentPage = 1, keyword = '', price, category = '', ratings = 0) => async (dispatch) => {

    try {

        if (category || ratings || price.toString() === [1.1000].toString()) currentPage = 1

        let url = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`

        if (category) {
            url = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}&category=${category}`
        }

        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const { data } = await axios.get(url);
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });

    } catch (err) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response.data.errorMessage
        });
    }
};

export const getAdminProducts = () => async dispatch => {

    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/products`)
        dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products })

    } catch (err) {
        dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getSingleProduct = id => async dispatch => {

    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: SINGLE_PRODUCT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getProductReview = id => async dispatch => {

    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: PRODUCT_REVIEW_FAIL, payload: err.response.data.errorMessage })
    }
}

export const newProduct = product => async dispatch => {

    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/product/new', product, config)
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        console.log(err.response.data.errorMessage)
        dispatch({ type: NEW_PRODUCT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updateProduct = (id, product) => async dispatch => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, product, config)
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        console.log(err.response.data.errorMessage)
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteProduct = id => async dispatch => {

    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        console.log(err.response)
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const newReview = (review, id) => async dispatch => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/review', review, config)
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.message })
        dispatch(getProductReview(id))

    } catch (err) {
        console.log(err.response.data.errorMessage)
        dispatch({ type: NEW_REVIEW_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => (dispatch) => {
    dispatch({ type: NEW_REVIEW_RESET })
}
