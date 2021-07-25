import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_RESET,
    SINGLE_PRODUCT_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_RESET,
    PRODUCT_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../actions/actionTypes';

export const allProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                itemsPerPage: action.payload.itemsPerPage,
                totalProduct: action.payload.totalProduct,
                count: action.payload.count
            }

        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload

            }

        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
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

export const singleProductReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SINGLE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }

        case SINGLE_PRODUCT_FAIL:
            return {
                laoding: false,
                error: action.payload
            }

        case SINGLE_PRODUCT_RESET:
            return {
                state: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default:
            return state
    }
}

export const reviewReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }

        case PRODUCT_REVIEW_FAIL:
            return {
                laoding: false,
                error: action.payload
            }

        case PRODUCT_REVIEW_RESET:
            return {
                state: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default:
            return state
    }
}

export const newProductReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                product: action.payload.product

            }

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                message: false
            }

        case NEW_PRODUCT_FAIL:
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

export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                product: action.payload.product

            }

        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                message: false
            }

        case UPDATE_PRODUCT_FAIL:
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

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,

            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                message: false
            }

        case DELETE_PRODUCT_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload

            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                message: false
            }

        case NEW_REVIEW_FAIL:
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
