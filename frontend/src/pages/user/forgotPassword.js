import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../../components/layouts/Loader'
import MetaData from '../../components/layouts/MetaData'
import { forgotPassword, clearErrors, clearMessages } from '../../actions/userActions'
import { useAlert } from 'react-alert'

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, message } = useSelector(state => state.user)

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {

        if(isAuthenticated){
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
            dispatch(clearMessages())
        }
    }, [isAuthenticated, history, error, alert, message, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form onSubmit={handleSubmit} className="shadow-lg">
                                <h1 className="mb-3">Forgot Password</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Enter Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="forgot_password_button"
                                    type="submit"
                                    className="btn btn-block py-3">
                                    Send Email
                                </button>

                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword
