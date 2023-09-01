import { useState } from "react";
import Modal from "src/components/modal/Modal";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import AddMemberModal from "./AddMemberModal";
import { Member } from "src/Types";
import { S } from "./memberListStyle";

const MemberList = () => {
  const { userId, setUser } = useUserStore();
  const { client, clientMembersMutation } = useClientsQueries({ userId });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateMemberData, setUpdateMemberData] = useState<Member>();
  const [currentMemberData, setCurrentMemberData] = useState<Member>();

  const openModalButtonHandler = () => {
    setCurrentMemberData({
      name: "",
      team: "",
      contact: { email: "", phone: "" },
    });
    setIsAddModalOpen(true);
  };

  const addMemberButtonHandler = () => {
    const addedMembers = [...(client?.members || []), updateMemberData];
    // 업데이트
    clientMembersMutation.mutate({
      updatedData: { members: addedMembers },
      userId,
      setUser,
    });
    setIsAddModalOpen(false);
  };

  const updateButtonHandler = (updateMember: Member) => {
    setCurrentMemberData(updateMember);
    setIsAddModalOpen(true);
  };

  const updateMemberButtonHandler = () => {
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
    // 업데이트
    clientMembersMutation.mutate({
      updatedData: { members: updateMembers },
      userId,
      setUser,
    });
    setIsAddModalOpen(false);
  };

  const deleteMemberButtonHandler = (deleteMember: Member) => {
    const deletedMember = client?.members?.filter((member) => member !== deleteMember);
    // 업데이트
    clientMembersMutation.mutate({
      updatedData: { members: deletedMember },
      userId,
      setUser,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div>
        <S.AddMemberBtn onClick={openModalButtonHandler}>+ 구성원 추가하기</S.AddMemberBtn>
      </div>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {currentMemberData?.name === "" ? (
                <S.ModalInnerAddBtn onClick={addMemberButtonHandler}>추가하기</S.ModalInnerAddBtn>
              ) : (
                <S.ModalInnerAddBtn onClick={updateMemberButtonHandler}>
                  멤버 수정하기
                </S.ModalInnerAddBtn>
              )}
            </>
          }
        >
          <AddMemberModal
            currentMemberData={currentMemberData as Member}
            setUpdateMemberData={setUpdateMemberData}
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
                    <S.EditAndDelBtn onClick={() => updateButtonHandler(member)}>
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
