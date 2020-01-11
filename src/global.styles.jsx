import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
body {
  font-family: 'Open Sans Condensed';
  padding: 20px 40px;
  @media all and (max-width: 800px) and (min-width: 300px){
    padding: 10px;
  }
}

a {
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}

`