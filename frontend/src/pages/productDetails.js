import React, { useState, useEffect, useRef } from 'react'
import ProductReview from '../components/product/ProductReview'
import Loader from '../components/layouts/Loader'
import MetaData from '../components/layouts/MetaData'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getSingleProduct, clearErrors, clearMessages, newReview, getProductReview } from '../actions/productActions'
import { addToCart, clearCartErrors, clearCartMessages } from '../actions/cartActions'

const ProductDetails = ({ match, history }) => {

    const [showModal, setShowModal] = useState(false)

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    let mereview = useRef({})

    const { error: productError, product, loading } = useSelector(state => state.singleProduct)
    const { error: reviewError, message: reviewMessage } = useSelector(state => state.newReview)
    const { error: getProductError, product: getProduct, loading: reviewLoading } = useSelector(state => state.getReview)
    const { error: cartError, message: cartMessage } = useSelector(state => state.cart)
    const { isAuthenticated, user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        dispatch(getSingleProduct(match.params.id))
        dispatch(getProductReview(match.params.id))
    }, [match.params.id, dispatch])

    useEffect(() => {
        if (product && user) {
            mereview.current = product ? product.reviews.find(item => item.user === user._id) : {}
            console.log('user is: ', mereview.current)
            if (mereview.current) {
                setReview(mereview.current.comment)
                setRating(mereview.current.rating)
            }
        }
    }, [product, user])

    useEffect(() => {

        if (productError || reviewError) {
            alert.error(productError)
            dispatch(clearErrors())
        }

        if (cartError) {
            alert.error(cartError)
            dispatch(clearCartErrors())
        }

        if (cartMessage) {
            alert.success(cartMessage)
            dispatch(clearCartMessages())
        }

        if (reviewMessage) {
            alert.success(reviewMessage)
            dispatch(clearMessages())
        }

    }, [dispatch, alert, productError, cartError, cartMessage, reviewError, reviewMessage, match.params.id])

    const increaseQty = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const setCart = () => {
        dispatch(addToCart(product, quantity))
    }

    function setRatings() {
        setShowModal(true)
        const stars = document.querySelectorAll('.star')
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, function (event) {
                    stars.forEach((s, index) => {
                        if (event.type === 'click') {
                            if (index < star.starValue) {
                                s.classList.add('orange')
                                setRating(star.starValue)
                            } else {
                                s.classList.remove('orange')
                            }
                        }
                        if (event.type === 'mouseover') {
                            if (index < this.starValue) {
                                s.classList.add('yellow')
                            } else {
                                s.classList.remove('yellow')
                            }
                        }
                        if (event.type === 'mouseout') {
                            if (index < this.starValue) {
                                s.classList.remove('yellow')
                            }
                        }
                    })
                })
            })
        })

        // function showRatings(event) {
        //     stars.forEach((star, index) => {
        //         if (event.type === 'click') {
        //             if (index < this.starValue) {
        //                 star.classList.add('orange')
        //             } else {
        //                 star.classList.remove('orange')
        //             }
        //         }
        //         if (event.type === 'mouseover') {
        //             if (index < this.starValue) {
        //                 star.classList.add('yellow')
        //             } else {
        //                 star.classList.remove('yellow')
        //             }
        //         }
        //         if (event.type === 'mouseout') {
        //             if (index < this.starValue) {
        //                 star.classList.remove('yellow')
        //             }
        //         }
        //     })
        // }
    }

    const handleSubmit = () => {
        // dispatch(newReview({ rating, comment: review, productId: match.params.id }))
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', review);
        formData.set('productId', match.params.id);
        dispatch(newReview(formData, match.params.id));
        setShowModal(false)
    }

    return (
        <>
            {
                loading ? <Loader /> : (product || getProduct ?
                    <>
                        <MetaData title={product.name} />
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img src={image.url}
                                                alt={product.name} width="400" height="400" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />

                                <ProductReview ratings={getProduct && getProduct.ratings} />
                                <span id="no_of_reviews">({getProduct && getProduct.reviews.length} Reviews)</span>

                                <hr />

                                <p id="product_price">${product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span onClick={decreaseQty} className="btn btn-danger minus">-</span>

                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                    <span onClick={increaseQty} className="btn btn-primary plus">+</span>
                                </div>
                                <button onClick={setCart} disabled={product.stock < 1} type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                                <hr />

                                <p>Status: <span id="stock_status" className={quantity <= product.stock ? 'greenColor' : 'redColor'}>{quantity <= product.stock ? 'In Stock' : 'Out of Stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                {isAuthenticated ? (
                                    <button onClick={setRatings} id="review_btn" type="button" className="btn btn-primary mt-4 mb-5" data-toggle="modal"
                                        data-target="#ratingModal">
                                        Submit Your Review
                                    </button>
                                ) : (
                                    <div className="alert alert-danger mt-5">
                                        Login to write your review
                                    </div>
                                )}

                                <div className="row mt-2 h" style={{ display: showModal ? 'block' : 'none' }}>
                                    <div className="rating w-50">
                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                                            aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <ul className="stars">
                                                            <li className={`star ${rating >= 1 && 'orange'}`}><i className="fa fa-star"></i></li>
                                                            <li className={`star ${rating >= 2 && 'orange'}`}><i className="fa fa-star"></i></li>
                                                            <li className={`star ${rating >= 3 && 'orange'}`}><i className="fa fa-star"></i></li>
                                                            <li className={`star ${rating >= 4 && 'orange'}`}><i className="fa fa-star"></i></li>
                                                            <li className={`star ${rating >= 5 && 'orange'}`}><i className="fa fa-star"></i></li>
                                                        </ul>

                                                        <textarea value={review} onChange={(e) => setReview(e.target.value)} name="review" id="review" className="form-control mt-3">

                                                        </textarea>

                                                        <button onClick={handleSubmit} className="btn my-3 float-right review-btn px-4 text-white"
                                                            data-dismiss="modal" aria-label="Close">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </>
                    : <h3 className='not-found'>404 not found</h3>)
            }
            {reviewLoading ? <> </> : (
                <div className="mx-5">
                    <h3>Reviews:</h3>
                    {getProduct && getProduct.reviews && getProduct.reviews.length > 0 ? getProduct.reviews.map(review =>
                        <div key={review._id} className="reviews w-75">

                            <hr />
                            <div className="review-card my-3">
                                <ProductReview ratings={review.rating} />
                                <p className="review_user">by {review.name}</p>
                                <p className="review_comment">{review.comment}</p>

                                <hr />
                            </div>
                        </div>
                    ) : <p>No reviews</p>}
                </div>
            )}
        </>

    )
}

export default ProductDetails
