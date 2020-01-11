import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media all and (max-width: 800px) and (min-width: 300px){
      align-items: center;
  }
`;

export const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover {
    color: grey;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 800px) and (min-width: 300px){
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:20px;
  }
`;
