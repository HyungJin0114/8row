const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');
const upload = require('../middlewares/upload');
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menus.controller');

router.get('/:storeId/menus', getMenu);
router.post(
  '/:storeId/menus',
  isSignedIn,
  isAdmin,
  upload.single('image'),
  createMenu
);
router.put(
  '/:storeId/menus/:menuId',
  isSignedIn,
  isAdmin,
  upload.single('image'),
  updateMenu
);
router.delete('/:storeId/menus/:menuId', isSignedIn, isAdmin, deleteMenu);

module.exports = router;
