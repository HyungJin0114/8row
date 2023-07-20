const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');

const OrdersController = require('../controllers/orders.controller');
const ordersController = new OrdersController();

router.get('/:storeId/orders', isSignedIn, isAdmin, ordersController.getOrder);
router.post('/:storeId/orders', isSignedIn, ordersController.createOrder);
router.delete(
  '/:storeId/orders/:orderId',
  isSignedIn,
  isAdmin,
  ordersController.deleteOrder
);
router.patch(
  '/:storeId/orders/:orderId',
  isSignedIn,
  isAdmin,
  ordersController.completeOrder
);

module.exports = router;
