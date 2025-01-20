const express = require('express');
const verifyToken = require('../middleware/tokenVerify');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.post('/create-payment', verifyToken, paymentsController.createPayment);
router.post('/verify-payment', verifyToken, paymentsController.verifyPayment);

module.exports = router;