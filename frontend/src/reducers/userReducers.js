import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    Logout_SUCCESS,
    Logout_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
} from '../actions/actionTypes'

export const authReducers = (state = { user: null, isAuthenticated: true }, action) => {
    switch (action.type) {

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case Logout_SUCCESS:
            return {
                isAuthenticated: false,
                loading: false,
                user: null
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case Logout_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                // error: action.payload

            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false
            }

        default: return state
    }

}

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: false,
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                message: null,
            }

        default: return state
    }
}

export const allUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return {
                loading: true
            }
        case ALL_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case ALL_USER_FAIL:
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