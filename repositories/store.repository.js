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

        return deleteStoreData;
    };

    //업체수정
    updateStore = async (ownerId, storeId) => {
        const updateStoreData = await Review.update(
            {content},
            {where : {ownerId, storeId }}
        );

        return updateStoreData;
    };

    //업체리스트
    getStore = async ownerId => {
        const getStoreData = await Store.findAll({
            attributes: ['name','location','category','storePhoneNumber','image'],
            include: [
                {
                    model: Store,
                    attributes: ['name'],
                },
            ],
            where: {ownerId},
        });
        return getStoreData;
    }

    //업체상세보기
    getStoreDetail = async ownerId => {
        const getStoreDetailData = await Store.findOne({ where : {ownerId}});

        return getStoreDetailData;
    }
}


module.exports = StoreRepository;