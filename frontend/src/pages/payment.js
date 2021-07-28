import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios'
import { useAlert } from 'react-alert'
import MetaData from "../components/layouts/MetaData"
import CheckoutSteps from '../components/layouts/CheckoutSteps'
import { createNewOrder, clearErrors } from '../actions/orderActions'
import { clearCart } from '../actions/cartActions'
import { useHistory } from 'react-router-dom'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const history = useHistory()
    const [submitButton, setSubmitButton] = useState(false)

    const { user } = useSelector(state => state.auth)
    const { error } = useSelector(state => state.newOrder)

    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [error, dispatch, alert])

    if (!cartItems || !shippingInfo || !orderInfo) {
        history.push('/')
        return null
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitButton(true)
        let res;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret
            if (!stripe || !elements) {
                return
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                alert.error(result.error.message)
                setSubmitButton(false)

            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    const paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    const order = {
                        shippingInfo,
                        orderItems: cartItems,
                        totalPrice: orderInfo.totalPrice,
                        itemsPrice: orderInfo.itemsPrice,
                        taxPrice: orderInfo.taxPrice,
                        shippingPrice: orderInfo.shippingPrice,
                        paymentInfo: paymentInfo,
                    }

                    dispatch(createNewOrder(order))
                    dispatch(clearCart())
                    history.push('/success')

                } else {
                    alert.error('There is an error in payment processing')
                }
            }
        } catch (err) {
            setSubmitButton(false)
            alert.error(err.response.data.errorMessage)
        }
    }

    return (
        <>
            <MetaData title='payment' />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number (enter this number - 4000 0027 6000 3184)</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry (enter any valid date)</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC (enter any 3 digit number)</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={submitButton}
                        >
                            Pay {orderInfo && orderInfo.totalPrice}
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment
