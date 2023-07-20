const MenuRepo = require('../repositories/menus.repository');

class MenuService {
  menuRepo = new MenuRepo();

  createMenu = async (storeId, menuName, price, files) => {
    console.log('service - createMenu!');
    const filePaths = [];
    const arrObj = [];
    // 데이터 예시{storeId: 12, menuName: '123', price: 123, image: imgPath}
    for (const file in files) {
      filePaths.push(files[file][0].path);
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
}

module.exports = MenuService;
