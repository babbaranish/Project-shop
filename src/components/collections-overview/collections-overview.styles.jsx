import styled from 'styled-components';

export const CollectionsOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;

  @media screen and (max-width: 800px) {
    padding: 0 10px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

export const SelectStyled = styled.select`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  min-width: 150px;

  &:hover {
    border-color: #4a90e2;
  }

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
  }
`;
