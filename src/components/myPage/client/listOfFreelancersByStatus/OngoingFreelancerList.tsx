import React from "react";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { S } from "./listOfFreelancersByStatusStyle";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const OngoingFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const { ongoingProjectsWithFreelancers } = useProjectsQueries({ currentUserId: userId });

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log("현재 로그인된 클라이언트의 진행중인 프로젝트 정보", ongoingProjectsWithFreelancers);

  if (!ongoingProjectsWithFreelancers) {
    return <div>진행중인 프로젝트가 없습니다.</div>;
  }

  return (
    <>
      <S.listContainer>
        {ongoingProjectsWithFreelancers.map((project) => (
          <S.ListsBox key={project.projectId}>
            <S.Profile>
              <S.ProfileContent>
                {project.freelancer instanceof Promise ? (
                  <p>Loading freelancer data...</p>
                ) : (
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
                    <S.OngoingProject>진행중인 프로젝트</S.OngoingProject>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectDate>
                      {project.date.startDate} ~ {project.date.endDate}
                    </S.ProjectDate>
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
