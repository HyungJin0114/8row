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

    return res.status(200).json('생성을 성공했습니다.');
  } catch (err) {
    console.error(`Error path: ${__dirname}${__filename}`);
    console.error(err);

    return false;
  }
};

exports.getMenu = async (req, res, next) => {
  const { storeId } = req.params;

  try {
    const menu = await menuService.getMenu(storeId); //load menu;
    if (!menu) {
      return res.status(200).json({ message: '메뉴가 존재하지 않습니다.' });
    }

    return res.status(200).json({ result: menu });
  } catch (err) {
    console.error(`Error path: ${__dirname}${__filename}`);
    console.error(err);

    return res
      .status(404)
      .json({ message: '메뉴를 불러오는 중에 문제가 발생하였습니다.' });
  }
};

exports.updateMenu = async (req, res, next) => {
  const { storeId, menuId } = req.params;
  // 일단 이미지 정보도 넣긴 했는데 이것은 기존에 만들때 정보이고 수정할 때 어떻게 할지 생각해보기
  const { menuName, price, image } = req.body;

  try {
    const result = await menuService.updateMenu(
      menuId,
      storeId,
      menuName,
      price,
      image
    );

    if (!result) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    return res.status(200).json({ message: '수정이 완료되었습니다.' });
  } catch (err) {
    console.error(`Error path: ${__dirname}${__filename}`);
    console.error(err);

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteMenu = async (req, res, next) => {
  const { menuId } = req.params;
  // 안전 장치로써 storeId도 DB에서 확인하도록 하는 것이 좋을까..?

  try {
    const result = await menuService.deleteMenu(menuId);

    if (!result) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    return res.status(200).json({ message: '삭제가 완료되었습니다.' });
  } catch (err) {
    console.error(`Error path: ${__dirname}${__filename}`);
    console.error(err);

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
