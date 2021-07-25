const router = require('express').Router()
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const { getUserProfile, updatePassword, updateProfile, allUsers } = require('../controllers/userController')

router.route('/me').get(isAuthenticated, getUserProfile)

router.route('/me/update').put(isAuthenticated, updateProfile)

router.route('/me/password/update').put(isAuthenticated, updatePassword)

router.route('/admin/users').get(isAuthenticated, allUsers)

module.exports = router