import React, { useState, useEffect } from "react";
import { S } from "./freelancerList.styles";
import { FaHandshakeSimple } from "react-icons/fa6";
import { User } from "../../../../Types";
import { PortfolioIndexMap } from "./FreelancerList";
import { Button, Spin } from "antd";
import Modal from "src/components/modal/Modal";
import OneTouchModal from "./oneTouchModal/OneTouchModal";
import { useUserStore } from "src/zustand/useUserStore";
import FreelancerInfoModal from "./freelancerInfoModal/FreelancerInfoModal";
import { useProjectStore } from "src/zustand/useProjectStore";
import usePortfoliosQueries from "src/hooks/usePortfoliosQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";

interface FreelancerCardProps {
  freelancerItem: User;
  selectedPortfolioIndex: PortfolioIndexMap;
  setSelectedPortfolioIndex: React.Dispatch<
    React.SetStateAction<PortfolioIndexMap>
  >;
}
const FreelancerCard = ({
  freelancerItem,
  selectedPortfolioIndex,
  setSelectedPortfolioIndex,
}: FreelancerCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { userId } = useUserStore();
  const { selectedProject, setSelectedProject } = useProjectStore();
  const {
    updateSuggestedFreelancersDataMutation,
    suggestedFreelancersData,
    suggestedFreelancersDataIsLoading,
    suggestedFreelancersDataIsError,
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
  } = useProjectsQueries({
    currentUserId: userId,
    selectedProject,
    freelancerId: freelancerItem.userId,
  });
  useEffect(() => {
    if (!isDetailModalOpen) {
      setSelectedProject(null);
    }
  }, [isDetailModalOpen, setSelectedProject]);

  // 프리랜서 마켓에 들어가는 포트폴리오 목록 가져오기
  const { portfoliosData, portfoliosError, portfoliosIsLoading } =
    usePortfoliosQueries(freelancerItem);

  if (projectDataForSuggestionsIsLoading) {
    return (
      <>
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "999999",
          }}
        />
      </>
    );
  }
  if (projectDataForSuggestionsIsError) {
    return <span>project loading Error..</span>;
  }
  if (portfoliosIsLoading) {
    return (
      <Spin
        size="large"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }
  if (portfoliosError) {
    return <span>portfolios Error..</span>;
  }
  const HandleProjectSuggestionButtonClick = async () => {
    if (suggestedFreelancersDataIsLoading) {
      <Spin
        size="large"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />;
    }
    if (suggestedFreelancersDataIsError) {
      console.error(
        "프로젝트 정보 가져오기 오류:",
        suggestedFreelancersDataIsError
      );
      return;
    }
    const suggestedFreelancers =
      suggestedFreelancersData?.SuggestedFreelancers || [];

    // 새롭게 제안한 프리랜서 추가
    const updatedSuggestedFreelancers = [
      ...(suggestedFreelancers as string[]),
      freelancerItem.userId,
    ];

    // 새롭게 제안한 프리랜서 추가 후 업데이트를 위한 코드
    updateSuggestedFreelancersDataMutation.mutate({
      projectId: selectedProject?.projectId as string,
      updatedSuggestedFreelancers,
    });
    refetchprojectDataForSuggestions();
    setIsDetailModalOpen(false);
  };

  const handleInfoModalProposalBtnClick = () => {
    setIsInfoModalOpen(false);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <Button
                type="primary"
                block
                onClick={HandleProjectSuggestionButtonClick}
                disabled={
                  !selectedProject?.title ||
                  !(
                    projectDataForSuggestions &&
                    projectDataForSuggestions.length > 0
                  )
                }
              >
                {selectedProject?.title} 제안하기
              </Button>
            </>
          }
        >
          <OneTouchModal
            user={freelancerItem}
            projectLists={projectDataForSuggestions!}
          />
        </Modal>
      )}
      <S.FreelancerList>
        {portfoliosData && (
          <>
            {portfoliosData
              .filter(
                (portfolioItem) =>
                  portfolioItem.freelancerId === freelancerItem.userId
              )
              .map((filteredPortfolio, portfolioIndex) => (
                <S.PortfolioItem
                  key={filteredPortfolio.portfolioId}
                  isselected={
                    selectedPortfolioIndex[freelancerItem.userId] ===
                    portfolioIndex
                  }
                >
                  <S.PortfoliothumbNailImageBox>
                    <img
                      src={filteredPortfolio.thumbNailURL}
                      alt="thumbnailImage"
                    />
                    <S.indicatorWrapper>
                      {portfoliosData
                        .filter(
                          (portfolioItem) =>
                            portfolioItem.freelancerId === freelancerItem.userId
                        )
                        .map((_, index) => (
                          <S.Indicator
                            key={index}
                            selected={
                              selectedPortfolioIndex[freelancerItem.userId] ===
                              index
                            }
                            onClick={() =>
                              setSelectedPortfolioIndex((prevSelected) => ({
                                ...prevSelected,
                                [freelancerItem.userId]: index,
                              }))
                            }
                          />
                        ))}
                    </S.indicatorWrapper>
                  </S.PortfoliothumbNailImageBox>
                  <S.PortfolioTitleBox>
                    <S.PortfolioTitle>
                      {filteredPortfolio.title}
                    </S.PortfolioTitle>
                  </S.PortfolioTitleBox>
                </S.PortfolioItem>
              ))}
            {/* 해당 조건을 만족하지 않는 경우에만 jsx 부분 표시 */}
            {/* some → 주어진 판별 함수를 적오도 하나라도 통과하는지 테스트 결국 조건문과 같다면 결국 여기서는
                      포트폴리오들의 프리랜서 아이디 중에서 내가 지금 돌고있는 프리랜서의 아이디와 일치하는 것이 없다면 아래 jsx를 보여줌*/}
            {!portfoliosData.some(
              (portfolioItem) =>
                portfolioItem.freelancerId === freelancerItem.userId
            ) && (
              <li>
                <S.PortfoliothumbNailImageBox>
                  <img
                    src="https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-portfolio-thumbnail/default-portfolio-thumbnail.png"
                    alt="default-thumbnailImage"
                  />
                </S.PortfoliothumbNailImageBox>
                <S.PortfolioTitleBox>
                  <S.PortfolioTitle>
                    등록된 포트폴리오가 없습니다.
                  </S.PortfolioTitle>
                </S.PortfolioTitleBox>
              </li>
            )}
          </>
        )}
        <S.MiniProfileBox>
          <S.FreelancerContentBox
            onClick={() => setIsInfoModalOpen(!isInfoModalOpen)}
          >
            <S.FreelancerName>{freelancerItem.name}</S.FreelancerName>
            <S.FreelancerContent>
              {freelancerItem.workField?.workSmallField}
            </S.FreelancerContent>
            <S.FreelancerContent>
              {String(freelancerItem.workExp)}년차
            </S.FreelancerContent>
          </S.FreelancerContentBox>
          {isInfoModalOpen && (
            <Modal
              setIsModalOpen={setIsInfoModalOpen}
              buttons={
                <>
                  <S.FreelancerInfoModalBtn
                    onClick={handleInfoModalProposalBtnClick}
                  >
                    제안하기
                  </S.FreelancerInfoModalBtn>
                </>
              }
            >
              <FreelancerInfoModal user={freelancerItem} />
            </Modal>
          )}
          <S.SuggestButton onClick={() => setIsDetailModalOpen(true)}>
            <FaHandshakeSimple size="25" color="var(--main-blue)" />
          </S.SuggestButton>
        </S.MiniProfileBox>
      </S.FreelancerList>
    </>
  );
};
export default FreelancerCard;
