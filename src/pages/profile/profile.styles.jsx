import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const ProfileTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 38px;
  color: #333;
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

export const ProfileSection = styled.div`
  margin-bottom: 25px;
`;

export const Label = styled.div`
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Value = styled.div`
  font-size: 18px;
  color: #333;
`;

export const EditButton = styled.button`
  width: 100%;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

export const EditForm = styled.form`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

export const SaveButton = styled.button`
  flex: 1;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #da190b;
  }
`;
