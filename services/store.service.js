const StroeRepository = require('../repositories/store.repository');

class StoreService {
  stroeRepository = new StroeRepository();

  //업체 등록
  createStore = async (
    name,
    storePhoneNumber,
    category,
    location,
    files,
    ownerId
  ) => {
    try {
      const filePaths = [];
      const arrObj = [];
      for (const file in files){
        filePaths.push(files[file][0].path);
      }
      for(let i =0; i<filePaths.length; i++){
        const obj = {
          image : filePaths[i]
        };
        arrObj.push(obj);
      }

      await this.stroeRepository.createStore(
        name,
        storePhoneNumber,
        category,
        location,
        arrObj,
        ownerId
      );  
      return { status: 200, message: '업체등록이 완료되었습니다.' };
    } catch (error) {
      console.log(error, 'err');
      return { status: 400, message: '업체등록에 실패했습니다.' };
    }
  };

  //업체 리스트
  getStore = async () => {
    try {
      const getStoreData = await this.stroeRepository.getStore();
      return { status: 200, getStoreData };
    } catch (error) {
      return { status: 400, message: '업체리스트 불러오기에 실패했습니다.' };
    }
  };

  //업체 상세보기
  getStoreDetail = async storeId => {
    try {
      console.log(storeId, 'ser1');
      const getStoreDetailData = await this.stroeRepository.getStoreDetail(
        storeId
      );
      console.log(storeId, 'ser2');
      return { status: 200, getStoreDetailData };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '업체 불러오기에 실패했습니다.' };
    }
  };
  //업체 수정
  updateStore = async (
    userId,
    storeId,
    name,
    storePhoneNumber,
    category,
    location,
    image
  ) => {
    try {
      const compareStoreData = await this.stroeRepository.compareStore(storeId);
      if (compareStoreData.ownerId !== userId) {
        return { staus: 400, massage: '업체 수정 권한이 없습니다.' };
      }
      await this.stroeRepository.updateStore(
        userId,
        storeId,
        name,
        storePhoneNumber,
        category,
        location,
        image
      );
      return { status: 200, message: '업체 수정이 완료되었습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '업체 수정이 실패했습니다.' };
    }
  };

  //업체 삭제
  deleteStore = async (userId, storeId) => {
    try {
      const compareStoreData = await this.stroeRepository.compareStore(storeId);
      console.log(compareStoreData.ownerId, '123123');

      if (compareStoreData.ownerId !== userId) {
        return { staus: 400, massage: '삭제 권한이 없습니다.' };
      }
      await this.stroeRepository.deleteStore(storeId);

      return { status: 200, message: '업체 삭제가 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: '업체 삭제가 실패하였습니다.' };
    }
  };
}

module.exports = StoreService;
