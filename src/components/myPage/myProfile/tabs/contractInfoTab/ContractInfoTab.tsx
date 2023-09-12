import React, { useEffect, useState } from "react";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../../store/useUserStore";
import { Select } from "antd";
import { S } from "./ContractInfoTab.styles";
import { CommonS } from "src/components/common/button/commonButton";

const ContractInfoTab = () => {
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const [selectedLabel, setSelectedLabel] = useState("전체 보기");
  const { userId } = useUserStore();
  const { allProjectList } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });

  const freelancerProjects = allProjectList?.filter(
    (freelancer) => freelancer.freelancerId === userId
  );

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
          onChange={setSelectedLabel}
          options={[
            { value: "전체 보기", label: "전체 보기" },
            { value: "진행 중", label: "진행 중" },
            { value: "진행 완료", label: "진행 완료" },
          ]}
        />
      </CommonS.RightEndBox>

      <S.ContractListBox>
        {freelancerProjects?.map((freelancerProject) => {
          const { status, title, date, projectId } = freelancerProject;

          if (
            (selectedLabel === "전체 보기" ||
              (selectedLabel === "진행 중" && status === "진행 중") ||
              (selectedLabel === "진행 완료" && status === "진행 완료")) &&
            status !== "진행 전"
          ) {
            return (
              <S.FilteredListsContainer key={projectId}>
                <S.ContractInfoBox>
                  <S.Title>{title}</S.Title>
                  <br />
                  <S.Detail>{`${date?.startDate}~${date?.endDate}`}</S.Detail>
                </S.ContractInfoBox>
              </S.FilteredListsContainer>
            );
          }

          return null;
        })}
      </S.ContractListBox>
    </S.ContractInfoContainer>
  );
};

export default ContractInfoTab;
