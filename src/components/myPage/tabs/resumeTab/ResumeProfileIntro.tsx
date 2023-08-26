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
  // 상태관리
  const [profileIntroAdderOpen, setProfileIntroAdderOpen] =
    useState<boolean>(false);
  const [profileIntroEditorOpen, setProfileIntroEditorOpen] =
    useState<boolean>(false);
  const profileIntroInput = useInput("");
  const { userId, userRole, name, photoURL } = useUserStore(); // 각각 로그인, 회원가입, info, image에서 가져옴
  // textArea
  const { TextArea } = Input;

  // GET
  const { status, data: profileIntro } = useQuery(
    ["profileIntro", userId],
    () => getFreelancerResumeProfileIntro(userId),
    {
      enabled: !!userId,
    }
  );
  const previousData = profileIntro && profileIntro[0];
  const editedProfileIntroInput = useInput(previousData?.resumeProfileIntro);

  // ADD - 프로필 추가
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

    // 추가 대상
    const profileIntroText = profileIntroInput.value;

    // 추가
    addMutation.mutate({
      profileIntroText,
      userId,
    });

    // 입력창 비우고 모달 닫기
    profileIntroInput.reset();
    setProfileIntroAdderOpen(false);
  };

  // PATCH - 프로필 수정
  const patchMutation = useMutation(patchFreelancerResumeProfileIntro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileIntro", userId]);
    },
  });

  const patchFreelancerResumeProfileIntroHandler = async () => {
    // 수정 대상
    const editedProfileIntroText = editedProfileIntroInput.value;

    // PATCH 요청
    patchMutation.mutate({
      editedProfileIntroText,
      userId,
    });

    // 입력창 비우고 모달 닫기
    editedProfileIntroInput.reset();
    setProfileIntroEditorOpen(false);
  };

  return (
    <>
      <S.ProfileContainer>
        <p>프로필</p>
        <button
          onClick={() => {
            setProfileIntroEditorOpen(true);
          }}
        >
          + 프로필 추가하기
        </button>
        <S.ProfileInputBox>
          <div>{profileIntro && profileIntro[0].resumeProfileIntro}</div>
          <button
            onClick={() => {
              setProfileIntroEditorOpen(true);
            }}
          >
            수정
          </button>
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
  `,
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding: 10px;
    border: solid blue;
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
  `,
  WorkExperienceAddBtn: styled.button`
    padding: 10px;
    margin-top: 30px;
  `,
};
