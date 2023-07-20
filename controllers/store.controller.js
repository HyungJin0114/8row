const StoreService = require('../services/stroe.service');


class StoreController{
    storeService = new StoreService();

    // 업체 등록
    createStore = async (req, res, next) => {
        const ownerId = res.locals.user;
        const {name,
            storePhoneNumber,
            category,
            location,
            image } = req.body;

        const createStoreData =await this.storeService.createStore(
            name,
            storePhoneNumber,
            category,
            location,
            image,
            ownerId
          );
        return res
          .status(createStoreData.status)
          .json({result : createStoreData.massage});
      }

      // 업체 삭제
      deleteStore = async (req, res, next) => {
        const ownerId = req.locals.user;
        const {storeId} = req.params;

        const deleteStore = await this.storeService.deleteStore(
          ownerId,
          storeId
        );
        return res
          .status(deleteStore.status)
          .json({result : deleteStore.massage});
      }

      //업체 수정
      updateStore = async (req, res, next) => {
        const ownerId = req.locals.user;
        const {storeId} = req.params;
        const {name, storePhoneNumber, category,location,image } = req.body;

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
        .json({result : updateStoreData.message});
      }





}





const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
  createPost = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost(nickname, password, title, content);

    res.status(201).json({ data: createPostData });
  }

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts })
  }


}

module.exports = PostsController;