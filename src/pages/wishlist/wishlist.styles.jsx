import styled from 'styled-components';

export const WishlistPageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const WishlistTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 38px;
  color: #333;
`;

export const WishlistItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const WishlistItem = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

export const ItemPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #4a90e2;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.primary ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.primary ? '#357abd' : '#e0e0e0'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #999;
  padding: 100px 20px;
`;
