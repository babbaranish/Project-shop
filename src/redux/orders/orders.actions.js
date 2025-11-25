import OrderActionTypes from './orders.types';

export const addOrder = (order) => ({
  type: OrderActionTypes.ADD_ORDER,
  payload: order
});

export const loadOrders = (orders) => ({
  type: OrderActionTypes.LOAD_ORDERS,
  payload: orders
});
