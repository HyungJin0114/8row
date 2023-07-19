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
    let response = createOrderData.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };

  //주문 취소
  deleteOrder = async (req, res, next) => {
    const userId = res.locals.user;
    const { orderId } = req.params;

    const deleteOrderData = await this.orderService.deleteOrder(
      userId,
      storeId,
      orderId
    );

    let response = deleteOrderData.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };

  //업장 별 주문 내역(업주)
  getOrder = async (req, res, next) => {
    const userId = res.locals.user;
    const { storeId } = req.params;

    const getOrderData = await this.orderService.getOrder(userId, storeId);

    let response = getOrderData.split('@');
    return res.status(response[0]).json({ result: response[1] });
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

    let response = completeOrderData.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };
}

module.exports = OrdersController;
