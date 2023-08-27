import { useUserStore } from "src/zustand/useUserStore";
import MenuTabBarComp from "../components/common/MenuTabBarComp";

//프로젝트 관리 도구: 여러 프로젝트의 진행 상황, 마감일 및 작업 항목을 한눈에 볼 수 있게 함
const ProjectManagement = () => {
  const { user } = useUserStore();
  const clientProjectManagementMenu = ["프로젝트 진행 상태", "프로젝트 목록"];
  const freelancerProjectManagementMenu = ["프로젝트 진행 상태"];

  return (
    <>
      {user.role === "client" && (
        <MenuTabBarComp menu={clientProjectManagementMenu} />
      )}
      {user.role === "freelancer" && (
        <MenuTabBarComp menu={freelancerProjectManagementMenu} />
      )}
    </>
  );
};

export default ProjectManagement;
