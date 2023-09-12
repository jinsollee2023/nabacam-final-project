import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --main-blue: #0086d0;
    --hover-blue: #cce7f7;
    --darker-gray: #787878;
    --middle-gray: #595959;
    --lighter-gray: #D6D6D6;
    
    --chat-navy: #002c5f;
    --chat-gray: #ebebeb;
  }

  html {
    scroll-behavior: smooth;
  }

  *{
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  body {
    font-family: 'Pretendard-Regular', sans-serif;
  }
  button, .button{
    cursor: pointer;
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  textarea {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
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
