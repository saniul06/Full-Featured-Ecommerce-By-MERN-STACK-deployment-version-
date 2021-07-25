import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import Sidebar from '../../components/admin/Sidebar'
import { orderDetails, updateOrder, clearErrors, clearMessages } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET, DELETE_ORDER_RESET } from '../../actions/actionTypes'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading: orderDetailsLoading, order, error: orderDetailsError } = useSelector(state => state.orderDetails)
    const { _id, shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus, user } = order
    const { loading: updateloading, error: updateOrderError, message: updateOrdermessage } = useSelector(state => state.updateOrder)

    useEffect(() => {
        dispatch(orderDetails(match.params.id))
    }, [])

    useEffect(() => {
        if (orderDetailsError) {
            alert.error(orderDetailsError)
            dispatch(clearMessages())
        }
        if (updateOrdermessage) {
            alert.success(updateOrdermessage)
            dispatch({ type: UPDATE_ORDER_RESET })
        }
        if (updateOrderError) {
            alert.error(updateOrderError)
            dispatch({ type: DELETE_ORDER_RESET })
        }
    }, [updateOrdermessage, orderDetailsError, updateOrderError, dispatch, alert])

    const handleStatus = e => {
        const formData = new FormData();
        if (status) {
            formData.set('status', status)
        } else {
            formData.set('status', orderStatus)
        }
        dispatch(updateOrder(_id, formData))
    }

    return (
        <>
            <MetaData title='Process-order' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {orderDetailsLoading ? <Loader /> : (Object.keys(order).length > 0 ?
                        <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-7 order-details">

                                <h3 className="my-5">Order Id: {order && order._id}</h3>

                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address: </b>{shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`}</p>
                                <p><b>Amount:</b> ${totalPrice && totalPrice}</p>

                                <hr />

                                <h4 className="my-4">Payment</h4>
                                {paymentInfo && paymentInfo.status.includes('succeeded') ? <p className="text-success font-weight-bold" >PAID</p> : <p className="text-danger font-weight-bold" >NOT PAID</p>}


                                <h4 className="my-4">Stripe ID</h4>
                                <p className="greenColor" ><b>{paymentInfo && paymentInfo._id}</b></p>


                                <h4 className="my-4">Order Status:</h4>
                                status: <p className={`font-weight-bold text-uppercase ${order.orderStatus.includes('Delivered') ? "text-success" : order.orderStatus.includes('processing') ? "text-danger" : "text-primary"}`}>{order.orderStatus}</p>,

                                <h4 className="my-4">Order Items:</h4>

                                <hr />
                                {orderItems && orderItems.map(item => (
                                    <div key={item.name} className="cart-item my-1">
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
                                        <hr />
                                    </div>
                                ))}

                            </div>

                            <div className="col-12 col-lg-3 mt-5">
                                <h4 className="my-4">Status</h4>

                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        name='status'
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                    >
                                        <option>Select</option>
                                        <option>processing</option>
                                        <option>shipped</option>
                                        <option>Delivered</option>
                                    </select>
                                </div>

                                <button onClick={() => handleStatus(order._id)} className="btn btn-primary btn-block">
                                    Update Status
                                </button>
                                <Link to='/admin/orders' className="btn btn-info btn-block">
                                    Go Back
                                </Link>
                            </div>

                        </div> : <h3 className='not-found'>404 not found</h3>

                    )
                    }
                </div>

            </div>
        </>
    )
}

export default ProcessOrder
