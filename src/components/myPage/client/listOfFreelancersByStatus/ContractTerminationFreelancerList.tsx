import React, { useState } from "react";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { S } from "./listOfFreelancersByStatusStyle";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import Modal from "src/components/modal/Modal";
import ContractTerminationInfoModal from "./ContractTerminationInfoModal";
import { IUser } from "src/Types";
import dayjs from "dayjs";
import OneTouchModal from "src/components/home/freelancerMarket/freelancerList/oneTouchModal/OneTouchModal";
import { useProjectStore } from "src/zustand/useProjectStore";

const ContractTerminationFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const { selectedProject, setSelectedProject } = useProjectStore();
  const { terminationedProjectsWithFreelancers, projectDataForSuggestions } = useProjectsQueries({
    currentUserId: userId,
    selectedProject,
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSuggestingAgainModalOpen, setIsSuggestingAgainModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);
  const [isLastFirst, setIsLastFirst] = useState(true);

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log(
  //   "현재 로그인된 클라이언트의 진행 완료된 프로젝트 정보",
  //   terminationedProjectsWithFreelancers
  // );

  if (!terminationedProjectsWithFreelancers) {
    return <div>계약이 끝난 프로젝트가 없습니다.</div>;
  }

  const handleSortToggle = () => {
    setIsLastFirst(!isLastFirst);
  };

  const handleSuggestingAgainBtnClick = () => {
    setIsDetailModalOpen(false);
    setIsSuggestingAgainModalOpen(true);
  };

  return (
    <>
      <S.FilterBtn onClick={handleSortToggle}>
        {isLastFirst ? "최신순" : "오래된 순"}
        <LuArrowUpDown />
      </S.FilterBtn>
      <S.listContainer>
        {terminationedProjectsWithFreelancers
          .slice()
          .sort((a, b) =>
            isLastFirst
              ? new Date(b.date.endDate).getTime() - new Date(a.date.endDate).getTime()
              : new Date(a.date.endDate).getTime() - new Date(b.date.endDate).getTime()
          )
          .map((project) => (
            <S.ListsBox key={project.projectId}>
              <S.Profile>
                <S.ProfileContent>
                  {project.freelancer instanceof Promise ? (
                    <p>Loading freelancer data...</p>
                  ) : (
                    <>
                      {project.freelancer ? (
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
                          <S.OngoingProject>진행했던 프로젝트</S.OngoingProject>
                          <S.ProjectTitle>{project.title}</S.ProjectTitle>
                          <S.ProjectDate>
                            {dayjs(project.date.startDate).format("YYMMDD")} 부터{" "}
                            {dayjs(project.date.endDate).format("YYMMDD")}
                          </S.ProjectDate>

                          <S.DetailBtn
                            onClick={() => {
                              setSelectedFreelancer(project.freelancer);
                              setIsDetailModalOpen(!isDetailModalOpen);
                            }}
                          >
                            자세히 보기
                          </S.DetailBtn>
                          {isDetailModalOpen &&
                          selectedFreelancer &&
                          selectedFreelancer.userId === project.freelancer.userId ? (
                            <Modal
                              setIsModalOpen={setIsDetailModalOpen}
                              buttons={
                                <>
                                  <S.DetailBtn onClick={handleSuggestingAgainBtnClick}>
                                    프로젝트 다시 제안하기
                                  </S.DetailBtn>
                                </>
                              }
                            >
                              <ContractTerminationInfoModal
                                user={project.freelancer}
                                project={project}
                              />
                            </Modal>
                          ) : null}
                          {isSuggestingAgainModalOpen &&
                          selectedFreelancer &&
                          selectedFreelancer.userId === project.freelancer.userId ? (
                            <Modal
                              setIsModalOpen={setIsSuggestingAgainModalOpen}
                              buttons={
                                <>
                                  <S.DetailBtn
                                    onClick={handleSuggestingAgainBtnClick}
                                    disabled={
                                      !selectedProject?.title ||
                                      !(
                                        projectDataForSuggestions &&
                                        projectDataForSuggestions.length > 0
                                      )
                                    }
                                  >
                                    {selectedProject?.title} 제안하기
                                  </S.DetailBtn>
                                </>
                              }
                            >
                              <OneTouchModal
                                user={project.freelancer}
                                projectLists={projectDataForSuggestions!}
                              />
                            </Modal>
                          ) : null}
                        </>
                      ) : (
                        <p>No freelancer data available.</p>
                      )}
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
export default ContractTerminationFreelancerList;
