import React, { useEffect, useState } from "react";
import { S } from "../listOfFreelancersByStatusStyle";
import { IUser, Project, User } from "src/Types";
import dayjs from "dayjs";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { useProjectStore } from "src/zustand/useProjectStore";
import Modal from "src/components/modal/Modal";
import ContractTerminationInfoModal from "./ContractTerminationInfoModal";
import OneTouchModal from "src/components/home/freelancerMarket/freelancerList/oneTouchModal/OneTouchModal";

interface ContractTerminationFreelancerCardsProps {
  user: User;
  project: Project;
}

const ContractTerminationFreelancerCards = ({
  user,
  project,
}: ContractTerminationFreelancerCardsProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSuggestingAgainModalOpen, setIsSuggestingAgainModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);
  const { userId } = useUserStore();
  const { selectedProject, setSelectedProject } = useProjectStore();
  const {
    projectDataForSuggestions,
    suggestedFreelancersData,
    updateSuggestedFreelancersDataMutation,
    refetchprojectDataForSuggestions,
    terminationedProjectsWithFreelancers,
  } = useProjectsQueries({
    currentUserId: userId,
    selectedProject,
    freelancerId: project.freelancerId,
  });

  useEffect(() => {
    if (!isSuggestingAgainModalOpen) {
      setSelectedProject(null);
    }
  }, [isSuggestingAgainModalOpen, setSelectedProject]);

  const handleSuggestingAgainBtnClick = () => {
    setIsDetailModalOpen(false);
    setIsSuggestingAgainModalOpen(true);
  };

  const handleProjectSuggestingBtnClick = () => {
    const suggestedFreelancers = suggestedFreelancersData?.SuggestedFreelancers || [];
    const updatedSuggestedFreelancers = [...(suggestedFreelancers as string[]), user.userId];
    updateSuggestedFreelancersDataMutation.mutate({
      projectId: selectedProject?.projectId as string,
      updatedSuggestedFreelancers,
    });
    refetchprojectDataForSuggestions();
    setIsSuggestingAgainModalOpen(false);
    alert("프로젝트 제안이 완료 되었습니다.");
  };

  // 프리랜서 아이디별 개수를 세기 위한 객체
  const freelancerCounts: Record<string, number> = {};

  terminationedProjectsWithFreelancers?.forEach((project) => {
    const freelancerId = project.freelancerId as string;

    if (!freelancerCounts[freelancerId]) {
      freelancerCounts[freelancerId] = 1;
    } else {
      freelancerCounts[freelancerId]++;
    }
  });

  return (
    <>
      <S.Profile>
        <S.ProfileContent>
          {user instanceof Promise ? (
            <p>Loading freelancer data...</p>
          ) : (
            <>
              {user ? (
                <>
                  <S.ContentContainer>
                    <div>
                      <S.ProfileContents>
                        <S.Name>{user.name}</S.Name>
                        <S.WorkField>{user.workField?.workField}</S.WorkField>

                        <S.WorkSmallFieldAndWorkExp>
                          {user.workField?.workSmallField} {user.workExp}년차
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
                  <S.OngoingProject>
                    {freelancerCounts[user.userId] || 0}건의 함께 했던 프로젝트
                  </S.OngoingProject>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                  <S.ProjectDate>
                    {dayjs(project.date.startDate).format("YYMMDD")}{" "}
                    <S.DateInnerText>부터</S.DateInnerText>{" "}
                    {dayjs(project.date.endDate).format("YYMMDD")}
                  </S.ProjectDate>

                  <S.DetailBtn
                    onClick={() => {
                      setSelectedFreelancer(user);
                      setIsDetailModalOpen(!isDetailModalOpen);
                    }}
                  >
                    자세히 보기
                  </S.DetailBtn>
                  {isDetailModalOpen &&
                  selectedFreelancer &&
                  selectedFreelancer.userId === user.userId ? (
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
                      <ContractTerminationInfoModal user={user} project={project} />
                    </Modal>
                  ) : null}
                  {isSuggestingAgainModalOpen &&
                  selectedFreelancer &&
                  selectedFreelancer.userId === user.userId ? (
                    <Modal
                      setIsModalOpen={setIsSuggestingAgainModalOpen}
                      buttons={
                        <>
                          <S.DetailBtn
                            onClick={handleProjectSuggestingBtnClick}
                            disabled={
                              !selectedProject?.title ||
                              !(projectDataForSuggestions && projectDataForSuggestions.length > 0)
                            }
                          >
                            {selectedProject?.title} 제안하기
                          </S.DetailBtn>
                        </>
                      }
                    >
                      <OneTouchModal user={user} projectLists={projectDataForSuggestions!} />
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
    </>
  );
};

export default ContractTerminationFreelancerCards;
