import React, { useState, useEffect } from "react";
import { S } from "./freelancerList.styles";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Portfolio, User } from "../../../../Types";
import { PortfolioIndexMap } from ".";
import { Button, Spin } from "antd";
import Modal from "src/components/modal/Modal";
import OneTouchModal from "./OneTouchModal";
import { useUserStore } from "src/store/useUserStore";
import FreelancerInfoModal from "./FreelancerInfoModal";
import { useProjectStore } from "src/store/useProjectStore";
import usePortfoliosQueries from "src/hooks/queries/usePortfoliosQueries";
import { toast } from "react-toastify";
import useProjectByClientWithBeforeProgressQueries from "src/hooks/queries/useProjectByClientWithBeforeProgressQueries";
import useSuggestedFreelancersQueries from "src/hooks/queries/useSuggestedFreelancersQueries";
import { usePortfolioStore } from "src/store/usePortfolioStore";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import supabase from "src/config/supabaseClient";
import { useRoomStore } from "src/store/useRoomStore";
import PortfolioDetailModal from "src/components/myPage/myProfile/portfolioTab/PortfolioDetailModal";
import { sendDM } from "src/components/common/commonFunc";

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
  const [isPortfolioDetailModalOpen, setIsPortfolioDetailModalOpen] =
    useState(false);
  const { setSelectedPortfolio } = usePortfolioStore();

  const navigate = useNavigate();
  const { setSelectedRoom, setCreatedRoomId, createdRoomId } = useRoomStore();
  const { user: client, userId } = useUserStore();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { selectedProject, setSelectedProject } = useProjectStore();
  const [userSelectedPortfolioIndex, setUserSelectedPortfolioIndex] =
    useState(0);
  const {
    updateSuggestedFreelancersDataMutation,
    suggestedFreelancersData,
    suggestedFreelancersDataIsLoading,
    suggestedFreelancersDataIsError,
  } = useSuggestedFreelancersQueries({
    currentUserId: userId,
    selectedProject,
    freelancerId: freelancerItem.userId,
  });

  const {
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
  } = useProjectByClientWithBeforeProgressQueries({
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

    toast.success("제안이 전달되었습니다.");

    const suggestedFreelancers =
      suggestedFreelancersData?.SuggestedFreelancers || [];

    const updatedSuggestedFreelancers = [
      ...(suggestedFreelancers as string[]),
      freelancerItem.userId,
    ];

    updateSuggestedFreelancersDataMutation.mutate({
      projectId: selectedProject?.projectId as string,
      updatedSuggestedFreelancers,
    });
    refetchprojectDataForSuggestions();
    setIsDetailModalOpen(false);
  };

  const handleInfoModalProposalButtonClick = () => {
    setIsInfoModalOpen(false);
    setIsDetailModalOpen(true);
  };

  const handleSuggestButtonClick = () => {
    if (projectDataForSuggestions?.length! >= 1) {
      setIsDetailModalOpen(true);
    } else if (projectDataForSuggestions?.length! === 0) {
      toast.error("해당 프리랜서에게 제안할 수 있는 프로젝트가 없습니다.");
    }
  };

  const numberOfPortfolios = portfoliosData?.filter(
    (portfolioItem) => portfolioItem.freelancerId === freelancerItem.userId
  ).length;

  const handlePortfolioImageClick = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsPortfolioDetailModalOpen(true);
  };

  //==========================================================//
  const sendDMHandler = () => {
    sendDM({
      DMfreelancerName: freelancerItem.name,
      DMclientName: client.name,
      DMfreelancerId: freelancerItem.userId,
      DMclientId: client.userId,
      navigate,
      setCreatedRoomId,
      setSelectedRoom,
    });
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
                style={{
                  backgroundColor:
                    !selectedProject?.title ||
                    !(
                      projectDataForSuggestions &&
                      projectDataForSuggestions.length > 0
                    )
                      ? "#f5f5f5"
                      : "var(--main-blue)",
                }}
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
      {isPortfolioDetailModalOpen && (
        <Modal setIsModalOpen={setIsPortfolioDetailModalOpen}>
          <PortfolioDetailModal userId={freelancerItem.userId} />
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
                  <S.PortfoliothumbNailImageBox
                    onClick={() => handlePortfolioImageClick(filteredPortfolio)}
                  >
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
                          />
                        ))}
                    </S.indicatorWrapper>
                  </S.PortfoliothumbNailImageBox>
                  <S.PortfolioTitleBox>
                    <S.ArrowIconWrapper>
                      {userSelectedPortfolioIndex !== 0 && (
                        <S.ArrowIconPrevBox>
                          <GrFormPrevious
                            size="25"
                            onClick={() => {
                              setUserSelectedPortfolioIndex(
                                userSelectedPortfolioIndex - 1
                              );
                              setSelectedPortfolioIndex((prevSelected) => {
                                const userSelectedPortfolioIndex = {
                                  ...prevSelected,
                                };
                                userSelectedPortfolioIndex[
                                  freelancerItem.userId
                                ] = userSelectedPortfolioIndex[
                                  freelancerItem.userId
                                ] -= 1;
                                return userSelectedPortfolioIndex;
                              });
                            }}
                          />
                        </S.ArrowIconPrevBox>
                      )}
                      {userSelectedPortfolioIndex !==
                        numberOfPortfolios! - 1 && (
                        <S.ArrowIconNextBox>
                          <GrFormNext
                            size="25"
                            onClick={() => {
                              setUserSelectedPortfolioIndex(
                                userSelectedPortfolioIndex + 1
                              );
                              setSelectedPortfolioIndex((prevSelected) => {
                                const userSelectedPortfolioIndex = {
                                  ...prevSelected,
                                };
                                userSelectedPortfolioIndex[
                                  freelancerItem.userId
                                ] = userSelectedPortfolioIndex[
                                  freelancerItem.userId
                                ] += 1;
                                return userSelectedPortfolioIndex;
                              });
                            }}
                          />
                        </S.ArrowIconNextBox>
                      )}
                    </S.ArrowIconWrapper>
                    <S.PortfolioTitle>
                      {filteredPortfolio.title}
                    </S.PortfolioTitle>
                  </S.PortfolioTitleBox>
                </S.PortfolioItem>
              ))}

            {!portfoliosData.some(
              (portfolioItem) =>
                portfolioItem.freelancerId === freelancerItem.userId
            ) && (
              <li>
                <S.PortfoliothumbNailImageBox
                  style={{ cursor: "default" }}
                  onClick={() => toast.error("등록된 포트폴리오가 없습니다.")}
                >
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
                  <S.FreelancerInfoModalButton onClick={sendDMHandler}>
                    문의하기
                  </S.FreelancerInfoModalButton>
                  <S.FreelancerInfoModalButton
                    onClick={handleInfoModalProposalButtonClick}
                  >
                    제안하기
                  </S.FreelancerInfoModalButton>
                </>
              }
            >
              <FreelancerInfoModal user={freelancerItem} />
            </Modal>
          )}
          <S.CardButtonWrapper>
            <S.SendDMButton onClick={sendDMHandler}>
              <HiOutlinePaperAirplane size="22" color="var(--main-blue)" />
            </S.SendDMButton>
            <S.SuggestButton onClick={handleSuggestButtonClick}>
              <FaHandshakeSimple size="25" color="var(--main-blue)" />
            </S.SuggestButton>
          </S.CardButtonWrapper>
        </S.MiniProfileBox>
      </S.FreelancerList>
    </>
  );
};
export default FreelancerCard;
