import styled from "styled-components";

export const S = {
  WaveContainer: styled.div`
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    height: 250px;
    background: linear-gradient(to bottom, #ddf2fd, #ebf8ff, #ffffff);
    transform: scaleY(-1);
    z-index: -1;
  `,
  WaveBox: styled.div`
    position: relative;
    display: block;
    margin: auto;
    width: 100%;
    height: 100%;
  `,
  Wave: styled.div`
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='157'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3E%3Cstop stop-color='%23ffffff' stop-opacity='1' offset='0%25'/%3E%3Cstop stop-color='%23ffffff' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 80C311 80 409.898-.25 811 0c400 0 500 80 789 80v77H0s.005-48 .005-77z' transform='matrix(-1 0 0 1 1600 0)'/%3E%3C/svg%3E")
      repeat-x;
    position: absolute;
    bottom: 0;
    width: 6400px;
    height: 157px;
    animation: wave 3s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);

    @keyframes wave {
      0% {
        margin-left: -1600px;
      }
      100% {
        margin-left: 0px;
      }
    }
  `,
};
