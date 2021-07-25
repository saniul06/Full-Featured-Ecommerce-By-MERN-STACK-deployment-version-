import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import { updatePassword, clearErrors, clearMessages } from '../../actions/userActions'

const UpdatePassword = ({ history }) => {

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const { error, message, loading } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message)
            dispatch(clearMessages())
            history.push('/me')
        }
    }, [error, dispatch, message, alert, history])

    const handleChange = e => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePassword(password))
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="update password" />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form onSubmit={handleSubmit} className="shadow-lg">
                                <h1 className="mt-2 mb-5">Update Password</h1>
                                <div className="form-group">
                                    <label htmlFor="old_password_field">Old Password</label>
                                    <input
                                        type="password"
                                        id="old_password_field"
                                        className="form-control"
                                        name="oldPassword"
                                        value={password.oldPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password_field">New Password</label>
                                    <input
                                        type="password"
                                        id="new_password_field"
                                        className="form-control"
                                        name="newPassword"
                                        value={password.newPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password_field">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="new_password_field"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={password.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                            </form>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default UpdatePassword
