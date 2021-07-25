const router = require('express').Router()
const { getallUser, getUserDetails, updateUserDetails, deleteUser } = require('../controllers/adminController')
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/user').get(isAuthenticated, authorizeRoles('admin'), getallUser)

router.route('/admin/user/:id')
    .get(isAuthenticated, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticated, authorizeRoles('admin'), updateUserDetails)
    .delete(isAuthenticated, authorizeRoles('admin'), deleteUser)


// TODO:  user details

module.exports = router