const MenuService = require('../services/menus.service');
const menuService = new MenuService();

exports.createMenu = async (req, res, next) => {
  const files = req.files;
  const { storeId } = req.params;
  const { menuName, price } = req.body;

  //   console.log(`storeId: ${storeId}`);
  // console.log(`files: ${files}`); 템플릿 문자열 자체의 버그인지 files를 출력하지 못하는 문제 있음
  //   console.log(`menuName: ${menuName}`);
  //   console.log(`price: ${price}`);
  try {
    await menuService.createMenu(storeId, menuName, price, files);

    return true;
  } catch (err) {
    console.error(`Error path: ${__dirname}${__filename}`);
    console.error(err);

    return false;
  }
};
