const OrderService = require('../services/orders.service');

class OrdersController {
  orderService = new OrderService();

  //고객 주문
  createOrder = async (req, res, next) => {
    const userId = res.locals.user;
    const { orderList } = req.body;
    const { storeId } = req.params;
    let price = 0;
    let menuIdList = [];
    let countList = [];

    for (let i = 0; i < orderList.length; i++) {
      price += orderList[i].price * orderList[i].count;
      menuIdList.push(orderList[i].menuId);
      countList.push(orderList[i].count);
    }
    const createOrderData = await this.orderService.createOrder(
      userId,
      storeId,
      price,
      menuIdList,
      countList
    );
    return res
      .status(createOrderData.status)
      .json({ result: createOrderData.message });
  };

  //주문 취소
  deleteOrder = async (req, res, next) => {
    const userId = res.locals.user;
    const { storeId, orderId } = req.params;

    const deleteOrderData = await this.orderService.deleteOrder(
      userId,
      storeId,
      orderId
    );

    return res
      .status(deleteOrderData.status)
      .json({ result: deleteOrderData.message });
  };

  //업장 별 주문 내역(업주)
  getOrder = async (req, res, next) => {
    const userId = res.locals.user;
    const { storeId } = req.params;

    const getOrderData = await this.orderService.getOrder(userId, storeId);

    if (getOrderData.status == 200) {
      return res
        .status(getOrderData.status)
        .json({ result: getOrderData.getOrderData });
    }
    return res
      .status(getOrderData.status)
      .json({ result: getOrderData.message });
  };

  //배달 완료
  completeOrder = async (req, res, next) => {
    const { storeId } = req.params;
    const userId = res.locals.user;
    const { orderId } = req.params;

    const completeOrderData = await this.orderService.completeOrder(
      userId,
      storeId,
      orderId
    );

    return res
      .status(completeOrderData.status)
      .json({ result: completeOrderData.message });
  };
}

module.exports = OrdersController;
