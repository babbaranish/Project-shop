import styled from 'styled-components';

export const SearchBoxContainer = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;
