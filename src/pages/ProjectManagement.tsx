import MenuTabBarComp from "../components/common/MenuTabBarComp";

//프로젝트 관리 도구: 여러 프로젝트의 진행 상황, 마감일 및 작업 항목을 한눈에 볼 수 있게 함
const ProjectManagement = () => {
  const projectManagementMenu = ["프로젝트 진행 상태", "프로젝트 목록"];
  return (
    <>
      <MenuTabBarComp menu={projectManagementMenu} />
    </>
  );
};

export default ProjectManagement;
