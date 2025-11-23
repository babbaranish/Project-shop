import CouponActionTypes from './coupon.types';

const INITIAL_STATE = {
  appliedCoupon: null
};

const couponReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CouponActionTypes.APPLY_COUPON:
      return {
        ...state,
        appliedCoupon: action.payload
      };

    case CouponActionTypes.REMOVE_COUPON:
      return {
        ...state,
        appliedCoupon: null
      };

    default:
      return state;
  }
};

export default couponReducer;
