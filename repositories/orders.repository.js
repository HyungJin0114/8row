const { Order, OrderMenu, User, Store, Menu } = require('../models');

class OrderRepository {
  //업장 존재 여부 확인
  checkStore = async storeId => {
    const checkStoreData = await Store.findOne({
      where: { id: storeId },
    });

    return checkStoreData;
  };
  //주문 생성
  createOrder = async (userId, storeId, t) => {
    let delivered = false;
    const createOrderData = await Order.create(
      { userId, storeId, delivered },
      { transaction: t }
    );

    return createOrderData;
  };

  //주문 하위 메뉴 생성
  createOrderMenu = async (menuId, count, orderId, t) => {
    const createOrderMenuData = await OrderMenu.create(
      {
        menuId,
        count,
        orderId,
      },
      { transaction: t }
    );

    return createOrderMenuData;
  };

  //유저 포인트 확인
  checkUserPoint = async (userId, t) => {
    const { point } = await User.findOne(
      {
        attributes: ['point'],
        where: { id: userId },
        raw: true,
        nest: true,
      },
      { transaction: t }
    );

    return point;
  };

  //주문 하위 유저 포인트 변경
  updateUserPoint = async (userId, point, t) => {
    const updateUserPointData = await User.update(
      { point },
      {
        where: { id: userId },
      },
      { transaction: t }
    );

    return updateUserPointData;
  };

  //업장 매출 확인
  checkStoreSales = async (storeId, t) => {
    const sales = await Store.findOne(
      {
        attributes: ['sales'],
        where: { id: storeId },
        raw: true,
        nest: true,
      },
      { transaction: t }
    );

    return sales;
  };

  //주문 하위 업장 매출 변경
  updateStoreSales = async (storeId, sales, t) => {
    const updateStoreSalesData = await Store.update(
      { sales },
      {
        where: { id: storeId },
      },
      { transaction: t }
    );

    return updateStoreSalesData;
  };

  //오너 아이디 확인
  compareOwner = async storeId => {
    const compareOwnerData = await Store.findOne({
      attributes: ['ownerId'],
      where: { id: storeId },
    });

    return compareOwnerData;
  };

  //주문 취소
  deleteOrder = async orderId => {
    const deleteOrderData = await Order.destroy({
      where: { id: orderId },
    });

    return deleteOrderData;
  };

  //업장 별 주문 내역(업주)
  getOrder = async storeId => {
    const orders = await Order.findAll({
      attributes: ['id', 'userId', 'storeId', 'delivered'],
      include: [
        {
          model: OrderMenu,
          attributes: ['menuId', 'count'],
          include: [
            {
              model: Menu,
              attributes: ['menuName', 'price'],
            },
          ],
        },
      ],
      where: { storeId },
    });

    return orders;
  };

  //배달 완료
  completeOrder = async orderId => {
    let delivered = true;
    const completeOrderData = await Order.update(
      { delivered },
      {
        where: { id: orderId },
      }
    );

    return completeOrderData;
  };
}

module.exports = OrderRepository;
