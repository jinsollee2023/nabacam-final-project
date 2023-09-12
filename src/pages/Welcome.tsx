import { Tabs } from "antd";
import styled from "styled-components";
import WelcomeIntro from "src/components/welcome/WelcomeIntro";
import React from "react";
import FreelancerInformation from "src/components/welcome/freelancerInformation";
import ClientInformation from "src/components/welcome/clientInformation";

const Welcome = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <WelcomeIntro />

      <CustomTabs
        defaultActiveKey="1"
        size="large"
        style={{ margin: "25px 0" }}
      >
        <TabPane tab="'프리랜서'이신가요?" key="1">
          <FreelancerInformation />
        </TabPane>
        <TabPane tab="'클라이언트'이신가요?" key="2">
          <ClientInformation />
        </TabPane>
      </CustomTabs>
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
