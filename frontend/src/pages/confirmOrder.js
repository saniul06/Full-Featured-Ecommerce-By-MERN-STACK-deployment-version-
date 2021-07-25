import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../components/layouts/MetaData'
import CheckoutSteps from '../components/layouts/CheckoutSteps'

const ConfirmOrder = ({ history }) => {

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { phoneNo, address } = shippingInfo
    const { name } = useSelector(state => state.auth.user)

    //calculate order price
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((itemsPrice * .05).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const handlePayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/login?redirect=payment')
    }

    useEffect(() => {
        if (Object.keys(shippingInfo).length === 0) {
            history.push('/shipping')
        }
    })


    return (
        <>
            <MetaData title='confirm-order' />
            <CheckoutSteps shipping confirmOrder />
            {Object.keys(shippingInfo).length > 0 && (
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b> {name}</p>
                        <p><b>Phone:</b> {phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {address}</p>

                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>
                        <hr />

                        {cartItems.map(item => (
                            <div key={item.name} className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                    </div>

                                </div>
                                <hr />
                            </div>
                        ))}

                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{itemsPrice}</span></p>
                            <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                            <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                            <hr />
                            <button onClick={handlePayment} id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                        </div>
                    </div>
                </div>


            )}
        </>
    )
}

export default ConfirmOrder
