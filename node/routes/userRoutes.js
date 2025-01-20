const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/tokenVerify');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user-details/:userId', verifyToken, userController.userDetails);
router.get('/get-id', verifyToken, userController.getId);
router.post('/forgot-password', userController.forgotPassword); 
router.post('/reset-password', userController.resetPassword);


module.exports = router;