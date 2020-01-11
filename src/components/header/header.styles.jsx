import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media all and (max-width: 800px) and (min-width: 300px){
    height: 60px;
    margin-bottom:20px;
    paddign: 10px;

  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  
  @media all and (max-width: 800px) and (min-width: 300px){
    width: 50px;
    padding-top:10px;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media all and (max-width: 800px) and (min-width: 300px){
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
