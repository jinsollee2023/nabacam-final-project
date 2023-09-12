import { useEffect, useState } from "react";
import Modal from "src/components/modal/Modal";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/store/useUserStore";
import AddMemberModal from "./AddMemberModal";
import { Member } from "src/Types";
import { S } from "./memberListStyle";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";

export interface Errors {
  name: string | null;
  team: string | null;
  email: string | null;
  phone: string | null;
}

const MemberList = () => {
  const { userId, setUser } = useUserStore();
  const { client, clientMembersMutation } = useClientsQueries({ userId });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateMemberData, setUpdateMemberData] = useState<Member>();
  const [currentMemberData, setCurrentMemberData] = useState<Member>();
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const initialErrors: Errors = {
    name: null,
    team: null,
    email: null,
    phone: null,
  };
  const [errors, setErrors] = useState(initialErrors);
  const { validateName, validateTeam, validateEmail, validatePhone } =
    useValidation();

  const availableClose =
    updateMemberData?.contact.email === "" &&
    updateMemberData?.name === "" &&
    updateMemberData?.contact.phone === "" &&
    updateMemberData?.team === "";

  // 구성원 추가하기 버튼 클릭시 실행되는 함수
  const openModalButtonHandler = () => {
    setCurrentMemberData({
      name: "",
      team: "",
      contact: { email: "", phone: "" },
    });
    setErrors({
      name: null,
      email: null,
      phone: null,
      team: null,
    });
    setIsAddModalOpen(true);
  };

  const updateButtonHandler = (updateMember: Member) => {
    setCurrentMemberData(updateMember);
    setErrors({
      name: null,
      email: null,
      phone: null,
      team: null,
    });
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const canSubmit =
      submitButtonClicked &&
      errors.email === "" &&
      errors.phone === "" &&
      errors.name === "" &&
      errors.team === "";

    if (currentMemberData?.name === "" && canSubmit) {
      addMember();
      toast.success("구성원이 추가되었습니다.");
      setIsAddModalOpen(false);
    } else if (currentMemberData?.name !== "" && canSubmit) {
      updateMember();
      toast.success("구성원이 수정되었습니다.");
      setIsAddModalOpen(false);
    } else if (!canSubmit) {
      setSubmitButtonClicked(false);
    }
  }, [currentMemberData, submitButtonClicked, errors]);

  const submitButtonHandler = () => {
    const nameError = validateName(updateMemberData?.name as string);
    const emailError = validateEmail(updateMemberData?.contact.email as string);
    const phoneError = validatePhone(updateMemberData?.contact.phone as string);
    const teamError = validateTeam(updateMemberData?.team as string);
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      team: teamError,
    });
    setSubmitButtonClicked(true);
  };

  //구성원 추가 함수
  const addMember = () => {
    const addedMembers = [...(client?.members || []), updateMemberData];
    clientMembersMutation.mutate({
      updatedData: { members: addedMembers },
      userId,
      setUser,
    });
  };

  const updateMember = () => {
    const updateMembers = client?.members?.map((member) => {
      return member === currentMemberData
        ? {
            name: updateMemberData?.name,
            team: updateMemberData?.team,
            contact: {
              email: updateMemberData?.contact.email,
              phone: updateMemberData?.contact.phone,
            },
          }
        : member;
    });

    clientMembersMutation.mutate({
      updatedData: { members: updateMembers },
      userId,
      setUser,
    });
  };

  const deleteMemberButtonHandler = (deleteMember: Member) => {
    const deletedMember = client?.members?.filter(
      (member) => member !== deleteMember
    );
    // 업데이트
    const shouldDeleteMember = window.confirm("삭제하시겠습니까?");

    if (shouldDeleteMember) {
      clientMembersMutation.mutate({
        updatedData: { members: deletedMember },
        userId,
        setUser,
      });
      toast.success("구성원이 삭제되었습니다.");
    }
  };

  return (
    <>
      <div>
        {client?.members && client.members.length > 0 ? null : (
          <p>등록된 구성원이 없습니다.</p>
        )}
        <S.AddMemberBtn onClick={openModalButtonHandler}>
          + 구성원 추가하기
        </S.AddMemberBtn>
      </div>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {currentMemberData?.name === "" ? (
                <S.ModalInnerAddBtn onClick={submitButtonHandler}>
                  구성원 추가하기
                </S.ModalInnerAddBtn>
              ) : (
                <S.ModalInnerAddBtn onClick={submitButtonHandler}>
                  구성원 수정하기
                </S.ModalInnerAddBtn>
              )}
            </>
          }
          availableClose={availableClose}
        >
          <AddMemberModal
            currentMemberData={currentMemberData as Member}
            setUpdateMemberData={setUpdateMemberData}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
      <S.MemberListContainer>
        {client &&
          client.members?.map((member) => {
            return (
              <S.MemberList>
                <S.MemberInfo>
                  <S.MemberName>{member.name}</S.MemberName>
                  <S.MemberTeam>{member.team}</S.MemberTeam>
                </S.MemberInfo>
                <S.MemberContactBox>
                  <S.BtnBox>
                    <S.EditAndDelBtn
                      onClick={() => updateButtonHandler(member)}
                    >
                      수정
                    </S.EditAndDelBtn>
                    <S.EditAndDelBtn
                      onClick={() => {
                        deleteMemberButtonHandler(member);
                      }}
                    >
                      삭제
                    </S.EditAndDelBtn>
                  </S.BtnBox>
                  <S.ContactBox>
                    <S.ContactLabel>전화번호</S.ContactLabel>
                    <S.MemberContact>{member.contact.phone}</S.MemberContact>
                  </S.ContactBox>
                  <S.ContactBox>
                    <S.ContactLabel>이메일</S.ContactLabel>
                    <S.MemberContact>{member.contact.email}</S.MemberContact>
                  </S.ContactBox>
                </S.MemberContactBox>
              </S.MemberList>
            );
          })}
      </S.MemberListContainer>
    </>
  );
};

export default MemberList;
