import { styled } from "styled-components";
import React, { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import useResumeProfileIntroQueries from "src/hooks/useResumeProfileIntroQueries";
import { MdAddCircle } from "react-icons/md";
import Modal from "src/components/modal/Modal";
import AddResumeProfileIntroModal from "./AddResumeProfileIntroModal";
import { useResumeProfileIntroStore } from "src/zustand/useResumeProfileIntroStore";

const ResumeProfileIntroComp = () => {
  const { userId } = useUserStore();
  const {
    addProfileIntroMutation,
    resumeProfileIntroObject,
    updateProfileIntroMutation,
  } = useResumeProfileIntroQueries(userId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { newProfileIntroInput } = useResumeProfileIntroStore();

  // add
  const addProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    addProfileIntroMutation.mutate({
      newProfileIntroInput,
      userId,
    });

    setIsAddModalOpen(false);
  };

  // update
  const updateProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    updateProfileIntroMutation.mutate({
      newProfileIntroInput,
      userId,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <S.ProfileContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <S.ProfileTitle>프로필</S.ProfileTitle>
          {resumeProfileIntroObject &&
          resumeProfileIntroObject.resumeProfileIntro !== "" ? (
            <S.ProfileBtn onClick={() => setIsAddModalOpen(true)}>
              프로필 수정하기
            </S.ProfileBtn>
          ) : (
            <S.ProfileBtn
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <MdAddCircle size="20" />
              추가
            </S.ProfileBtn>
          )}
        </div>

        <S.ProfileInputBox>
          <div>
            {resumeProfileIntroObject
              ? resumeProfileIntroObject.resumeProfileIntro ||
                "등록된 소개가 없습니다."
              : "등록된 소개가 없습니다."}
          </div>
        </S.ProfileInputBox>
      </S.ProfileContainer>

      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {newProfileIntroInput.length > 0 ? (
                <button onClick={updateProfileIntroHandler}>수정하기</button>
              ) : (
                <button onClick={addProfileIntroHandler}>등록하기</button>
              )}
            </>
          }
        >
          <AddResumeProfileIntroModal
            profileIntro={
              resumeProfileIntroObject &&
              resumeProfileIntroObject.resumeProfileIntro
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ResumeProfileIntroComp;

const S = {
  ProfileContainer: styled.section`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  ProfileTitle: styled.p`
    font-size: 20px;
    font-weight: bold;
  `,
  ProfileInputBox: styled.div`
    font-size: 18px;
    padding: 10px;
    margin-top: 15px;
    border-radius: 8px;
    border: 1.5px solid var(--main-blue);
  `,
  ProfileBtn: styled.button`
    background-color: none;
    border: none;
    padding: 4px 8px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
  `,
};
