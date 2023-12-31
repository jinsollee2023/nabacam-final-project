import { useEffect, useState } from "react";
import { S } from "./listOfFreelancersByStatus.styles";
import { IUser, Project, User } from "../../../../Types";
import dayjs from "dayjs";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { useUserStore } from "../../../../store/useUserStore";
import { useProjectStore } from "../../../../store/useProjectStore";
import Modal from "../../../modal/Modal";
import ContractTerminationInfoModal from "./ContractTerminationInfoModal";
import OneTouchModal from "../../../home/freelancerMarket/freelancerList/OneTouchModal";
import { toast } from "react-toastify";
import useTerminationedProjectsQueries from "src/hooks/queries/useTerminationedProjectsQueries";
import useProjectByClientWithBeforeProgressQueries from "src/hooks/queries/useProjectByClientWithBeforeProgressQueries";
import useSuggestedFreelancersQueries from "src/hooks/queries/useSuggestedFreelancersQueries";

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
  const { suggestedFreelancersData, updateSuggestedFreelancersDataMutation } =
    useSuggestedFreelancersQueries({
      currentUserId: userId,
      selectedProject,
      freelancerId: project.freelancerId,
    });

  const { projectDataForSuggestions, refetchprojectDataForSuggestions } =
    useProjectByClientWithBeforeProgressQueries({
      currentUserId: userId,
      selectedProject,
      freelancerId: project.freelancerId as string,
    });

  const { freelancersWithTerminatedProjects } = useTerminationedProjectsQueries({
    currentUserId: userId,
    freelancerId: project.freelancerId,
  });

  useEffect(() => {
    if (!isSuggestingAgainModalOpen) {
      setSelectedProject(null);
    }
  }, [isSuggestingAgainModalOpen, setSelectedProject]);

  // 계약이 끝난 프리랜서 -> 상세 모달 -> 프로젝트 다시 제안하기 모달 버튼
  const handleSuggestingAgainButtonClick = () => {
    setIsDetailModalOpen(false);
    setIsSuggestingAgainModalOpen(true);
  };

  // 계약이 끝난 프리랜서 -> 상세 모달 -> 프로젝트 다시 제안하기 -> 제안하기 모달 버튼
  const handleProjectSuggestingButtonClick = () => {
    const suggestedFreelancers = suggestedFreelancersData?.SuggestedFreelancers || [];
    const updatedSuggestedFreelancers = [...(suggestedFreelancers as string[]), user.userId];
    updateSuggestedFreelancersDataMutation.mutate({
      projectId: selectedProject?.projectId as string,
      updatedSuggestedFreelancers,
    });
    refetchprojectDataForSuggestions();
    setIsSuggestingAgainModalOpen(false);
    toast.success("프로젝트 제안이 완료 되었습니다.");
  };

  // 프리랜서 아이디별 진행 완료된 프로젝트 개수를 세기 위한 객체
  const freelancerCounts: Record<string, number> = {};

  freelancersWithTerminatedProjects?.pages.map((page) => {
    return page.projects.forEach((project) => {
      const freelancerId = project.freelancerId as string;

      if (!freelancerCounts[freelancerId]) {
        freelancerCounts[freelancerId] = 1;
      } else {
        freelancerCounts[freelancerId]++;
      }
    });
  });

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <S.Profile>
        <S.ProfileContent>
          {user ? (
            <>
              <S.ContentContainer>
                <div>
                  <S.ProfileContents>
                    <S.NameAndWorkFieldWrapper>
                      <S.Name>{user.name}</S.Name>
                      <S.WorkField>{user.workField?.workField}</S.WorkField>
                    </S.NameAndWorkFieldWrapper>
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

              <S.DetailButton
                onClick={() => {
                  setSelectedFreelancer(user);
                  setIsDetailModalOpen(!isDetailModalOpen);
                }}
              >
                자세히 보기
              </S.DetailButton>
              {isDetailModalOpen &&
              selectedFreelancer &&
              selectedFreelancer.userId === user.userId ? (
                <Modal
                  setIsModalOpen={setIsDetailModalOpen}
                  buttons={
                    <>
                      <S.ModalInnerButton onClick={handleSuggestingAgainButtonClick}>
                        프로젝트 다시 제안하기
                      </S.ModalInnerButton>
                    </>
                  }
                >
                  <ContractTerminationInfoModal user={user} />
                </Modal>
              ) : null}
              {isSuggestingAgainModalOpen &&
              selectedFreelancer &&
              selectedFreelancer.userId === user.userId ? (
                <Modal
                  setIsModalOpen={setIsSuggestingAgainModalOpen}
                  buttons={
                    <>
                      <S.ModalInnerButton
                        onClick={handleProjectSuggestingButtonClick}
                        disabled={
                          !selectedProject?.title ||
                          !(projectDataForSuggestions && projectDataForSuggestions.length > 0)
                        }
                      >
                        {selectedProject?.title} 제안하기
                      </S.ModalInnerButton>
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
        </S.ProfileContent>
      </S.Profile>
    </>
  );
};

export default ContractTerminationFreelancerCards;
