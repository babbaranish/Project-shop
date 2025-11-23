// Predefined coupons (in a real app, these would come from a database)
export const AVAILABLE_COUPONS = {
  'SAVE10': { code: 'SAVE10', discount: 0.10, type: 'percentage', description: '10% off' },
  'SAVE20': { code: 'SAVE20', discount: 0.20, type: 'percentage', description: '20% off' },
  'FLAT50': { code: 'FLAT50', discount: 50, type: 'fixed', description: '$50 off' },
  'WELCOME': { code: 'WELCOME', discount: 0.15, type: 'percentage', description: '15% off for new customers' }
};

export const validateCoupon = (couponCode) => {
  const upperCode = couponCode.toUpperCase();
  return AVAILABLE_COUPONS[upperCode] || null;
};

export const calculateDiscount = (total, coupon) => {
  if (!coupon) return 0;

  if (coupon.type === 'percentage') {
    return total * coupon.discount;
  } else if (coupon.type === 'fixed') {
    return Math.min(coupon.discount, total);
  }

  return 0;
};

export const applyDiscountToTotal = (total, coupon) => {
  const discount = calculateDiscount(total, coupon);
  return Math.max(0, total - discount);
};
