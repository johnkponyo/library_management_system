const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated, isLibrarian, isUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/login', userController.login);
router.get('/ldashboard', isAuthenticated, isLibrarian, userController.ldashboard) //librarian dashboard
router.get('/udashboard', isAuthenticated, isUser, userController.udashboard) //user dashboard
router.post('/login', userController.authenticate);
router.get('/register', userController.register);
router.post('/register', userController.createUser);
router.get('/logout', isAuthenticated, userController.logout);

module.exports = router;
