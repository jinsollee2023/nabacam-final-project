import React, { useState, useEffect } from "react";
import { S } from "./freelancerList.styles";
import { FaHandshakeSimple } from "react-icons/fa6";
import { User } from "../../../../Types";
import { PortfolioIndexMap } from "./FreelancerList";
import { Button, Spin } from "antd";
import Modal from "src/components/modal/Modal";
import OneTouchModal from "./oneTouchModal/OneTouchModal";
import supabase from "src/config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";
import FreelancerInfoModal from "./freelancerInfoModal/FreelancerInfoModal";
import { useSelectProjectStore } from "src/zustand/useProjectStore";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useUserStore();
  const { selectedProject, setSelectedProject } = useSelectProjectStore();

  useEffect(() => {
    if (!isDetailModalOpen) {
      setSelectedProject(null);
    }
  }, [isDetailModalOpen, setSelectedProject]);

  const { portfoliosData, portfoliosError, portfoliosIsLoading } =
    usePortfoliosQueries(freelancerItem);

  const {
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
  } = useProjectsQueries({
    currentUserId: userId,
    freelancerId: freelancerItem.userId,
  });
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
    return <span>freelancers Error..</span>;
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
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("SuggestedFreelancers")
      .match({ projectId: selectedProject?.projectId })
      .single();

    if (projectError) {
      console.error("프로젝트 정보 가져오기 오류:", projectError);
      return;
    }

    const suggestedFreelancers = projectData.SuggestedFreelancers || [];
    const updatedSuggestedFreelancers = [
      ...suggestedFreelancers,
      freelancerItem.userId,
    ];

    const { error: updateError } = await supabase
      .from("projects")
      .update({ SuggestedFreelancers: updatedSuggestedFreelancers })
      .match({ projectId: selectedProject?.projectId });

    if (updateError) {
      console.error("프로젝트 업데이트 오류:", updateError);
      return;
    }
    refetchprojectDataForSuggestions();
    setIsDetailModalOpen(false);
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
          <S.PortfolioList>
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
          </S.PortfolioList>
        )}

        <S.MiniProfileBox>
          <S.FreelancerContentBox onClick={() => setIsModalOpen(!isModalOpen)}>
            <S.FreelancerName>{freelancerItem.name}</S.FreelancerName>
            <S.FreelancerContent>
              {freelancerItem.workField?.workSmallField}
            </S.FreelancerContent>
            <S.FreelancerContent>
              {String(freelancerItem.workExp)}년차
            </S.FreelancerContent>
          </S.FreelancerContentBox>
          {isModalOpen && (
            <Modal
              setIsModalOpen={setIsModalOpen}
              buttons={
                <>
                  <S.FreelancerInfoModalBtn>제안하기</S.FreelancerInfoModalBtn>
                  <S.FreelancerInfoModalBtn>보류하기</S.FreelancerInfoModalBtn>
                </>
              }
            >
              <FreelancerInfoModal user={freelancerItem} />
            </Modal>
          )}

          <S.SuggestButton onClick={() => setIsDetailModalOpen(true)}>
            <FaHandshakeSimple size="25" />
          </S.SuggestButton>
        </S.MiniProfileBox>
      </S.FreelancerList>
    </>
  );
};

export default FreelancerCard;
