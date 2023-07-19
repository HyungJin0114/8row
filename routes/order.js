const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');
const {
  getOrder,
  createOrder,
  deleteOrder,
  completeOrder,
} = require('../controllers/order');

router.get('/:storeId/orders', isAdmin, getOrder);
router.post('/:storeId/orders', isSignedIn, createOrder);
router.delete('/:storeId/orders/:orderId', isSignedIn, isAdmin, deleteOrder);
router.patch('/:storeId/orders/:orderId', isSignedIn, isAdmin, completeOrder);

module.exports = router;
