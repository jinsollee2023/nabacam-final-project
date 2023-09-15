import { Tabs } from "antd";
import styled from "styled-components";
import WelcomeIntro from "src/components/welcome/WelcomeIntro";
import React, { useRef } from "react";
import FreelancerInformation from "src/components/welcome/freelancerInformation";
import ClientInformation from "src/components/welcome/clientInformation";

const Welcome = () => {
  const { TabPane } = Tabs;

  const freelancerTab = useRef<HTMLDivElement | null>(null);
  const clientTab = useRef<HTMLDivElement | null>(null);

  const scrollToTab = (tabId: string) => {
    if (tabId === "1") {
      freelancerTab.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      clientTab.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <WelcomeIntro />
      <CustomTabs
        defaultActiveKey="1"
        size="large"
        style={{ margin: "25px 0" }}
        onChange={scrollToTab}
      >
        <TabPane tab="'프리랜서'이신가요?" key="1">
          <div ref={freelancerTab}>
            <FreelancerInformation />
          </div>
        </TabPane>
        <TabPane tab="'클라이언트'이신가요?" key="2">
          <div ref={clientTab}>
            <ClientInformation />
          </div>
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
