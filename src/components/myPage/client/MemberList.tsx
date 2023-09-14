import { useEffect, useState } from "react";
import Modal from "src/components/modal/Modal";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/store/useUserStore";
import AddMemberModal from "./AddMemberModal";
import { Member } from "src/Types";
import { S } from "./memberListStyle";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import { CommonS } from "src/components/common/button/commonButton";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import SearchItemBar from "src/components/common/searchItemBar/SearchItemBar";
import { useSearchKeywordStore } from "src/store/useSearchKeywordStore";
import { Spin } from "antd";

export interface Errors {
  name: string | null;
  team: string | null;
  email: string | null;
  phone: string | null;
}

const MemberList = () => {
  const { userId, setUser } = useUserStore();
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const { client, clientDataError, clientDataLoading, clientMembersMutation } =
    useClientsQueries({
      userId,
    });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateMemberData, setUpdateMemberData] = useState<Member>();
  const [selectedMemberData, setSelectedMemberData] = useState<Member>();
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(
    client?.members!
  );

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

  const addAvailbleClose =
    updateMemberData?.contact.email === "" &&
    updateMemberData?.name === "" &&
    updateMemberData?.contact.phone === "" &&
    updateMemberData?.team === "";

  const updateAvailableClose =
    selectedMemberData?.name === updateMemberData?.name &&
    selectedMemberData?.team === updateMemberData?.team &&
    selectedMemberData?.contact.phone === updateMemberData?.contact.phone &&
    selectedMemberData?.contact.email === updateMemberData?.contact.email;

  const availableClose =
    selectedMemberData?.name === "" ? addAvailbleClose : updateAvailableClose;

  // 구성원 추가하기 버튼 클릭시 실행되는 함수
  const openModalButtonHandler = () => {
    setSelectedMemberData({
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
    setSelectedMemberData(updateMember);
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

    if (selectedMemberData?.name === "" && canSubmit) {
      addMember();
      toast.success("구성원이 추가되었습니다.");
      setIsAddModalOpen(false);
    } else if (selectedMemberData?.name !== "" && canSubmit) {
      updateMember();
      toast.success("구성원이 수정되었습니다.");
      setIsAddModalOpen(false);
    } else if (!canSubmit) {
      setSubmitButtonClicked(false);
    }
  }, [selectedMemberData, submitButtonClicked, errors]);

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
      return member === selectedMemberData
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

  const deleteMemberButtonHandler = (deleteMember: Member | undefined) => {
    const deletedMember = client?.members?.filter(
      (member) => member !== deleteMember
    );
    // 업데이트

    clientMembersMutation.mutate({
      updatedData: { members: deletedMember },
      userId,
      setUser,
    });
    toast.success("구성원이 삭제되었습니다.");
  };

  const handleConfirm = (deleteMember: Member) => {
    deleteMemberButtonHandler(deleteMember);
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = (member: Member) => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>{`삭제하시겠습니까?`}</CommonS.toastintoText>
        <CommonS.toastOkButton onClick={() => handleConfirm(member)}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  useEffect(() => {
    if (client?.members) {
      const filteredMemberList = client?.members?.filter((member) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        return (
          member?.name?.toLowerCase().includes(lowerCaseSearch) ||
          member?.team?.toLowerCase().includes(lowerCaseSearch) ||
          member?.contact.email?.toLowerCase().includes(lowerCaseSearch) ||
          member?.contact.phone?.toLowerCase().includes(lowerCaseSearch)
        );
      });
      setFilteredMembers(filteredMemberList);
    }
  }, [client, searchKeyword]);

  if (clientDataLoading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (clientDataError) {
    return <span>client data Error..</span>;
  }
  // console.log(client);
  return (
    <>
      <S.SearchItemBarAndAddMemberButtonWrapper>
        <SearchItemBar />
        <S.AddMemberButton onClick={openModalButtonHandler}>
          구성원 추가하기
        </S.AddMemberButton>
      </S.SearchItemBarAndAddMemberButtonWrapper>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {selectedMemberData?.name === "" ? (
                <S.ModalInnerAddButton onClick={submitButtonHandler}>
                  구성원 추가하기
                </S.ModalInnerAddButton>
              ) : (
                <S.ModalInnerAddButton onClick={submitButtonHandler}>
                  구성원 수정하기
                </S.ModalInnerAddButton>
              )}
            </>
          }
          availableClose={availableClose}
        >
          <AddMemberModal
            currentMemberData={selectedMemberData as Member}
            setUpdateMemberData={setUpdateMemberData}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
      <S.MemberListContainer>
        {client && filteredMembers?.length > 0 ? (
          filteredMembers?.map((member) => {
            return (
              <S.MemberList>
                <S.MemberInfo>
                  <S.MemberName>{member.name}</S.MemberName>
                  <S.MemberTeam>{member.team}</S.MemberTeam>
                </S.MemberInfo>
                <S.MemberContactBox>
                  <S.ButtonBox>
                    <S.EditAndDelButton
                      onClick={() => updateButtonHandler(member)}
                    >
                      수정
                    </S.EditAndDelButton>
                    <S.EditAndDelButton
                      onClick={() => {
                        showConfirmation(member);
                      }}
                    >
                      삭제
                    </S.EditAndDelButton>
                  </S.ButtonBox>
                  <S.ContactBoxWrapper>
                    <S.ContactBox>
                      <FiPhoneCall size={16} />
                      <S.MemberContact>{member.contact.phone}</S.MemberContact>
                    </S.ContactBox>
                    <S.ContactBox>
                      <FiMail size={16} />
                      <S.MemberContact>{member.contact.email}</S.MemberContact>
                    </S.ContactBox>
                  </S.ContactBoxWrapper>
                </S.MemberContactBox>
              </S.MemberList>
            );
          })
        ) : (
          <p>등록된 구성원이 없습니다.</p>
        )}
      </S.MemberListContainer>
    </>
  );
};

export default MemberList;
