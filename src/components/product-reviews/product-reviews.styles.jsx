import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

export const ReviewsTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

export const AverageRating = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  font-size: 18px;
  color: #666;
`;

export const StarRating = styled.span`
  color: #ffd700;
  font-size: 24px;
`;

export const ReviewForm = styled.form`
  background: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 40px;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReviewItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ReviewAuthor = styled.span`
  font-weight: 600;
  color: #333;
`;

export const ReviewDate = styled.span`
  font-size: 14px;
  color: #999;
`;

export const ReviewRating = styled.div`
  color: #ffd700;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ReviewText = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;
