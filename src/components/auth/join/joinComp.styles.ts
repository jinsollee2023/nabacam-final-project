import { Tabs } from "antd";
import { styled } from "styled-components";

export const S = {
  JoinCompContainer: styled.div`
    width: 90vw;
    height: 100vh;
    /* background-color: beige; */

    /* position: relative; */
  `,
  tabsContainer: styled.div`
    /* background-color: aqua; */
    /* position: absolute; */
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    font-size: 18px;
    margin-top: 40%;
    margin-bottom: 40%;
  `,
  Tabs: styled(Tabs)`
    position: relative;
    /* background-color: aliceblue; */
    height: 90vh;
  `,
  TabsBack: styled.div`
    height: 80vh;
    width: 70%;
    display: flex;
    align-items: center;
    /* background-color: aliceblue; */
    position: absolute;
    border: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
