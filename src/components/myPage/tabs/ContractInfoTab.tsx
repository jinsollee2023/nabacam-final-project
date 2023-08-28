import React, { useState } from "react";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import { Select } from "antd";

const ContractInfoTab = () => {
  // 프로젝트 진행중
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const [selectedLabel, setSelectedLabel] = useState("전체 보기");
  const handleChange = (value: string) => {
    setSelectedLabel(value);
  };

  const { userId } = useUserStore();
  const { freelancerProjects } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });
  console.log("freelancerProjects===>", freelancerProjects);

  return (
    <S.ContractInfoContainer>
      <span>프리랜서 이력</span>
      <Select
        value={selectedLabel}
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: "전체 보기", label: "전체 보기" },
          { value: "진행 중", label: "진행 중" },
          { value: "진행 완료", label: "진행 완료" },
        ]}
      />

      <>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status !== "진행 전";
          })
          .map<any>((freelancerProject) => {
            return (
              <>
                <>
                  {selectedLabel === "전체 보기" &&
                    freelancerProject.status === "진행 중" && (
                      <S.ContractInfoBox
                        key={freelancerProject.projectId}
                      >{`${freelancerProject.title}/${freelancerProject.date.startDate}~${freelancerProject.date.endDate}`}</S.ContractInfoBox>
                    )}
                </>
                <>
                  {selectedLabel === "전체 보기" &&
                    freelancerProject.status === "진행 완료" && (
                      <S.ContractInfoGrayBox
                        key={freelancerProject.projectId}
                      >{`${freelancerProject.title}/${freelancerProject.date.startDate}~${freelancerProject.date.endDate}`}</S.ContractInfoGrayBox>
                    )}
                </>
              </>
            );
          })}
      </>
      <>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status === "진행 중";
          })
          .map<any>((freelancerProject) => {
            return (
              <>
                {selectedLabel === "진행 중" && (
                  <S.ContractInfoBox
                    key={freelancerProject.projectId}
                  >{`${freelancerProject.title}/${freelancerProject.date.startDate}~${freelancerProject.date.endDate}`}</S.ContractInfoBox>
                )}
              </>
            );
          })}
      </>
      <>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status === "진행 완료";
          })
          .map<any>((freelancerProject) => {
            return (
              <>
                {selectedLabel === "진행 완료" && (
                  <S.ContractInfoGrayBox
                    key={freelancerProject.projectId}
                  >{`${freelancerProject.title}/${freelancerProject.date.startDate}~${freelancerProject.date.endDate}`}</S.ContractInfoGrayBox>
                )}
              </>
            );
          })}
      </>
    </S.ContractInfoContainer>
  );
};

export default ContractInfoTab;

const S = {
  ContractInfoContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  ContractInfoBox: styled.div`
    background-color: #8080803d;
    padding: 10px;
    margin-top: 5px;
  `,
  ContractInfoGrayBox: styled.div`
    background-color: #29292944;
    padding: 10px;
    margin-top: 5px;
  `,
};
