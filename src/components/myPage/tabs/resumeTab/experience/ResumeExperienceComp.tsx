import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../store/useUserStore";
import useResumeExperienceQueries from "../../../../../hooks/useResumeExperienceQueries";
import Modal from "../../../../modal/Modal";
import type { ResumeExperience } from "../../../../../Types";
import { useResumeExperienceStore } from "../../../../../store/useResumeExperienceStore";
import ResumeExperienceCard from "./ResumeExperienceCard";
import { BsPlusSquareDotted } from "react-icons/bs";
import { S } from "../Resume.styles";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    try {
      addExperienceMutation.mutate({
        newExperience,
        userId,
      });
      toast.success("경력사항이 성공적으로 등록되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }

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
          <AddResumeExperienceModal />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceComp;
