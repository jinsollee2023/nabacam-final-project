import React, { useState } from "react";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { S } from "./listOfFreelancersByStatusStyle";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Modal from "src/components/modal/Modal";
import ContractTerminationInfoModal from "./ContractTerminationInfoModal";
import { IUser } from "src/Types";

const ContractTerminationFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const { terminationedProjectsWithFreelancers } = useProjectsQueries({ currentUserId: userId });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log(
  //   "현재 로그인된 클라이언트의 진행 완료된 프로젝트 정보",
  //   terminationedProjectsWithFreelancers
  // );

  if (!terminationedProjectsWithFreelancers) {
    return <div>진행중인 프로젝트가 없습니다.</div>;
  }

  return (
    <>
      <div>계약이 끝난 프리랜서</div>
      <S.listContainer>
        {terminationedProjectsWithFreelancers.map((project) => (
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
                          <S.ImgBox>
                            <S.Img alt="profileImg" src={project.freelancer.photoURL} />
                          </S.ImgBox>
                          <div>
                            <S.ProfileContents>
                              <S.Name>{project.freelancer.name}</S.Name>
                              <S.WorkField>{project.freelancer.workField?.workField}</S.WorkField>

                              <S.WorkSmallField>
                                {project.freelancer.workField?.workSmallField}
                              </S.WorkSmallField>
                              <S.WorkExp>{project.freelancer.workExp}년차</S.WorkExp>
                            </S.ProfileContents>
                            <S.ContactBox>
                              <S.Contact>
                                <BsTelephoneFill />
                                {project.freelancer.contact.phone}
                              </S.Contact>
                              <S.Contact>
                                <MdEmail />
                                {project.freelancer.contact.email}
                              </S.Contact>
                            </S.ContactBox>
                          </div>
                        </S.ContentContainer>
                        <S.Line />
                        <S.OngoingProject>진행했던 프로젝트</S.OngoingProject>
                        <S.ProjectTitle>{project.title}</S.ProjectTitle>

                        <S.DetailBtn
                          onClick={() => {
                            setSelectedFreelancer(project.freelancer);
                            setIsModalOpen(!isModalOpen);
                          }}
                        >
                          프로젝트 제안하기
                        </S.DetailBtn>
                        {isModalOpen &&
                        selectedFreelancer &&
                        selectedFreelancer.userId === project.freelancer.userId ? (
                          <Modal setIsModalOpen={setIsModalOpen}>
                            <ContractTerminationInfoModal />
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
