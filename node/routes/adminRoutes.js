const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/tokenVerify');


router.get('/users', verifyToken, adminController.getUsers);
router.put('/user/:userId', verifyToken, adminController.updateUserDetails);
router.get('/plans', verifyToken, adminController.getAllPlans);
router.put('/plan/:planId', verifyToken, adminController.updatePlan);
router.delete('/delete-user/:id', verifyToken, adminController.deleteUser);
router.post('/admin', adminController.adminAuth);
router.get('/razor-pay-key', verifyToken, adminController.getRazorPayKey);

module.exports = router