import React, { useState } from "react";
import { S } from "../listOfFreelancersByStatusStyle";
import Modal from "src/components/modal/Modal";
import OngoingFreelancerInfoModal from "./OngoingFreelancerInfoModal";
import dayjs from "dayjs";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useUserStore } from "src/zustand/useUserStore";
import { IUser, Project, User } from "src/Types";

interface OngoingFreelancerCardsProps {
  user: User;
  project: Project;
}

const OngoingFreelancerCards = ({ user, project }: OngoingFreelancerCardsProps) => {
  const { userId } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  return (
    <>
      <S.Profile>
        <S.ProfileContent>
          {user instanceof Promise ? (
            <p>Loading freelancer data...</p>
          ) : (
            <>
              <S.ContentContainer>
                <div>
                  <S.ProfileContents>
                    <S.Name>{user.name}</S.Name>

                    <S.WorkField>{user.workField?.workField}</S.WorkField>
                    <S.WorkSmallFieldAndWorkExp>
                      {user.workField?.workSmallField} {user.workExp}
                      년차
                    </S.WorkSmallFieldAndWorkExp>
                  </S.ProfileContents>
                  <S.ContactBox>
                    <span>
                      <BsTelephoneFill />
                      {user.contact.phone}
                    </span>
                    <span>
                      <MdEmail />
                      {user.contact.email}
                    </span>
                  </S.ContactBox>
                </div>
              </S.ContentContainer>
              <S.Line />
              <S.OngoingProject>진행중인 프로젝트</S.OngoingProject>
              <S.ProjectTitle>{project.title}</S.ProjectTitle>
              <S.ProjectDate>
                {dayjs(project.date.startDate).format("YYMMDD")}{" "}
                <S.DateInnerText>부터</S.DateInnerText>{" "}
                {dayjs(project.date.endDate).format("YYMMDD")}
              </S.ProjectDate>
              <S.DetailBtn
                onClick={() => {
                  setSelectedFreelancer(user);
                  setIsModalOpen(!isModalOpen);
                }}
              >
                자세히 보기
              </S.DetailBtn>
              {isModalOpen && selectedFreelancer && selectedFreelancer.userId === user.userId ? (
                <Modal setIsModalOpen={setIsModalOpen}>
                  <OngoingFreelancerInfoModal user={user} project={project} />
                </Modal>
              ) : null}
            </>
          )}
        </S.ProfileContent>
      </S.Profile>
    </>
  );
};

export default OngoingFreelancerCards;
