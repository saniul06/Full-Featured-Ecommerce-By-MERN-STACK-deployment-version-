import axios from 'axios'

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
} from './actionTypes'

export const login = (email, password) => async dispatch => {

    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/login`, { email, password }, config)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.errorMessage })
    }
}

export const loadUser = () => async dispatch => {

    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/me`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

    } catch (err) {
        if (err.data) {
            dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.errorMessage })
        } else {
            dispatch({ type: LOAD_USER_FAIL, payload: err })
        }
    }
}

export const getAllUsers = () => async dispatch => {

    try {
        dispatch({ type: ALL_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/users`)

        dispatch({ type: ALL_USER_SUCCESS, payload: data.users })

    } catch (err) {
        dispatch({ type: ALL_USER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const register = (userData) => async dispatch => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({ type: REGISTER_SUCCESS, payload: data.user })

    } catch (err) {
        console.log(err)
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updateProfile = (userData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch(loadUser())
        console.log('why i am calllling')
    } catch (err) {
        console.log(err)
        console.log('whyyyy not i am calling')
        console.log(err.response.data)
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updatePassword = (userData) => async dispatch => {

    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await axios.put('/api/v1/me/password/update', userData)

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.response.data.errorMessage })
    }
}

export const forgotPassword = (email) => async dispatch => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', { email }, config)
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data })
    } catch (err) {
        console.log('error is:')
        console.log(err.response.data.errorMessage)
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: err.response.data.errorMessage })
    }

}

export const resetPassword = (token, passwords) => async dispatch => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data.errorMessage })
    }

}

export const logout = () => async dispatch => {
    try {
        await axios.get('/api/v1/logout')

        dispatch({ type: Logout_SUCCESS })

    } catch (err) {
        dispatch({ type: Logout_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => (dispatch) => {
    dispatch({ type: CLEAR_MESSAGES });
};