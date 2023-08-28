import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Select, SelectProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import { v4 as uuidv4 } from "uuid";
import ResumeExperienceAddForm from "./ResumeExperienceAddForm";
import ResumeExperienceEditForm from "./ResumeExperienceEditForm";

export interface Experience {
  experienceId: string;
  pastWorkField: string;
  pastEmploymentType: string;
  pastWorkPlace: string;
  pastWorkPosition: string;
  pastWorkDuration: {
    pastWorkStartDate: string;
    pastWorkEndDate: string;
  };
}

const ResumeExperience = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [userExperienceId, setUserExperienceId] = useState("");
  const [writtenPastWorkPlace, setWrittenPastWorkPlace] = useState("");
  const [writtenPastWorkPosition, setWrittenPastWorkPosition] = useState("");
  const [writtenPastWorkStartDate, setWrittenPastWorkStartDate] = useState("");
  const [writtenPastWorkEndDate, setWrittenPastWorkEndDate] = useState("");
  const [writtenPastWorkField, setWrittenPastWorkField] = useState("");
  const [writtenPastEmploymentType, setWrittenPastEmploymentType] =
    useState("");

  const { userId } = useUserStore();
  const { deleteExperienceMutation, experienceData } =
    useResumeExperienceQueries(userId);
  const [userExperienceData, setUserExperienceData] = useState<Experience[]>(
    []
  );

  useEffect(() => {
    if (experienceData)
      setUserExperienceData(experienceData[0].resumeExperience);
  }, [userExperienceData]);

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  // delete
  const deleteExperienceHandler = async ({
    userId,
    experienceId,
  }: {
    userId: string;
    experienceId: string;
  }) => {
    deleteExperienceMutation.mutate({ userId, experienceId });
  };

  // update
  const openEditModal = ({
    userId,
    experienceId,
    pastWorkField,
    pastEmploymentType,
    pastWorkPlace,
    pastWorkPosition,
    pastWorkStartDate,
    pastWorkEndDate,
  }: {
    userId: string;
    experienceId: string;
    pastWorkField: string;
    pastEmploymentType: string;
    pastWorkPlace: string;
    pastWorkPosition: string;
    pastWorkStartDate: string;
    pastWorkEndDate: string;
  }) => {
    setEditOpen(true);
    setUserExperienceId(experienceId);
    setWrittenPastWorkPlace(pastWorkPlace);
    setWrittenPastWorkPosition(pastWorkPosition);
    setWrittenPastWorkStartDate(pastWorkStartDate);
    setWrittenPastWorkEndDate(pastWorkEndDate);
    setWrittenPastWorkField(pastWorkField);
    setWrittenPastEmploymentType(pastEmploymentType);
  };

  return (
    <>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          {experienceData &&
            experienceData[0]?.resumeExperience?.map(
              (item: Experience, index: number) => (
                <S.WorkExperienceList key={index}>
                  <h1>{item.pastWorkField}</h1>
                  <div>
                    {item.pastWorkPlace}/{item.pastEmploymentType}/
                    {item.pastWorkPosition}
                  </div>
                  <div>
                    {item.pastWorkDuration.pastWorkStartDate}~
                    {item.pastWorkDuration.pastWorkEndDate}
                  </div>
                  <button
                    onClick={() =>
                      deleteExperienceHandler({
                        userId,
                        experienceId: item.experienceId,
                      })
                    }
                  >
                    삭제 x
                  </button>
                  <button
                    onClick={() =>
                      openEditModal({
                        userId,
                        experienceId: item.experienceId,
                        pastWorkField: item.pastWorkField,
                        pastEmploymentType: item.pastEmploymentType,
                        pastWorkPlace: item.pastWorkPlace,
                        pastWorkPosition: item.pastWorkPosition,
                        pastWorkStartDate:
                          item.pastWorkDuration.pastWorkStartDate,
                        pastWorkEndDate: item.pastWorkDuration.pastWorkEndDate,
                      })
                    }
                  >
                    수정
                  </button>
                </S.WorkExperienceList>
              )
            )}
        </S.WorkExperienceListWrapper>
        <S.Btn
          onClick={() => {
            setOpen(true);
          }}
        >
          + 경력 추가하기
        </S.Btn>
      </S.WorkExperienceContainer>
      {/* ------------------------------------------------------------ */}
      <ResumeExperienceAddForm open={open} setOpen={setOpen} />
      {/* ------------------------------------------------------------ */}
      <ResumeExperienceEditForm
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        experienceId={userExperienceId}
        writtenPastWorkPlace={writtenPastWorkPlace}
        writtenPastWorkPosition={writtenPastWorkPosition}
        writtenPastWorkStartDate={writtenPastWorkStartDate}
        writtenPastWorkEndDate={writtenPastWorkEndDate}
        writtenPastWorkField={writtenPastWorkField}
        writtenPastEmploymentType={writtenPastEmploymentType}
      />
    </>
  );
};

export default ResumeExperience;

const S = {
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  WorkExperienceList: styled.li`
    background-color: #8080803d;
    padding: 20px;
    list-style: none;
    border-radius: 10px;
  `,

  Btn: styled.button`
    background-color: #1fc17d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #168c68;
    }
    width: 100%;
  `,
};
