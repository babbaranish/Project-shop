import React, { useState } from 'react';
import { connect } from 'react-redux';

import { applyCoupon, removeCoupon } from '../../redux/coupon/coupon.actions';
import { validateCoupon } from '../../redux/coupon/coupon.utils';

import {
  CouponContainer,
  CouponInput,
  ApplyButton,
  RemoveButton,
  Message,
  AppliedCoupon
} from './coupon-input.styles';

const CouponInputComponent = ({ appliedCoupon, applyCoupon, removeCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');

  const handleApplyCoupon = () => {
    const validCoupon = validateCoupon(couponCode);

    if (validCoupon) {
      applyCoupon(validCoupon);
      setMessage(`Coupon applied: ${validCoupon.description}`);
      setCouponCode('');
    } else {
      setMessage('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setMessage('Coupon removed');
  };

  return (
    <CouponContainer>
      {!appliedCoupon ? (
        <>
          <CouponInput
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <ApplyButton onClick={handleApplyCoupon}>
            Apply
          </ApplyButton>
        </>
      ) : (
        <AppliedCoupon>
          <span>{appliedCoupon.code} - {appliedCoupon.description}</span>
          <RemoveButton onClick={handleRemoveCoupon}>Remove</RemoveButton>
        </AppliedCoupon>
      )}
      {message && <Message>{message}</Message>}
    </CouponContainer>
  );
};

const mapStateToProps = state => ({
  appliedCoupon: state.coupon.appliedCoupon
});

const mapDispatchToProps = dispatch => ({
  applyCoupon: coupon => dispatch(applyCoupon(coupon)),
  removeCoupon: () => dispatch(removeCoupon())
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponInputComponent);
