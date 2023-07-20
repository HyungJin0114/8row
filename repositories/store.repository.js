const { Store, User } = require('../models');

class StoreRepository {

    //업체등록
    createStore = async (name, storePhoneNumber, category, location, image, ownerId) => {
        const createStoreData = await Store.create({
            name, storePhoneNumber, category, location, image, ownerId
        });

        return createStoreData;
    };

    //업체삭제
    deleteStore = async (ownerId, storeId)=> {
        const deleteStoreData = await Store.destroy({
            where: { ownerId ,storeId},
        });
    }

    //업체수정

    //업체리스트

    //업체상세보기
}


module.exports = StoreController;