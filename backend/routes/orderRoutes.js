const router = require('express').Router();
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteeOrder
} = require('../controllers/orderController');

router.route('/order/new').post(isAuthenticated, newOrder);

router.route('/order/:id').get(isAuthenticated, getSingleOrder);

router.route('/orders/me').get(isAuthenticated, myOrders);

router
    .route('/admin/orders')
    .get(isAuthenticated, authorizeRoles('admin'), allOrders);

router
    .route('/admin/order/:id')
    .put(isAuthenticated, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteeOrder);

module.exports = router;
