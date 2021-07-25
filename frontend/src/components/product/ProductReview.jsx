import React from 'react'

const ProductReview = ({ ratings }) => {
    return (
        <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${ratings * 100 / 5}%` }}></div>
        </div>
    )
}

export default ProductReview
