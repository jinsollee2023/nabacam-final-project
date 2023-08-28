import { useState } from "react";
import Modal from "src/components/modal/Modal";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import AddMemberModal from "./AddMemberModal";
import { Member } from "src/Types";

const MemberList = () => {
  const { userId } = useUserStore();
  const { client, clientMembersMutation } = useClientsQueries(userId);
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
    const addedMembers = [...client?.members!, updateMemberData];
    // 업데이트
    clientMembersMutation.mutate({
      updatedData: { members: addedMembers },
      userId,
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
    });
    setIsAddModalOpen(false);
  };

  const deleteMemberButtonHandler = (deleteMember: Member) => {
    const deletedMember = client?.members?.filter(
      (member) => member !== deleteMember
    );
    // 업데이트
    clientMembersMutation.mutate({
      updatedData: { members: deletedMember },
      userId,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={openModalButtonHandler}>추가</button>
      </div>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {updateMemberData ? (
                <button onClick={updateMemberButtonHandler}>
                  멤버 수정하기
                </button>
              ) : (
                <button onClick={addMemberButtonHandler}>멤버 추가하기</button>
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
      <div>
        {client &&
          client.members?.map((member) => {
            return (
              <div>
                <div>
                  <span>{member.name}</span>
                  <span>{member.team}</span>
                </div>
                <div>
                  <span>{member.contact.phone}</span>
                  <span>{member.contact.email}</span>
                </div>
                <div>
                  <button onClick={() => updateButtonHandler(member)}>
                    수정
                  </button>
                  <button
                    onClick={() => {
                      deleteMemberButtonHandler(member);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MemberList;
