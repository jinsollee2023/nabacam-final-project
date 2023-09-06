import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import { getFreelancer } from "src/api/User";
import ProjectCommittedFreelancerProfile from "./ProjectCommittedFreelancerProfile";
import { useUserStore } from "src/zustand/useUserStore";

export interface ProjectDetailModalProps {
  project: Project;
}
export interface FreelancerInfo {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  workField: {
    workField?: string;
    workSmallField: string;
  };
  projectId: string;
  resumeProfileIntro: string;
  photoURL: string;
}

const ProjectDetailModal = ({ project }: ProjectDetailModalProps) => {
  const [committedFreelancer, setCommittedFreelancer] =
    useState<FreelancerInfo | null>(null);

  const { userRole } = useUserStore();

  const fetchCommittedFreelancer = async () => {
    const userId = project.freelancerId!;
    const freelancer = await getFreelancer(userId);
    setCommittedFreelancer(freelancer);
  };
  useEffect(() => {
    fetchCommittedFreelancer();
  }, [project]);

  const payUnitConversion = (pay: number | string) => {
    if (pay === "상의 후 결정") {
      return pay;
    } else {
      const convertedPay = (pay as number) * 10000;
      return convertedPay.toLocaleString("ko-KR") + "₩";
    }
  };

  return (
    <S.DetailModalContainer>
      <S.ModalTitle fontSize="20px" marginBottom="30px">
        {project.title}
      </S.ModalTitle>

      <S.ModalInfoColumnBox>
        <S.ModalTitle marginBottom="5px">
          <label htmlFor="projectTitle">프로젝트 이름</label>
        </S.ModalTitle>
        <S.ModalDetail id="projectTitle" marginBottom="3px">
          {project.title}
        </S.ModalDetail>
        <S.ModalTitle marginTop="7px" marginBottom="3px">
          <label htmlFor="projectDesc">프로젝트 설명</label>
        </S.ModalTitle>
        <S.ModalDetail id="projectDesc">{project.desc}</S.ModalDetail>
      </S.ModalInfoColumnBox>
      <S.ModalLine />
      {/* --------------------------------------------------------- */}
      <S.ModalTitle marginBottom="10px">
        <label htmlFor="projectQualification">모집 조건</label>
      </S.ModalTitle>
      <S.ModalInfoFlexBox>
        <S.ModalInfoColumnBox>
          <S.ModalDetail>경력</S.ModalDetail>
          <S.ModalDetail color="var(--main-blue)">
            {project.qualification}년차 이상부터
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
        <S.ModalInfoColumnBox marginLeft="30%">
          <S.ModalDetail marginBottom="0px">분야</S.ModalDetail>
          <S.ModalDetail color="var(--main-blue)" marginBottom="0px">
            {project.category}
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
      </S.ModalInfoFlexBox>
      {/* --------------------------------------------------------- */}
      <S.ModalLine />
      <S.ModalTitle marginBottom="10px">
        <label htmlFor="projectInfo">프로젝트 설정</label>
      </S.ModalTitle>
      <S.ModalInfoColumnBox>
        <S.ModalDetail>목표기간</S.ModalDetail>
        <S.ModalInfoFlexBox style={{ alignItems: "center" }}>
          <S.ModalDetail color="var(--main-blue)">
            {String(project.date?.startDate)}
          </S.ModalDetail>
          <p style={{ fontSize: "5px", color: "var(--darker-gray)" }}>부터</p>
          <S.ModalDetail color="var(--main-blue)">
            {String(project.date?.endDate)}
          </S.ModalDetail>
        </S.ModalInfoFlexBox>

        <S.ModalDetail marginTop="10px" marginBottom="2px">
          담당자
        </S.ModalDetail>
        <S.ModalDetail color="var(--main-blue)">
          {project.manager.team}팀 {project.manager.name}
        </S.ModalDetail>

        <S.ModalDetail marginTop="10px" marginBottom="2px">
          급여
        </S.ModalDetail>

        <S.ModalInfoFlexBox style={{ alignItems: "center" }}>
          <p
            style={{
              fontSize: "5px",
              color: "var(--darker-gray)",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            최소
          </p>
          <S.ModalDetail
            color="var(--main-blue)"
            marginRight="15px"
            marginLeft="15px"
          >
            {payUnitConversion(project.pay.min as number)}
          </S.ModalDetail>
          <p
            style={{
              fontSize: "5px",
              color: "var(--darker-gray)",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            최대
          </p>
          <S.ModalDetail
            color="var(--main-blue)"
            marginRight="15px"
            marginLeft="15px"
          >
            {payUnitConversion(project.pay.max as number)}
          </S.ModalDetail>
        </S.ModalInfoFlexBox>
      </S.ModalInfoColumnBox>
      {/* --------------------------------------------------------- */}

      {committedFreelancer && userRole === "client" && (
        <>
          <S.ModalLine />
          <S.ModalTitle marginBottom="10px">
            <label htmlFor="volunteeredFreelancer">투입한 프리랜서</label>
          </S.ModalTitle>

          <ProjectCommittedFreelancerProfile
            committedFreelancer={committedFreelancer}
            project={project}
          />
        </>
      )}
    </S.DetailModalContainer>
  );
};

export default ProjectDetailModal;
