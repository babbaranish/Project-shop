import CouponActionTypes from './coupon.types';

export const applyCoupon = coupon => ({
  type: CouponActionTypes.APPLY_COUPON,
  payload: coupon
});

export const removeCoupon = () => ({
  type: CouponActionTypes.REMOVE_COUPON
});
