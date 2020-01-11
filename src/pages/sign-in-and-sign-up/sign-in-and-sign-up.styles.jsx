import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media all and (max-width: 800px) and (min-width: 300px){
    flex-direction: column;
    width: unset;
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;