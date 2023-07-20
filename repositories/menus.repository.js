const Menu = require('../models/menu');

class MenuRepo {
  createMenu = async menuObjArray => {
    try {
      //   await Menu.create({ storeId, menuName, price, image: imgPath });
      await Menu.bulkCreate(menuObjArray);

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };
}

module.exports = MenuRepo;
