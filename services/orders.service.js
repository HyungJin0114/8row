const OrderRepository = require('../repositories/orders.repository');
const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderService {
  orderRepository = new OrderRepository();

  //고객 주문
  createOrder = async (userId, storeId, price, menuIdList, countList) => {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        const checkStoreData = await this.orderRepository.checkStore(storeId);

        if (!checkStoreData) {
          return { status: 404, message: '해당 점포를 찾을 수 없습니다.' };
        }

        let point = await this.orderRepository.checkUserPoint(userId, t);

        if (point >= price) {
          point -= price;
          await this.orderRepository.updateUserPoint(userId, point, t);
        } else {
          return { status: 400, message: '포인트 잔액이 부족합니다.' };
        }

        let { sales } = await this.orderRepository.checkStoreSales(storeId, t);
        sales += price;
        await this.orderRepository.updateStoreSales(storeId, sales, t);

        const createOrderData = await this.orderRepository.createOrder(
          userId,
          storeId
        );

        for (let i = 0; i < menuIdList.length; i++) {
          await this.orderRepository.createOrderMenu(
            menuIdList[i],
            countList[i],
            createOrderData.id
          );
        }

        await t.commit();

        return { status: 200, message: '주문이 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return { status: 400, message: '주문에 실패했습니다.' };
      }
    } catch (error) {
      return { status: 400, message: '주문에 실패했습니다.' };
    }
  };

  //주문 취소
  deleteOrder = async (userId, storeId, orderId) => {
    try {
      const compareOwner = await this.orderRepository.compareOwner(storeId);

      if (compareOwner.ownerId != userId) {
        return { status: 400, message: '점포의 소유주가 아닙니다.' };
      }

      await this.orderRepository.deleteOrder(orderId);

      return { status: 200, message: '주문이 취소되었습니다.' };
    } catch (error) {
      return { status: 400, message: '주문 취소에 실패했습니다.' };
    }
  };

  //업장 별 주문 내역(업주)
  getOrder = async (userId, storeId) => {
    try {
      const compareOwner = await this.orderRepository.compareOwner(storeId);

      if (compareOwner.ownerId != userId) {
        return { status: 400, message: '점포의 소유주가 아닙니다.' };
      }

      const getOrderData = await this.orderRepository.getOrder(storeId);

      return { status: 200, getOrderData };
    } catch (error) {
      return { status: 400, message: '주문 내역 불러오기에 실패했습니다.' };
    }
  };
  //배달 완료
  completeOrder = async (userId, storeId, orderId) => {
    try {
      const compareOwner = await this.orderRepository.compareOwner(storeId);

      if (compareOwner.ownerId != userId) {
        return { status: 400, message: '점포의 소유주가 아닙니다.' };
      }

      await this.orderRepository.completeOrder(orderId);

      return { status: 200, message: '배달 완료 처리에 성공했습니다.' };
    } catch (error) {
      return { status: 400, message: '배달 완료 처리에 실패했습니다.' };
    }
  };
}

module.exports = OrderService;
