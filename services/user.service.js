const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository();

  // 내 주문 내역
  getUserOrdered = async userId => {
    try {
      const getUserOrderedData = await this.userRepository.getUserOrdered(
        userId
      );

      return { status: 200, getUserOrderedData };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '주문 내역 불러오기에 실패했습니다.' };
    }
  };

  //내 프로필 수정
  updateUserInfo = async (
    userId,
    name,
    email,
    phoneNumber,
    nickname,
    location
  ) => {
    try {
      await this.userRepository.updateUserInfo(
        userId,
        name,
        email,
        phoneNumber,
        nickname,
        location
      );

      return { status: 200, message: '프로필 수정이 완료되었습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '프로필 수정에 실패했습니다.' };
    }
  };
}

module.exports = UserService;
