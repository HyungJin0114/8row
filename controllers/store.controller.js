const StoreService = require('../services/store.service');

class StoreController {
  storeService = new StoreService();

  // 업체 등록
  createStore = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const image = req.file;
      const { name, storePhoneNumber, category, location } = req.body;

      const createStoreData = await this.storeService.createStore(
        name,
        storePhoneNumber,
        category,
        location,
        image.location,
        userId
      );
      return res
        .status(createStoreData.status)
        .json({ result: createStoreData.message });
    } catch (error) {
      return res.status(400).json({ result: '업체 등록에 실패했습니다.' });
    }
  };

  // 업체 삭제
  deleteStore = async (req, res, next) => {
    const userId = res.locals.user;
    const { storeId } = req.params;
    const deleteStore = await this.storeService.deleteStore(userId, storeId);
    return res.status(deleteStore.status).json({ result: deleteStore.message });
  };

  //업체 수정
  updateStore = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const image = req.file;
      const { storeId } = req.params;
      const { name, storePhoneNumber, category, location } = req.body;

      const updateStoreData = await this.storeService.updateStore(
        userId,
        storeId,
        name,
        storePhoneNumber,
        category,
        location,
        image.location
      );
      return res
        .status(updateStoreData.status)
        .json({ result: updateStoreData.message });
    } catch (error) {
      return res.status(400).json({ result: '업체 등록에 실패했습니다.' });
    }
  };

  //업체 전체보기
  getStore = async (req, res, next) => {
    const { category } = req.query;
    const getStoreData = await this.storeService.getStore(category);
    if (getStoreData.status == 200) {
      return res
        .status(getStoreData.status)
        .json({ result: getStoreData.getStoreData });
    }

    return res
      .status(getStoreData.status)
      .json({ result: getStoreData.message });
  };

  //업체 상세보기
  getStoreDetail = async (req, res, next) => {
    const { storeId } = req.params;
    const getStoreDetailData = await this.storeService.getStoreDetail(storeId);

    if (getStoreDetailData.status == 200) {
      return res
        .status(getStoreDetailData.status)
        .json({ result: getStoreDetailData.getStoreDetailData });
    }
    return res
      .status(getStoreDetailData.status)
      .json({ result: getStoreDetailData.message });
  };
}

module.exports = StoreController;
