import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectOrders } from '../../redux/orders/orders.selectors';

import {
  OrderHistoryContainer,
  Title,
  OrdersList,
  OrderItem,
  OrderHeader,
  OrderId,
  OrderDate,
  OrderTotal,
  OrderItems,
  OrderItemRow,
  ItemName,
  ItemQuantity,
  ItemPrice,
  EmptyMessage
} from './order-history.styles';

const OrderHistory = ({ orders, currentUser }) => {
  const userOrders = currentUser
    ? orders.filter(order => order.userId === currentUser.id)
    : orders;

  return (
    <OrderHistoryContainer>
      <Title>Order History</Title>
      {userOrders.length === 0 ? (
        <EmptyMessage>
          You haven't placed any orders yet. Start shopping!
        </EmptyMessage>
      ) : (
        <OrdersList>
          {userOrders.map(order => (
            <OrderItem key={order.id}>
              <OrderHeader>
                <OrderId>Order #{order.id}</OrderId>
                <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
                <OrderTotal>Total: ${order.total.toFixed(2)}</OrderTotal>
              </OrderHeader>
              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItemRow key={index}>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                    <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                  </OrderItemRow>
                ))}
              </OrderItems>
            </OrderItem>
          ))}
        </OrdersList>
      )}
    </OrderHistoryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectOrders
});

const mapStateToPropsWithUser = state => ({
  orders: selectOrders(state),
  currentUser: state.user.currentUser
});

export default connect(mapStateToPropsWithUser)(OrderHistory);
