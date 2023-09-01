import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import useFreelancersQueries from "src/hooks/useFreelancersQueries";
import S from "./ProjectListStyles";
import { FreelancerInfo, ProjectDetailModalProps } from "./ProjectDetailModal";
import { Project } from "src/Types";

interface ProjectVolunteeredFreelancerProfileProps {
  volunteeredFreelancer: FreelancerInfo | null;
  project: Project;
}

const ProjectVolunteeredFreelancerProfile = ({
  volunteeredFreelancer,
  project,
}: ProjectVolunteeredFreelancerProfileProps) => {
  return (
    <S.ModalInfoFlexBox>
      <div>
        {project.volunteer && project.volunteer.length > 0 ? (
          <S.ModalInfoFlexBox>
            <img
              src={volunteeredFreelancer?.photoURL}
              width="160px"
              height="160px"
              alt="img"
            />
            <S.ModalInfoColumnBox>
              <S.ModalDetail marginBottom="3px">
                {volunteeredFreelancer?.name}
              </S.ModalDetail>
              <S.ModalDetail marginBottom="3px">
                {volunteeredFreelancer?.workField.workSmallField}
              </S.ModalDetail>
              <S.ModalDetail marginBottom="3px">
                {volunteeredFreelancer?.resumeProfileIntro}
              </S.ModalDetail>
              <S.ModalDetail
                marginBottom="3px"
                style={{ display: "flex", alignItems: "center" }}
              >
                <BiPhoneCall />
                {volunteeredFreelancer?.contact.phone}
              </S.ModalDetail>
              <S.ModalDetail
                marginBottom="3px"
                style={{ display: "flex", alignItems: "center" }}
              >
                <AiOutlineMail />
                {volunteeredFreelancer?.contact.email}
              </S.ModalDetail>
            </S.ModalInfoColumnBox>
          </S.ModalInfoFlexBox>
        ) : null}
      </div>
    </S.ModalInfoFlexBox>
  );
};

export default ProjectVolunteeredFreelancerProfile;
