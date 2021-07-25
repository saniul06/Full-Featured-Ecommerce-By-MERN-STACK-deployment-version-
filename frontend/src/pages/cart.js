import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../components/layouts/MetaData'
import { updateCart } from '../actions/cartActions'

const Cart = ({ history }) => {


    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)

    const increase = (id, stock) => {
        const item = cartItems.find(i => i.productId === id)
        if (item.quantity < item.stock) {
            item.quantity = item.quantity + 1
            dispatch(updateCart(cartItems))
        }
    }

    const decrease = id => {
        const item = cartItems.find(i => i.productId === id)
        if (item.quantity > 1) {
            item.quantity = item.quantity - 1
            dispatch(updateCart(cartItems))
        }
    }

    const deleteItem = id => {
        const updatedCartItems = cartItems.filter(i => i.productId !== id)
        dispatch(updateCart(updatedCartItems))
    }

    const handleCheckout = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <MetaData title='cart' />
            {
                cartItems.length === 0 ? <h2 className='text-center mt-5'>You have no item in your cart</h2> : (
                    <>
                        <h2 className="mt-5">Shopping Cart</h2>
                        <hr />

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {
                                    cartItems.map(product => (
                                        <div key={product.productId} className="cart-item">
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={product.image} alt="Laptop" height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/product/${product.productId}`}>{product.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${product.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span onClick={() => decrease(product.productId)} className="btn btn-danger minus">-</span>
                                                        <input type="number" className="form-control count d-inline" value={product.quantity} readOnly />

                                                        <span onClick={() => increase(product.productId)} className="btn btn-primary plus">+</span>
                                                    </div>
                                                </div>

                                                <div onClick={() => deleteItem(product.productId)} className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                                </div>

                                            </div>
                                            <hr />
                                        </div>

                                    )
                                    )
                                }
                            </div>
                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => (item.price * item.quantity) + acc, 0).toFixed(2)}</span></p>

                                    <hr />
                                    <button onClick={handleCheckout} id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                                </div>
                            </div>
                        </div>
                    </>)
            }
        </>

    )
}

export default Cart
