const MenuRepo = require('../repositories/menus.repository');

class MenuService {
  menuRepo = new MenuRepo();

  createMenu = async (storeId, menuName, price, file) => {
    const image = file.location;
    try {
      const result = await this.menuRepo.createMenu(
        storeId,
        menuName,
        price,
        image
      );
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
