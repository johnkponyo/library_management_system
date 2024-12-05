const express = require('express');
const bookController = require('../controllers/bookController');
const { isAuthenticated, isLibrarian, isUser } = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware')

router.get('/', isAuthenticated, bookController.list);
router.get('/add', isAuthenticated, isLibrarian, bookController.add);
router.post('/add', isAuthenticated, isLibrarian, upload.single('cover'), bookController.create);
router.get('/manage', isAuthenticated, isLibrarian, bookController.manage);
router.get('/edit/:id', isAuthenticated, isLibrarian, bookController.edit);
router.post('/edit/:id', isAuthenticated, isLibrarian, upload.single('cover'), bookController.update);
router.get('/delete/:id', isAuthenticated, isLibrarian, bookController.delete);
router.get('/returned/:id/:bid', isAuthenticated, isLibrarian, bookController.returned)

router.get('/borrow/:id/:uid', isAuthenticated, isUser, bookController.borrow)


module.exports = router;
