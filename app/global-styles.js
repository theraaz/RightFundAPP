import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'karla', sans-serif;
  }

  body.fontLoaded {
    font-family:  'karla', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'karla', sans-serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
