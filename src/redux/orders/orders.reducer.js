import OrderActionTypes from './orders.types';

const INITIAL_STATE = {
  orders: []
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.payload,
            id: Date.now(),
            date: new Date().toISOString()
          }
        ]
      };

    case OrderActionTypes.LOAD_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
};

export default ordersReducer;
