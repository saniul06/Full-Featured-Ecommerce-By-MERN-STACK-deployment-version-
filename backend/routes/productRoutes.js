const {
    getAllProducts,
    getAdminProducts,
    createNewProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController')

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/products').get(getAllProducts)

router.route('/admin/products').get(getAdminProducts)

router.route('/product/:id').get(getSingleProduct)

router.route('/admin/product/new').post(isAuthenticated, authorizeRoles('admin'), createNewProduct)

router.route('/admin/product/:id')
    .put(isAuthenticated, authorizeRoles('admin'), updateSingleProduct)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteSingleProduct)

router.route('/review')
    .put(isAuthenticated, createProductReview)
    .delete(isAuthenticated, deleteReview)

router.route('/reviews').get(isAuthenticated, getProductReviews)


module.exports = router
