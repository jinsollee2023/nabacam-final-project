import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import React, { useState } from "react";
import { updateFreelancer } from "src/api/User";
import supabase from "src/config/supabaseClient";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";

interface EditFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditForm: React.FC<EditFormProps> = ({ open, setOpen }) => {
  // 상태관리
  const updatedNameInput = useInput("");
  const updatedWorkFieldInput = useInput("");
  const updatedWorkSmallFieldInput = useInput("");
  const updatedEmailInput = useInput("");
  const updatedPhoneInput = useInput("");
  const updatedProjectIdInput = useInput("");

  const { userId } = useUserStore();

  // UPDATE
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updateFreelancer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", userId]);
    },
  });

  const updateFreelancerHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 업데이트 대상
    const updatedData = {
      name: updatedNameInput.value,
      workField: {
        workField: updatedWorkFieldInput.value,
        workSmallField: updatedWorkSmallFieldInput.value,
      },
      contact: {
        email: updatedEmailInput.value,
        phone: updatedPhoneInput.value,
      },
      projectId: updatedProjectIdInput.value,
    };

    // 업데이트
    updateMutation.mutate({ updatedData, userId });

    // 입력창 비우고 모달 닫기
    updatedNameInput.reset();
    updatedWorkFieldInput.reset();
    updatedEmailInput.reset();
    updatedPhoneInput.reset();
    updatedProjectIdInput.reset();
    setOpen(false);
  };

  return (
    <Modal
      title="개인정보 수정"
      open={open}
      onOk={updateFreelancerHandler}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <form>
        <label>
          이름:
          <input
            type="text"
            value={updatedNameInput.value}
            onChange={updatedNameInput.onChange}
          />
        </label>
        <label>
          직무분야:
          <input
            type="text"
            value={updatedWorkFieldInput.value}
            onChange={updatedWorkFieldInput.onChange}
          />
        </label>
        <label>
          세부분야:
          <input
            type="text"
            value={updatedWorkSmallFieldInput.value}
            onChange={updatedWorkSmallFieldInput.onChange}
          />
        </label>
        <label>
          이메일:
          <input
            type="text"
            value={updatedEmailInput.value}
            onChange={updatedEmailInput.onChange}
          />
        </label>
        <label>
          전화번호:
          <input
            type="text"
            value={updatedPhoneInput.value}
            onChange={updatedPhoneInput.onChange}
          />
        </label>
        <label>
          현재 진행중인 프로젝트:
          <input
            type="text"
            value={updatedProjectIdInput.value}
            onChange={updatedProjectIdInput.onChange}
          />
        </label>
      </form>
    </Modal>
  );
};

export default EditForm;
