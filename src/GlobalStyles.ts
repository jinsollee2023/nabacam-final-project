import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    scroll-behavior: smooth;
  }

  *{
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'LINESeedKR-Bd';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 200;
    font-style: normal;
}

  body {

    /* background-color: #040714;
    color: #f9f9f9;

    font-family: Avenir-Roman, sans-serif;
    margin: 0;
    padding: 0; */

    font-family: 'LINESeedKR-Bd', sans-serif;

  }
/* 
  a,
  a:visited
  {
    text-decoration: none;
    transition: color 0.2s ease;
  }

  @media only screen and (min-width: 768px) {
    body {
      font-size: 16px;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 768px) {
    body {
    font-size: 15px;
    }
  }
  @media only screen and (max-width: 479px) {
    body {
      font-size: 14px;
    }
  } */
`;

export default GlobalStyles;
