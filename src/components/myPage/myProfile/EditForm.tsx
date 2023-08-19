import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import React, { useState } from "react";
import { queryClient } from "src/App";
import { updateLoggedInFreelancer } from "src/api/User";
import supabase from "src/config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";

interface EditFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditForm: React.FC<EditFormProps> = ({ open, setOpen }) => {
  // 상태관리
  const [updatedName, setUpdatedName] = useState("");
  const [updatedWorkField, setUpdatedWorkField] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedProjectId, setUpdatedProjectId] = useState("");

  const { userId } = useUserStore();

  // UPDATE
  const updateMutation = useMutation(updateLoggedInFreelancer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", userId]);
    },
  });

  const updateLoggedInFreelancerHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 업데이트 대상
    const updatedData = {
      name: updatedName,
      workField: updatedWorkField,
      contact: {
        email: updatedEmail,
        phone: updatedPhone,
      },
      projectId: updatedProjectId,
    };

    // 업데이트
    updateMutation.mutate({ updatedData, userId });

    // 입력창 비우고 모달 닫기
    setUpdatedName("");
    setUpdatedWorkField("");
    setUpdatedEmail("");
    setUpdatedPhone("");
    setUpdatedProjectId("");

    setOpen(false);
  };

  // Event Handler
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="개인정보 수정"
      open={open}
      onOk={updateLoggedInFreelancerHandler}
      onCancel={handleCancel}
    >
      <form>
        <label>
          이름:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </label>
        <label>
          업무분야:
          <input
            type="text"
            value={updatedWorkField}
            onChange={(e) => setUpdatedWorkField(e.target.value)}
          />
        </label>
        <label>
          이메일:
          <input
            type="text"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </label>
        <label>
          전화번호:
          <input
            type="text"
            value={updatedPhone}
            onChange={(e) => setUpdatedPhone(e.target.value)}
          />
        </label>
        <label>
          현재 진행중인 프로젝트:
          <input
            type="text"
            value={updatedProjectId}
            onChange={(e) => setUpdatedProjectId(e.target.value)}
          />
        </label>
      </form>
    </Modal>
  );
};

export default EditForm;
