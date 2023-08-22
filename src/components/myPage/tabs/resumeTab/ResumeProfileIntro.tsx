import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, Modal } from "antd";
import React, { useState } from "react";
import {
  addFreelancerResumeProfileIntro,
  getFreelancerResumeProfileIntro,
} from "src/api/User";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";

const ResumeProfileIntro = () => {
  // 상태관리
  const [profileIntroEditorOpen, setProfileIntroEditorOpen] =
    useState<boolean>(false);
  const profileIntroInput = useInput("");
  const { userId, freelancerRole, name, photoURL } = useUserStore(); // 각각 로그인, 회원가입, info, image에서 가져옴
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
  // console.log(profileIntro);
  // console.log({ userId, photoURL, name });

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
      freelancerRole,
      name,
      photoURL,
    });

    // 입력창 비우고 모달 닫기
    profileIntroInput.reset();
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
      {/* ------------------------------------------------------------ */}
      {profileIntroEditorOpen && (
        <Modal
          title="프로필 추가"
          open={profileIntroEditorOpen}
          onOk={addFreelancerResumeProfileIntroHandler}
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
                value={profileIntroInput.value}
                onChange={profileIntroInput.onChange}
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
    border: solid blue;
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
