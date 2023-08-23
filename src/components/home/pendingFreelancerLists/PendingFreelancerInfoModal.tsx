import React from "react";
import { IUser } from "src/Types";
import { S } from "../applicantFreelancerList/applicantFreelancerInfoModalStyle";
import FreelancerProfile from "src/components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "src/components/modal/freelancerInfo/FreelancerResume";
import FreelancerPortfolio from "src/components/modal/freelancerInfo/FreelancerPortfolio";

interface PendingFreelancerInfoModalProps {
  user: IUser;
}

const PendingFreelancerInfoModal = ({ user }: PendingFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{user.title} 프로젝트에 지원</S.ModalTitle>
      <FreelancerProfile user={user} />
      <S.ProjectConditions>
        <div style={{ width: "100%" }}>
          <S.ProjectConditionTitle>목표 기간</S.ProjectConditionTitle>
          <S.ProjectDeadLineBox>
            <span>{user.deadLine?.toLocaleString()}</span>
          </S.ProjectDeadLineBox>
        </div>
        <div style={{ width: "100%", marginLeft: "3.75rem" }}>
          <S.ProjectConditionTitle>급여</S.ProjectConditionTitle>
          <S.ProjectPayBox>
            <S.ProjectPayContent>
              <span>최소 : {user.pay?.min}만원</span>
              <span>최대 : {user.pay?.max}만원</span>
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
