const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menus.controller');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      //   console.log(`path.basename: ${path.basename(file.originalname, ext)}`);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/:storeId/menus', getMenu);
router.post(
  '/:storeId/menus',
  isSignedIn,
  isAdmin,
  upload.fields([
    { name: 'menuImage0' },
    { name: 'menuImage1' },
    { name: 'menuImage2' },
  ]),
  createMenu
);
router.put('/:storeId/menus/:menuId', isSignedIn, isAdmin, updateMenu);
router.delete('/:storeId/menus/:menuId', isSignedIn, isAdmin, deleteMenu);

module.exports = router;
