const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authAdmin');

const StoreController = require('../controllers/store.controller');
const storeController = new StoreController();

router.post('/store', isAdmin, storeController.createStore );
router.get('/store', isAdmin, storeController.getStore );
router.get('/:storeId',isAdmin, storeController.getStoreDetail);
router.put('/:storeId', isAdmin, storeController.updateStore);
router.delete('/:storeId', isAdmin, storeController.deleteStore);

module.exports = router;
