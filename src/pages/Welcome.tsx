import { Tabs } from "antd";
import styled from "styled-components";
import ClientInfomation from "src/components/welcome/ClientInfomation";
import FreelancerInfomation from "src/components/welcome/FreelancerInfomation";
import WelcomeIntro from "src/components/welcome/WelcomeIntro";
import React from "react";

const Welcome = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <WelcomeIntro />
      <div>
        <CustomTabs defaultActiveKey="1" size="large">
          <TabPane tab="'프리랜서'이신가요?" key="1">
            <FreelancerInfomation />
          </TabPane>
          <TabPane tab="'클라이언트'이신가요?" key="2">
            <ClientInfomation />
          </TabPane>
        </CustomTabs>
      </div>
    </>
  );
};

export default Welcome;

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;
