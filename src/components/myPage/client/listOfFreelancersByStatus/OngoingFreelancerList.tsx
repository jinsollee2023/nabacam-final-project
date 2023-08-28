import React, { useState } from "react";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { S } from "./listOfFreelancersByStatusStyle";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IUser } from "src/Types";
import Modal from "src/components/modal/Modal";
import OngoingFreelancerInfoModal from "./OngoingFreelancerInfoModal";
import dayjs from "dayjs";

const OngoingFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const { ongoingProjectsWithFreelancers } = useProjectsQueries({ currentUserId: userId });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log("현재 로그인된 클라이언트의 진행중인 프로젝트 정보", ongoingProjectsWithFreelancers);

  if (!ongoingProjectsWithFreelancers) {
    return <div>진행중인 프로젝트가 없습니다.</div>;
  }

  return (
    <>
      <S.listContainer>
        {ongoingProjectsWithFreelancers.map((project) => (
          <S.ListsBox key={`${project.projectId}-${project.freelancer.userId}`}>
            <S.Profile>
              <S.ProfileContent>
                {project.freelancer instanceof Promise ? (
                  <p>Loading freelancer data...</p>
                ) : (
                  <>
                    <S.ContentContainer>
                      <div>
                        <S.ProfileContents>
                          <S.Name>{project.freelancer.name}</S.Name>

                          <S.WorkField>{project.freelancer.workField?.workField}</S.WorkField>
                          <S.WorkSmallFieldAndWorkExp>
                            {project.freelancer.workField?.workSmallField}{" "}
                            {project.freelancer.workExp}년차
                          </S.WorkSmallFieldAndWorkExp>
                        </S.ProfileContents>
                        <S.ContactBox>
                          <span>
                            <BsTelephoneFill />
                            {project.freelancer.contact.phone}
                          </span>
                          <span>
                            <MdEmail />
                            {project.freelancer.contact.email}
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
                        setSelectedFreelancer(project.freelancer);
                        setIsModalOpen(!isModalOpen);
                      }}
                    >
                      자세히 보기
                    </S.DetailBtn>
                    {isModalOpen &&
                    selectedFreelancer &&
                    selectedFreelancer.userId === project.freelancer.userId ? (
                      <Modal setIsModalOpen={setIsModalOpen}>
                        <OngoingFreelancerInfoModal user={project.freelancer} project={project} />
                      </Modal>
                    ) : null}
                  </>
                )}
              </S.ProfileContent>
            </S.Profile>
          </S.ListsBox>
        ))}
      </S.listContainer>
    </>
  );
};

export default OngoingFreelancerList;
