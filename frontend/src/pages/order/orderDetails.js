import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import { orderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

    const [stauts, setStatus] = useState('')

    const { loading, error, order } = useSelector(state => state.orderDetails)
    const { user } = useSelector(state => state.auth)

    const { shippingInfo, paymentInfo, orderStatus, _id, totalPrice, orderItems } = order

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        dispatch(orderDetails(match.params.id))
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [alert, error, dispatch, match])

    return (
        <>
            <MetaData title='orderDetails' />
            {loading ? <Loader /> : (
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {_id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address: </b>{shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        {orderItems && orderItems.map(item => (
                            <div key={item._id} className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${item.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <hr />
                    </div>
                </div>

            )}
        </>
    )
}

export default OrderDetails
