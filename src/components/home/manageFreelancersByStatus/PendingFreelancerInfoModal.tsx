import React from "react";
import { Project, User } from "../../../Types";
import { S } from "./freelancersByStatusInfoModalStyle";
import FreelancerProfile from "../../../components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "../../../components/modal/freelancerInfo/FreelancerResume";
import FreelancerPortfolio from "../../../components/modal/freelancerInfo/FreelancerPortfolio";

interface PendingFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const PendingFreelancerInfoModal = ({
  user,
  project,
}: PendingFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>보류한 프리랜서</S.ModalTitle>
      <FreelancerProfile user={user} />
      <hr />
      <S.ProjectConditions>
        <div style={{ width: "100%" }}>
          <S.ProjectConditionTitle>목표 기간</S.ProjectConditionTitle>
          <S.ProjectDeadLineBox>
            <span>{project.date?.endDate.toLocaleString()}</span>
          </S.ProjectDeadLineBox>
        </div>
        <div style={{ width: "100%", marginLeft: "3.75rem" }}>
          <S.ProjectConditionTitle>급여</S.ProjectConditionTitle>
          <S.ProjectPayBox>
            <S.ProjectPayContent>
              {project.pay?.min === "상의 후 결정" &&
              project.pay?.max === "상의 후 결정" ? (
                <span>상의 후 결정</span>
              ) : (
                <>
                  <span>최소 : {project.pay?.min}만원</span>
                  <span>최대 : {project.pay?.max}만원</span>
                </>
              )}
            </S.ProjectPayContent>
          </S.ProjectPayBox>
        </div>
      </S.ProjectConditions>

      <div>
        <FreelancerResume user={user} />
        <FreelancerPortfolio user={user} />
      </div>
    </>
  );
};

export default PendingFreelancerInfoModal;
