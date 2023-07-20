const StroeRepository = require('../repositories/store.repository');

class StoreService {
    stroeRepository = new StroeRepository();

    //업체 등록
    createStore =
        async (name, storePhoneNumber, category, location, image, image, sales) => {
            try {
                await this.stroeRepository.createStore(
                    name,
                    storePhoneNumber,
                    category,
                    location,
                    image,
                    sales
                );
                return `200@"massage": "${this.createStore}업체 등록에 성공했습니다."`;
            } catch (error) {
                return `400@"massage": "업체 등록에 실패했습니다."`;
            }
        };

    //업체 리스트
    getStore = async() =>{
        try{
            const getStoreData = await this.stroeRepository.getStore();

            return `200@${getStoreData}`;
        }catch(error){
            return `400@"massage": "업체리스트 불러오기에 실패했습니다."`;
        }
    };

    //업체 상세보기
    getStoreDetail = async(ownerId) => {
        try{
            const getStoreDetailDate = await this.stroeRepository.getStoreDetail(ownerId);
            return `200@${getStoreDetailDate}`;

        }catch (error) {
            return `400@"massage": "업체 불러오기에 실패했습니다."`;
        }
    };

    //업체 수정
    updateStore = async(ownerId) => {
        try{
            await this.stroeRepository.updateStore(ownerId);
            return `200@"massage": "업체 수정 완료되었습니다."`;
        }catch (error) {
            return `400@"massage": "업체 수정 실패했습니다."`;
        }
    }

    //업체 삭제
    deleteStore = async (ownerId) => {
        try{
            await this.stroeRepository.deleteStore(ownerId);
            return `200@"massage": "업체 삭제 완료되었습니다."`;
        }catch (error) {
            return `400@"massage": "업체 삭제 실패하였습니다."`;
        }
    }
}

module.exports = PostService;