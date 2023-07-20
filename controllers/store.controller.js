const StoreService = require('../services/store.service');


class StoreController {
  storeService = new StoreService();

  // 업체 등록
  createStore = async (req, res, next) => {
    const ownerId = res.locals.user;
    const { name,
      storePhoneNumber,
      category,
      location,
      image } = req.body;

    const createStoreData = await this.storeService.createStore(
      name,
      storePhoneNumber,
      category,
      location,
      image,
      ownerId
    );
    return res
      .status(createStoreData.status)
      .json({ result: createStoreData.massage });
  }

  // 업체 삭제
  deleteStore = async (req, res, next) => {
    const ownerId = req.locals.user;
    const { storeId } = req.params;

    const deleteStore = await this.storeService.deleteStore(
      ownerId,
      storeId
    );
    return res
      .status(deleteStore.status)
      .json({ result: deleteStore.massage });
  }

  //업체 수정
  updateStore = async (req, res, next) => {
    const ownerId = req.locals.user;
    const { storeId } = req.params;
    const { name, storePhoneNumber, category, location, image } = req.body;

    const updateStoreData = await this.storeService.updateStore(
      ownerId,
      storeId,
      name,
      storePhoneNumber,
      category,
      location,
      image
    );
    return res
      .status(updateStoreData)
      .json({ result: updateStoreData.message });
  }

  //업체 전체보기
  getStore = async (req, res, next) => {
    const ownerId = req.locals.user;

    const getStoreData = await this.storeService.getStore(ownerId);
    return res
      .status(getStoreData.status)
      .json({ result: getStoreData.message });
  }

  //업체 상세보기
  getStoreDetail = async (req, res, next) => {
    const {ownerId} = req.params;

    const getStoreDetailDate = await this.storeService.getStoreDetail(ownerId);
    return res
    .status(getStoreDetailDate.status)
    .json({result: getStoreDetailDate.message});
  }
}

module.exports = StoreController;