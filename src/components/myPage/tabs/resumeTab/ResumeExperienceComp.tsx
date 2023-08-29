import React, { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import Modal from "src/components/modal/Modal";
import type { ResumeExperience } from "src/Types";
import { useResumeExperienceStore } from "src/zustand/useResumeExperienceStore";
import ResumeExperienceCard from "./ResumeExperienceCard";

const ResumeExperienceComp = () => {
  const { userId } = useUserStore();
  const { addExperienceMutation, resumeExperienceArray } =
    useResumeExperienceQueries({ userId });
  const { newExperience } = useResumeExperienceStore();
  const [resumeExperienceArr, setResumeExperienceArr] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // 저장
  useEffect(() => {
    if (resumeExperienceArray) setResumeExperienceArr(resumeExperienceArray);
  }, [resumeExperienceArr]);

  // add
  const addExperienceHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    addExperienceMutation.mutate({
      newExperience,
      userId,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          {resumeExperienceArr &&
            resumeExperienceArr?.map((item: ResumeExperience) => (
              <ResumeExperienceCard key={item.experienceId} experience={item} />
            ))}
        </S.WorkExperienceListWrapper>
      </S.WorkExperienceContainer>
      {/* ------------------------------------------------------------ */}
      <S.Btn
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        + 경력 추가하기
      </S.Btn>
      {/* ---------------------------추가 모달--------------------------------- */}
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
