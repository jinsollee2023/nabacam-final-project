import { styled } from "styled-components";
import React, { useState } from "react";
import { Modal, Select, SelectProps } from "antd";
import useInput from "src/hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFreelancerResume } from "src/api/User";
import { useUserStore } from "src/zustand/useUserStore";

const ResumeTab = () => {
  // 상태관리
  const [open, setOpen] = useState<boolean>(false); // 모달
  const pastWorkPlaceInput = useInput("");
  const pastWorkPositionInput = useInput("");
  const pastWorkDateInput = useInput("");

  const { userId } = useUserStore();
  console.log(userId);

  // select
  const options: SelectProps["options"] = []; // [{value: , label: }, {}, {}]
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // ADD
  const queryClient = useQueryClient();
  const addMutation = useMutation(addFreelancerResume, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", userId]);
    },
  });
  const addFreelancerResumeHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 추가 대상
    const newData = {
      pastWorkPlace: pastWorkPlaceInput.value,
      pastWorkPosition: pastWorkPositionInput.value,
      pastWorkDate: pastWorkDateInput.value,
    };
    // 추가
    addMutation.mutate({ newData, userId });

    // 입력창 비우고 모달 닫기
    pastWorkPlaceInput.reset();
    pastWorkPositionInput.reset();
    pastWorkDateInput.reset();
    setOpen(false);
  };

  return (
    <>
      <S.ProfileContainer>
        <p>프로필</p>
        <S.ProfileInputBox>bla</S.ProfileInputBox>
      </S.ProfileContainer>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          <S.WorkExperienceList>여기 들어가요</S.WorkExperienceList>
        </S.WorkExperienceListWrapper>
        <S.WorkExperienceAddBtn
          onClick={() => {
            setOpen(true);
          }}
        >
          + 경력 추가하기
        </S.WorkExperienceAddBtn>
      </S.WorkExperienceContainer>
      {open && (
        <Modal
          title="이력서 수정"
          open={open}
          onOk={addFreelancerResumeHandler}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <form>
            {/* ----------------select---------------- */}
            <label>
              근무분야(복수선택 가능)
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                onChange={handleChange}
                options={options}
              />
            </label>

            <br />
            <br />
            {/* --------------------------------------- */}
            <label>
              근무지:
              <input
                type="text"
                value={pastWorkPlaceInput.value}
                onChange={pastWorkPlaceInput.onChange}
              />
            </label>
            <br />
            <label>
              직책:
              <input
                type="text"
                value={pastWorkPositionInput.value}
                onChange={pastWorkPositionInput.onChange}
              />
            </label>
            <br />
            <label>
              근무기간:
              <input
                type="text"
                value={pastWorkDateInput.value}
                onChange={pastWorkDateInput.onChange}
              />
            </label>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ResumeTab;

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
