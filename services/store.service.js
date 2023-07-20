const StroeRepository = require('../repositories/store.repository');

class StoreService {
    stroeRepository = new StroeRepository();

    //업체 등록
    createStore =
        async (ownerId, name, storePhoneNumber, category, location, image, sales) => {
            try {
                await this.stroeRepository.createStore(
                    ownerId,
                    name,
                    storePhoneNumber,
                    category,
                    location,
                    image,
                    sales
                );
                return { status: 200, message: '업체등록이 완료되었습니다.' };
            } catch (error) {
                console.log(error,"err");
                return { status: 400, message: '업체등록에 실패했습니다.' };
            }
        };

    //업체 리스트
    getStore = async() =>{
        try{
            const getStoreData = await this.stroeRepository.getStore(ownerId);

            return { status: 200, getStoreData };
        }catch(error){
            return { status: 400, message: '업체리스트 불러오기에 실패했습니다.' };
        }
    };

    //업체 상세보기
    getStoreDetail = async(ownerId) => {
        try{
            const getStoreDetailDate = await this.stroeRepository.getStoreDetail(ownerId);
            return { status: 200, getStoreDetailDate };

        }catch (error) {
            return { status: 400, message: '업체 불러오기에 실패했습니다.' };
        }
    };
    //업체 수정
    updateStore = 
        async(ownerId, storeId) => {
        try{

            await this.stroeRepository.updateStore(ownerId,storeId);
            return { status: 200, message: '업체 수정이 완료되었습니다.' };
        }catch (error) {
            return { status: 400, message: '업체 수정이 실패했습니다.' };
        }
    }

    //업체 삭제
    deleteStore = async (ownerId) => {
        try{

            await this.stroeRepository.deleteStore(ownerId);
            return { status: 200, message: '업체 삭제가 완료되었습니다.' };
        }catch (error) {
            return { status: 200, message: '업체 삭제가 실패하였습니다.' };
        }
    }


}

module.exports = StoreService;


