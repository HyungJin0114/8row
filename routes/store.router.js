const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');

const StoreController = require('../controllers/store.controller');
const upload = require('../middlewares/upload');
const storeController = new StoreController();

router.post(
  '/',
  isSignedIn,
  isAdmin,
  upload.single('image'),
  storeController.createStore
);
router.get('/', storeController.getStore);
router.get('/:storeId', storeController.getStoreDetail);
router.patch(
  '/:storeId',
  isSignedIn,
  isAdmin,
  upload.single('image'),
  storeController.updateStore
);
router.delete('/:storeId', isSignedIn, isAdmin, storeController.deleteStore);

module.exports = router;
