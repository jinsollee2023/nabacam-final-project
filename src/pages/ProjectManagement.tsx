import { styled } from "styled-components";
import TaskBox from "../components/task/TaskBox";
import { useState } from "react";

//프로젝트 관리 도구: 여러 프로젝트의 진행 상황, 마감일 및 작업 항목을 한눈에 볼 수 있게 함
const ProjectManagement = () => {
  const [isTaskTabOn, setIsTaskTabOn] = useState(true);
  return (
    <>
      <S.MenuTabBar>
        <S.MenuTab
          onClick={() => setIsTaskTabOn(true)}
          fontWeight={isTaskTabOn ? 600 : 400}
        >
          프로젝트 진행 상태
        </S.MenuTab>
        <S.MenuTab
          onClick={() => setIsTaskTabOn(false)}
          fontWeight={isTaskTabOn ? 400 : 600}
        >
          프로젝트 관리
        </S.MenuTab>
      </S.MenuTabBar>
      <S.CompContainer>
        {isTaskTabOn ? <TaskBox /> : <div>프로젝트 관리</div>}
      </S.CompContainer>
    </>
  );
};

export default ProjectManagement;

interface MenuTabProps {
  fontWeight?: number;
}

const S = {
  MenuTabBar: styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid grey;

    display: flex;
    align-items: center;

    padding: 0 20px;
  `,
  MenuTab: styled.span<MenuTabProps>`
    margin: 0 20px;
    font-size: 15px;
    font-weight: ${(props) => props.fontWeight};
    cursor: pointer;
  `,
  CompContainer: styled.div`
    padding: 30px;
  `,
};
