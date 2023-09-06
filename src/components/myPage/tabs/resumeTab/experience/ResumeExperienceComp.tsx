import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../zustand/useUserStore";
import useResumeExperienceQueries from "../../../../../hooks/useResumeExperienceQueries";
import Modal from "../../../../modal/Modal";
import type { ResumeExperience } from "../../../../../Types";
import { useResumeExperienceStore } from "../../../../../zustand/useResumeExperienceStore";
import ResumeExperienceCard from "./ResumeExperienceCard";
import { BsPlusSquareDotted } from "react-icons/bs";
import { S } from "../Resume.styles";
import EditResumeExperienceModal from "./EditResumeExperienceModal";

const ResumeExperienceComp = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { addExperienceMutation, resumeExperienceArray } =
    useResumeExperienceQueries({ userId });
  const { newExperience } = useResumeExperienceStore();
  const [resumeExperienceArr, setResumeExperienceArr] = useState<
    ResumeExperience[]
  >([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (resumeExperienceArray) setResumeExperienceArr(resumeExperienceArray);
  }, [resumeExperienceArray]);

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
        <S.WorkExperienceTitle>경력사항</S.WorkExperienceTitle>
        <S.WorkExperienceListWrapper>
          {resumeExperienceArr?.map((item: ResumeExperience) => (
            <ResumeExperienceCard key={item.experienceId} experience={item} />
          ))}
        </S.WorkExperienceListWrapper>
      </S.WorkExperienceContainer>
      <S.Btn
        marginTop="30px"
        width="100%"
        height="40px"
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        <S.CenterizeBox>
          <BsPlusSquareDotted size="15" style={{ marginRight: "5px" }} />
          <span>경력 추가하기</span>
        </S.CenterizeBox>
      </S.Btn>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <S.Btn width="100%" onClick={addExperienceHandler}>
                등록하기
              </S.Btn>
            </>
          }
        >
          <EditResumeExperienceModal />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceComp;
