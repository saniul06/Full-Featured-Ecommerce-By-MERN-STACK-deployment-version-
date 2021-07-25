const router = require('express').Router()
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const { getAllCategories, createCategory } = require('../controllers/categoryController')

router.route('/admin/categories').get(isAuthenticated, authorizeRoles('admin'), getAllCategories)
router.route('/admin/categorie').post(isAuthenticated, authorizeRoles('admin'), createCategory)

module.exports = router