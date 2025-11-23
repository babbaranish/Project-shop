import styled from 'styled-components';

export const OrderHistoryContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 38px;
  color: #333;
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const OrderItem = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 10px;
`;

export const OrderId = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: #333;
`;

export const OrderDate = styled.span`
  color: #666;
  font-size: 16px;
`;

export const OrderTotal = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #4a90e2;
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OrderItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
`;

export const ItemName = styled.span`
  flex: 2;
  color: #333;
`;

export const ItemQuantity = styled.span`
  flex: 1;
  text-align: center;
  color: #666;
`;

export const ItemPrice = styled.span`
  flex: 1;
  text-align: right;
  font-weight: 600;
  color: #333;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #999;
  padding: 100px 20px;
`;
