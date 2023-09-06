import React, { useEffect, useState } from "react";
import { S } from "../listOfFreelancersByStatusStyle";
import { IUser, Project, User } from "../../../../../Types";
import dayjs from "dayjs";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { useProjectStore } from "../../../../../zustand/useProjectStore";
import Modal from "../../../../../components/modal/Modal";
import ContractTerminationInfoModal from "./ContractTerminationInfoModal";
import OneTouchModal from "../../../../../components/home/freelancerMarket/freelancerList/oneTouchModal/OneTouchModal";

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

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

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
                        <S.Contact onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}>
                          <FiPhoneCall size={18} /> {user.contact.phone}
                        </S.Contact>
                      </S.ContactBox>
                      <S.ContactBox>
                        <S.Contact onClick={() => handleCopyClipBoard(`${user.contact.email}`)}>
                          <FiMail size={18} /> {user.contact.email}
                        </S.Contact>
                      </S.ContactBox>
                    </div>
                  </S.ContentContainer>
                  <S.Line />
                  <S.ProjectTitle>
                    {freelancerCounts[user.userId] || 0}건의 함께 했던 프로젝트
                  </S.ProjectTitle>
                  <S.ProjectSubTitle>{project.title}</S.ProjectSubTitle>
                  <S.ProjectDate>
                    {dayjs(project.date?.startDate as string).format("YYMMDD")}{" "}
                    <S.DateInnerText>부터</S.DateInnerText>{" "}
                    {dayjs(project.date?.endDate as string).format("YYMMDD")}
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
                          <S.ModalInnerBtn onClick={handleSuggestingAgainBtnClick}>
                            프로젝트 다시 제안하기
                          </S.ModalInnerBtn>
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
                          <S.ModalInnerBtn
                            onClick={handleProjectSuggestingBtnClick}
                            disabled={
                              !selectedProject?.title ||
                              !(projectDataForSuggestions && projectDataForSuggestions.length > 0)
                            }
                          >
                            {selectedProject?.title} 제안하기
                          </S.ModalInnerBtn>
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
