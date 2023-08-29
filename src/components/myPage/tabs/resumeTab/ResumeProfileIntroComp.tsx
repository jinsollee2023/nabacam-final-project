import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import Modal from "src/components/modal/Modal";
import { Input } from "antd";
import useResumeProfileIntroQueries from "src/hooks/useResumeProfileIntroQueries";
import { useResumeProfileIntroStore } from "src/zustand/useResumeProfileIntroStore";

const ResumeProfileIntroComp = () => {
  const { TextArea } = Input; // textArea
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [profileIntroInput, setProfileIntroInput] = useState("");
  const { userId } = useUserStore();
  const {
    addProfileIntroMutation,
    resumeProfileIntroObject,
    updateProfileIntroMutation,
  } = useResumeProfileIntroQueries(userId);
  const { changeNewProfileIntroInput } = useResumeProfileIntroStore();

  const onChangeprofileIntroInputHandler = (value: string) => {
    setProfileIntroInput(value);
  };
  const newProfileIntroInput: string = profileIntroInput;
  useEffect(() => {
    changeNewProfileIntroInput(newProfileIntroInput);
  }, [newProfileIntroInput]);

  // add
  const addProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    addProfileIntroMutation.mutate({
      newProfileIntroInput,
      userId,
    });

    setProfileIntroInput("");
    setIsAddModalOpen(false);
  };

  // // update
  // const updateFreelancerResumeProfileIntroHandler = async () => {
  //   updateProfileIntroMutation.mutate({
  //     editedProfileIntroText,
  //     userId,
  //   });
  // };

  return (
    <>
      <S.ProfileContainer>
        <p>프로필</p>
        {/* ----------------------------------------------------------------- */}
        <S.Btn
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          + 프로필 등록하기
        </S.Btn>
        {/* --------------------------box--------------------------------------- */}
        <S.ProfileInputBox>
          <div>
            {resumeProfileIntroObject &&
              resumeProfileIntroObject.resumeProfileIntro}
          </div>
        </S.ProfileInputBox>
      </S.ProfileContainer>

      {/* ---------------------------추가모달--------------------------------- */}
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <button onClick={addProfileIntroHandler}>등록하기</button>
            </>
          }
        >
          <form>
            <label>
              간단한 프로필을 입력해주세요.
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="500자 이하로 입력해주세요..."
                value={profileIntroInput}
                onChange={(e) =>
                  onChangeprofileIntroInputHandler(e.target.value)
                }
              />
            </label>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ResumeProfileIntroComp;

const S = {
  ProfileContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  ProfileInputBox: styled.div`
    background-color: #8080803d;
    padding: 10px;
    margin-top: 5px;
    border-radius: 10px;
  `,
  Btn: styled.button`
    background-color: #1fc17d;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #168c68;
    }
  `,
};
