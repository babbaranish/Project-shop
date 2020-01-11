import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { clearAfterPayment } from '../../redux/cart/cart.actions'




const StripeCheckoutButton = ({ price, clearAfterPayments }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_yOIko0AhcVkTomF7BjXOaIAI00VEOHOV7t';

  const onToken = token => {
    if (token) {
      clearAfterPayments();
    }
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Test App'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  clearAfterPayments: item => dispatch(clearAfterPayment(item))
})
export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
