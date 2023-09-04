import React, { useEffect, useState } from "react";
import useProjectsQueries from "../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../zustand/useUserStore";
import { Select } from "antd";
import { S } from "./ContractInfoTab.styles";

import supabase from "../../../../config/supabaseClient";
import { Project } from "../../../../Types";
import { getProjects } from "../../../../api/Project";
import { CommonS } from "src/components/common/button/commonButton";

const ContractInfoTab = () => {
  // 프로젝트 진행중
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const [selectedLabel, setSelectedLabel] = useState("전체 보기");

  const handleChange = (value: string) => {
    setSelectedLabel(value);
  };

  const { userId } = useUserStore();

  const { allProjectList } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });

  const freelancerProjects = allProjectList?.filter((freelancer) => {
    return freelancer.freelancerId === userId;
  });
  console.log("32", freelancerProjects);

  return (
    <S.ContractInfoContainer>
      <S.Title>계약 이력</S.Title>

      <CommonS.RightEndBox>
        <Select
          value={selectedLabel}
          style={{
            width: 200,
            border: "solid 1.4px var(--main-blue)",
            borderRadius: "8px",
          }}
          onChange={handleChange}
          options={[
            { value: "전체 보기", label: "전체 보기" },
            { value: "진행 중", label: "진행 중" },
            { value: "진행 완료", label: "진행 완료" },
          ]}
        />
      </CommonS.RightEndBox>

      {/* 진행전 */}
      <S.ContractListBox>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status !== "진행 전";
          })
          .map<any>((freelancerProject) => {
            return (
              <S.FilteredListsContainer>
                <>
                  {selectedLabel === "전체 보기" &&
                    freelancerProject.status === "진행 중" && (
                      <S.ContractInfoBox
                        key={freelancerProject.projectId}
                      >{`${freelancerProject.title}/${freelancerProject.date?.startDate}~${freelancerProject.date?.endDate}`}</S.ContractInfoBox>
                    )}
                </>
                <>
                  {selectedLabel === "전체 보기" &&
                    freelancerProject.status === "진행 완료" && (
                      <div
                        key={freelancerProject.projectId}
                      >{`${freelancerProject.title}/${freelancerProject.date?.startDate}~${freelancerProject.date?.endDate}`}</div>
                    )}
                </>
              </S.FilteredListsContainer>
            );
          })}
      </S.ContractListBox>
      {/* 진행중 */}
      <S.ContractListBox>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status === "진행 중";
          })
          .map<any>((freelancerProject) => {
            return (
              <S.FilteredListsContainer>
                {selectedLabel === "진행 중" && (
                  <S.ContractInfoBox key={freelancerProject.projectId}>
                    <S.Title>{freelancerProject.title}</S.Title>
                    <br />
                    <S.Detail marginTop="40px">{`${freelancerProject.date?.startDate}~${freelancerProject.date?.endDate}`}</S.Detail>
                  </S.ContractInfoBox>
                )}
              </S.FilteredListsContainer>
            );
          })}
      </S.ContractListBox>
      {/* 진행완료 */}
      <S.ContractListBox>
        {freelancerProjects
          ?.filter((Proceeding) => {
            return Proceeding.status === "진행 완료";
          })
          .map<any>((freelancerProject) => {
            return (
              <>
                {selectedLabel === "진행 완료" && (
                  <div
                    key={freelancerProject.projectId}
                  >{`${freelancerProject.title}/${freelancerProject.date?.startDate}~${freelancerProject.date?.endDate}`}</div>
                )}
              </>
            );
          })}
      </S.ContractListBox>
    </S.ContractInfoContainer>
  );
};

export default ContractInfoTab;
