import useFreelancersQueries from "src/hooks/useFreelancersQueries";
import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import React, { useEffect, useState } from "react";
import { getFreelancer } from "src/api/User";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import ProjectVolunteeredFreelancerProfile from "./ProjectVolunteeredFreelancerProfile";

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
  const [volunteeredFreelancer, setVolunteeredFreelancer] =
    useState<FreelancerInfo | null>(null);

  useEffect(() => {
    const fetchVolunteeredFreelancer = async () => {
      if (project.volunteer && project.volunteer[0]) {
        const userId = project.volunteer[0];
        const freelancer = await getFreelancer(userId);
        setVolunteeredFreelancer(freelancer);
      }
    };

    fetchVolunteeredFreelancer();
  }, [project.volunteer]);

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
          {project.category}팀 {project.manager.name}
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
            {project.pay.min}
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
            {project.pay.max}
          </S.ModalDetail>
        </S.ModalInfoFlexBox>
      </S.ModalInfoColumnBox>
      <S.ModalLine />
      {/* --------------------------------------------------------- */}
      <S.ModalTitle marginBottom="10px">
        <label htmlFor="volunteeredFreelancer">투입한 프리랜서</label>
      </S.ModalTitle>

      <ProjectVolunteeredFreelancerProfile
        volunteeredFreelancer={volunteeredFreelancer}
        project={project}
      />
    </S.DetailModalContainer>
  );
};

export default ProjectDetailModal;
