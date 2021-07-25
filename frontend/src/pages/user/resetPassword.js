import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layouts/MetaData'
import { resetPassword, clearErrors, clearMessages } from '../../actions/userActions'

const ResetPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, message } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
            dispatch(clearMessages())
            history.push('/login')
        }
    }, [error, message, alert, dispatch, history])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword(match.params.token, { password, confirmPassword }))
    }

    return (
        <>
            <MetaData titie='reset-password' />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Reset Password
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
