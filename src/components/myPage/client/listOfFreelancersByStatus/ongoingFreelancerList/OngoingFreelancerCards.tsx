import React, { useState } from "react";
import { S } from "../listOfFreelancersByStatusStyle";
import Modal from "../../../../../components/modal/Modal";
import OngoingFreelancerInfoModal from "./OngoingFreelancerInfoModal";
import dayjs from "dayjs";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { IUser, Project, User } from "../../../../../Types";

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
                    <FiPhoneCall size={20} />
                    <S.Contact>{user.contact.phone}</S.Contact>
                  </S.ContactBox>
                  <S.ContactBox>
                    <FiMail size={20} />
                    <S.Contact>{user.contact.email}</S.Contact>
                  </S.ContactBox>
                </div>
              </S.ContentContainer>
              <S.Line />
              <S.ProjectTitle>진행중인 프로젝트</S.ProjectTitle>
              <S.ProjectSubTitle>{project.title}</S.ProjectSubTitle>
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
