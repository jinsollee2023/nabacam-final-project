import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, Modal } from "antd";
import React, { useState } from "react";
import {
  addFreelancerResumeProfileIntro,
  getFreelancerResumeProfileIntro,
  patchFreelancerResumeProfileIntro,
} from "src/api/Resume";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";

const ResumeProfileIntro = () => {
  const [profileIntroAdderOpen, setProfileIntroAdderOpen] =
    useState<boolean>(false);
  const [profileIntroEditorOpen, setProfileIntroEditorOpen] =
    useState<boolean>(false);
  const profileIntroInput = useInput("");
  const { userId } = useUserStore(); // 각각 로그인, 회원가입, info, image에서 가져옴
  // textArea
  const { TextArea } = Input;

  // GET
  const { data: profileIntro } = useQuery(
    ["profileIntro", userId],
    () => getFreelancerResumeProfileIntro(userId),
    {
      enabled: !!userId,
    }
  );
  const previousData = profileIntro && profileIntro[0];
  const editedProfileIntroInput = useInput(previousData?.resumeProfileIntro);

  // ADD
  const queryClient = useQueryClient();
  const addMutation = useMutation(addFreelancerResumeProfileIntro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileIntro", userId]);
    },
  });
  const addFreelancerResumeProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const profileIntroText = profileIntroInput.value;

    addMutation.mutate({
      profileIntroText,
      userId,
    });

    profileIntroInput.reset();
    setProfileIntroAdderOpen(false);
  };

  // PATCH
  const patchMutation = useMutation(patchFreelancerResumeProfileIntro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileIntro", userId]);
    },
  });

  const patchFreelancerResumeProfileIntroHandler = async () => {
    const editedProfileIntroText = editedProfileIntroInput.value;

    patchMutation.mutate({
      editedProfileIntroText,
      userId,
    });

    editedProfileIntroInput.reset();
    setProfileIntroEditorOpen(false);
  };

  return (
    <>
      <S.ProfileContainer>
        <p>프로필</p>
        <S.Btn
          onClick={() => {
            setProfileIntroEditorOpen(true);
          }}
        >
          + 프로필 추가하기
        </S.Btn>
        <S.ProfileInputBox>
          <div>{profileIntro && profileIntro[0].resumeProfileIntro}</div>
          <S.Btn
            onClick={() => {
              setProfileIntroEditorOpen(true);
            }}
          >
            수정
          </S.Btn>
        </S.ProfileInputBox>
      </S.ProfileContainer>
      {/* ---------------------------추가모달--------------------------------- */}
      {profileIntroAdderOpen && (
        <Modal
          title="프로필 추가"
          open={profileIntroAdderOpen}
          onOk={addFreelancerResumeProfileIntroHandler}
          onCancel={() => {
            setProfileIntroAdderOpen(false);
          }}
        >
          <form>
            <label>
              간단한 프로필을 입력해주세요
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="500자 이하로 입력해주세요..."
                value={profileIntroInput.value}
                onChange={profileIntroInput.onChange}
              />
            </label>
          </form>
        </Modal>
      )}
      {/* ---------------------------수정모달--------------------------------- */}
      {profileIntroEditorOpen && (
        <Modal
          title="프로필 수정"
          open={profileIntroEditorOpen}
          onOk={patchFreelancerResumeProfileIntroHandler}
          onCancel={() => {
            setProfileIntroEditorOpen(false);
          }}
        >
          <form>
            <label>
              간단한 프로필을 입력해주세요
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="500자 이하로 입력해주세요..."
                value={editedProfileIntroInput.value}
                onChange={editedProfileIntroInput.onChange}
              />
            </label>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ResumeProfileIntro;

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
