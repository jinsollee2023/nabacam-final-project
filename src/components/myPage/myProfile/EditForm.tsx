import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import React from "react";
import { updateFreelancer } from "src/api/User";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";

interface EditFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users:
    | {
        name: any;
        contact: any;
        workField: any;
        projectId: any;
      }[]
    | null
    | undefined;
}
const EditForm: React.FC<EditFormProps> = ({ open, setOpen, users }) => {
  // 상태관리
  const previousData = users && users[0];
  const updatedNameInput = useInput(previousData?.name);
  const updatedWorkFieldInput = useInput(previousData?.workField?.workField);
  const updatedWorkSmallFieldInput = useInput(
    previousData?.workField?.workSmallField
  );
  const updatedEmailInput = useInput(previousData?.contact?.email);
  const updatedPhoneInput = useInput(previousData?.contact?.phone);
  const updatedProjectIdInput = useInput(previousData?.contact?.projectId);

  const { userId } = useUserStore();

  // UPDATE
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updateFreelancer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profileIntro", userId]);
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
