import React, { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import ResumeExperienceEditForm from "./ResumeExperienceEditForm";
import Modal from "src/components/modal/Modal";
import type { ResumeExperience } from "src/Types";
import { useResumeExperienceStore } from "src/zustand/useResumeExperienceStore";

const ResumeExperienceComp = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
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
  const { addExperienceMutation, deleteExperienceMutation, experienceData } =
    useResumeExperienceQueries(userId);
  const { newPastExperience } = useResumeExperienceStore();
  const [userExperienceData, setUserExperienceData] = useState<
    ResumeExperience[]
  >([]);

  useEffect(() => {
    if (experienceData)
      setUserExperienceData(experienceData[0].resumeExperience);
  }, [userExperienceData]);

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

  // add

  const addExperienceHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    addExperienceMutation.mutate({
      newPastExperience,
      userId,
    });
  };

  return (
    <>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          {experienceData &&
            experienceData[0]?.resumeExperience?.map(
              (item: ResumeExperience, index: number) => (
                <S.WorkExperienceList key={index}>
                  <h1>{item.pastWorkField}</h1>
                  <div>
                    {item.pastWorkPlace}/{item.pastEmploymentType}/
                    {item.pastWorkPosition}
                  </div>
                  {/* <div>
                    {item.pastWorkDuration.pastWorkStartDate
                      .toLocaleDateString()
                      .split("T")}
                    ~
                    {item.pastWorkDuration.pastWorkEndDate
                      .toLocaleDateString()
                      .split("T")}
                  </div> */}
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
                          item.pastWorkDuration.pastWorkStartDate.toLocaleDateString(),
                        pastWorkEndDate:
                          item.pastWorkDuration.pastWorkEndDate.toLocaleDateString(),
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
            setIsAddModalOpen(true);
          }}
        >
          + 경력 추가하기
        </S.Btn>
      </S.WorkExperienceContainer>
      {/* ------------------------------------------------------------ */}
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <button onClick={addExperienceHandler}>등록하기</button>
            </>
          }
        >
          <AddResumeExperienceModal />
        </Modal>
      )}
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

export default ResumeExperienceComp;

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
