const MenuRepo = require('../repositories/menus.repository');

class MenuService {
  menuRepo = new MenuRepo();

  createMenu = async (storeId, menuName, price, files) => {
    const filePaths = [];
    const arrObj = [];
    // 데이터 예시{storeId: 12, menuName: '123', price: 123, image: imgPath}
    for (const file in files) {
      filePaths.push(files[file][0].path);
    }

    // 입력이 하나일 경우 배열이 아니라 문자열로 들어옴
    if (typeof menuName === 'string') {
      menuName = [menuName];
    }
    if (typeof price === 'string') {
      price = [price];
    }

    for (let i = 0; i < filePaths.length; i++) {
      const obj = {
        storeId: storeId,
        menuName: menuName[i],
        price: price[i],
        image: filePaths[i],
      };

      arrObj.push(obj);
    }

    console.log(arrObj);

    try {
      //   const result = await this.menuRepo.createMenu(
      //     storeId,
      //     menuName,
      //     price,
      //     imgPath
      //   );
      const result = await this.menuRepo.createMenu(arrObj);
      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  getMenu = async storeId => {
    try {
      const menu = await this.menuRepo.getMenu(storeId);
      if (!menu) {
        return null;
      }

      return menu;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return null;
    }
  };

  updateMenu = async (menuId, storeId, menuName, price, image) => {
    try {
      const result = await this.menuRepo.updateMenu(
        menuId,
        storeId,
        menuName,
        price,
        image
      );
      console.log(result);
      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  deleteMenu = async menuId => {
    try {
      const result = await this.menuRepo.deleteMenu(menuId);

      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  isOwner = async (userId, storeId) => {
    try {
      const result = await this.menuRepo.getOwner(userId, storeId);

      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };
}

module.exports = MenuService;
