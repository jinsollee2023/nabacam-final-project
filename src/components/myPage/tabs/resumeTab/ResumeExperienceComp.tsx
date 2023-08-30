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

  console.log("resumeExperienceArray", resumeExperienceArray);

  // 저장
  useEffect(() => {
    if (resumeExperienceArray) setResumeExperienceArr(resumeExperienceArray);
  }, [resumeExperienceArray]);

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

  console.log("resumeExperienceArr", resumeExperienceArr);

  return (
    <>
      <S.WorkExperienceContainer>
        <S.WorkExperienceTitle>경력사항</S.WorkExperienceTitle>
        <S.WorkExperienceListWrapper>
          {resumeExperienceArr &&
            resumeExperienceArr?.map((item: ResumeExperience) => (
              <ResumeExperienceCard key={item.experienceId} experience={item} />
            ))}
        </S.WorkExperienceListWrapper>
      </S.WorkExperienceContainer>
      <S.Btn
        marginTop="30px"
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        + 경력 추가하기
      </S.Btn>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <S.Btn onClick={addExperienceHandler}>등록하기</S.Btn>
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

interface BtnProps {
  marginTop?: string;
}
const S = {
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  WorkExperienceTitle: styled.p`
    font-size: 24px;
    font-weight: bold;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
  `,
  WorkExperienceList: styled.li`
    padding: 20px;
    list-style: none;
    border-radius: 8px;
    border: solid #0086d0;
  `,

  Btn: styled.button<BtnProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
    width: 100%;
    margin-top: ${(props) => props.marginTop};
  `,
};
