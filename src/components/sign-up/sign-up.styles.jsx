import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  @media all and (max-width: 800px) and (min-width: 300px){
    width:unset;
  }
 
`;

export const SignUpTitle = styled.h2`
  margin: 10px 0;
`;
