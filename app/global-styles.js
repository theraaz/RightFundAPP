import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Ubuntu', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Ubuntu', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Ubuntu', sans-serif;
    line-height: 1.5em;
    font-size: 13px;
  }

  .form-control:focus {
    border-color: #f59470; 
  }

  .form-control:valid{
    background-image: none !important;
    box-shadow: none;
  }
`;

export default GlobalStyle;
