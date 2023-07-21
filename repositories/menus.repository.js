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

  getMenu = async storeId => {
    if (typeof storeId !== 'number') {
      storeId = Number(storeId);
    }

    try {
      const result = await Menu.findAll({
        where: { storeId },
        attributes: ['id', 'menuName', 'price', 'image'],
      });

      if (result.length <= 0) {
        return null;
      }

      return result;
    } catch (err) {
      console.log(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return null;
    }
  };
}

module.exports = MenuRepo;
