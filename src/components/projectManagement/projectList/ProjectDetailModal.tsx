import useFreelancersQueries from "src/hooks/useFreelancersQueries";
import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import React, { useEffect, useState } from "react";
import { getFreelancer } from "src/api/User";

interface ProjectDetailModalProps {
  project: Project;
}
interface FreelancerInfo {
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

  console.log("33", volunteeredFreelancer);
  return (
    <div>
      <S.ModalTitle fontSize="24px">{project.title}</S.ModalTitle>
      <S.ModalMainInfoBox>
        <S.ModalTitle>
          <label htmlFor="projectTitle">프로젝트 이름</label>
        </S.ModalTitle>
        <S.ModalDetail id="projectTitle">{project.title}</S.ModalDetail>
        <S.ModalTitle>
          <label htmlFor="projectDesc">프로젝트 설명</label>
        </S.ModalTitle>
        <S.ModalDetail id="projectDesc" marginBottom={1}>
          {project.desc}
        </S.ModalDetail>
      </S.ModalMainInfoBox>
      <S.ModalLine />
      {/* --------------------------------------------------------- */}
      <S.ModalTitle>
        <label htmlFor="projectQualification">모집 조건</label>
      </S.ModalTitle>
      <S.ModalMainInfoBox>
        <S.ModalInfoFlexBox>
          <p>경력</p>
          <p>{project.qualification}년차 이상부터</p>
        </S.ModalInfoFlexBox>
        <S.ModalInfoFlexBox>
          <p>분야</p>
          <p>디자인</p>
        </S.ModalInfoFlexBox>
      </S.ModalMainInfoBox>
      {/* --------------------------------------------------------- */}
      <S.ModalLine />
      <S.ModalSubInfoBox>
        <S.ModalTitle>
          <label htmlFor="projectInfo">프로젝트 설정</label>
        </S.ModalTitle>
        <S.ModalDetail fontSize="18px">
          <label htmlFor="projectDuration">목표기간</label>
        </S.ModalDetail>
        <p>
          {String(project.date.startDate)}부터 {String(project.date.endDate)}
        </p>
        <S.ModalDetail fontSize="18px">
          <label htmlFor="projectManager">담당자</label>
        </S.ModalDetail>
        <S.ModalDetail id="projectManager">{project.category}팀</S.ModalDetail>
        <S.ModalDetail id="projectManager">
          {project.manager.name}
        </S.ModalDetail>
        <S.ModalDetail fontSize="18px">
          <label htmlFor="projectPay">급여</label>
        </S.ModalDetail>
        <S.ModalDetail>최소{project.pay.min}</S.ModalDetail>
        <S.ModalDetail>최대{project.pay.max}</S.ModalDetail>
      </S.ModalSubInfoBox>
      <S.ModalLine />
      {/* --------------------------------------------------------- */}
      <S.ModalTitle>투입한 프리랜서</S.ModalTitle>
      <S.ModalInfoFlexBox>
        <div>
          {project.volunteer && project.volunteer.length > 0 ? (
            <S.ModalInfoFlexBox>
              <div>{volunteeredFreelancer?.photoURL}</div>
              <S.ModalInfoColumnBox>
                <div>{volunteeredFreelancer?.name}</div>
                <div>{volunteeredFreelancer?.workField.workSmallField}</div>
                <div>{volunteeredFreelancer?.resumeProfileIntro}</div>
                <div>{volunteeredFreelancer?.contact.email}</div>
                <div>{volunteeredFreelancer?.contact.phone}</div>
              </S.ModalInfoColumnBox>
            </S.ModalInfoFlexBox>
          ) : (
            <p>모집중</p>
          )}
        </div>
        <div>
          <div>계약기간</div>
          <div></div>
        </div>
      </S.ModalInfoFlexBox>
    </div>
  );
};

export default ProjectDetailModal;
