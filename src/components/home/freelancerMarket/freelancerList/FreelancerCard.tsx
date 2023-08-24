import React, { useState, useEffect } from "react";
import { S } from "./freelancerList.styles";
import { useQuery } from "@tanstack/react-query";
import { getPortfolios } from "../../../../api/Portfolio";
import { FaHandshakeSimple } from "react-icons/fa6";
import { User } from "../../../../Types";
import { PortfolioIndexMap } from "./FreelancerList";
import { Button, Spin } from "antd";
import Modal from "src/components/modal/Modal";
import OneTouchModal from "./oneTouchModal/OneTouchModal";
import { useSelectProjectStore } from "src/zustand/useSelectProjectStore";
import supabase from "src/config/supabaseClient";
import { getProjects } from "src/api/Project";
import { useUserStore } from "src/zustand/useUserStore";
import FreelancerInfoModal from "./freelancerInfoModal/FreelancerInfoModal";
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
  const { selectedProjectId, setSelectedProjectId } = useSelectProjectStore();
  const { selectedProjectTitle, setSelectedProjectTitle } =
    useSelectProjectStore();

  useEffect(() => {
    if (!isDetailModalOpen) {
      setSelectedProjectTitle(null);
      setSelectedProjectId(null);
    }
  }, [isDetailModalOpen, setSelectedProjectId, setSelectedProjectTitle]);

  const {
    data: portfoliosData,
    error: portfoliosError,
    isLoading: portfoliosIsLoading,
  } = useQuery(["portfoliosData"], getPortfolios, {
    enabled: !!freelancerItem,
  });

  const {
    data: projectLists,
    isLoading: projectListsIsLoading,
    isError: projectListsIsError,
    refetch: refetchProjectLists,
  } = useQuery(
    ["currentClientprojectLists", freelancerItem.userId],
    () => getProjects(),
    {
      enabled: !!userId,
      select: (projectLists) =>
        projectLists?.filter(
          (projectList) =>
            projectList.clientId === userId &&
            projectList.status === "진행 전" &&
            !projectList.SuggestedFreelancers?.includes(freelancerItem.userId)
        ),
    }
  );
  console.log("projectListsIsLoading", projectListsIsLoading);
  console.log("projectListsIsError", projectListsIsError);
  console.log("projectLists", projectLists);

  if (projectListsIsLoading) {
    return (
      <>
        <div>hi</div>
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
  if (projectListsIsError) {
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
      .match({ projectId: selectedProjectId })
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
      .match({ projectId: selectedProjectId });

    if (updateError) {
      console.error("프로젝트 업데이트 오류:", updateError);
      return;
    }
    refetchProjectLists();
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
                  !selectedProjectTitle ||
                  !(projectLists && projectLists.length > 0)
                }
              >
                {selectedProjectTitle} 제안하기
              </Button>
            </>
          }
        >
          <OneTouchModal user={freelancerItem} projectLists={projectLists} />
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
                  isSelected={
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
          <S.FreelancerContentBox onClick={() => setIsInfoModalOpen(!isInfoModalOpen)}>
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
                  <S.FreelancerInfoModalBtn onClick={handleInfoModalProposalBtnClick}>
                    제안하기
                  </S.FreelancerInfoModalBtn>
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
