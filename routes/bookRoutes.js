const express = require('express');
const bookController = require('../controllers/bookController');
const { isAuthenticated, isLibrarian } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, bookController.list);
router.get('/add', isAuthenticated, isLibrarian, bookController.add);
router.post('/add', isAuthenticated, isLibrarian, bookController.create);
router.get('/edit/:id', isAuthenticated, isLibrarian, bookController.edit);
router.post('/edit/:id', isAuthenticated, isLibrarian, bookController.update);
router.get('/delete/:id', isAuthenticated, isLibrarian, bookController.delete);

module.exports = router;
