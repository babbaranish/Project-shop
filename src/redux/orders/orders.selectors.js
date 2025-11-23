import { createSelector } from 'reselect';

const selectOrdersState = state => state.orders;

export const selectOrders = createSelector(
  [selectOrdersState],
  orders => orders.orders
);

export const selectOrdersForUser = userId => createSelector(
  [selectOrders],
  orders => orders.filter(order => order.userId === userId)
);
