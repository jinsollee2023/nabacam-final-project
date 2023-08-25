import { useState } from "react";
import Modal from "src/components/modal/Modal";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import AddMemberModal from "./AddMemberModal";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "src/api/User";
import { queryClient } from "src/App";

const MemberList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateMemberData, setUpdateMemberData] = useState({});

  const updateClientMembersMutation = useMutation(
    ({ updatedData, userId }: { updatedData: object; userId: string }) =>
      updateUser({ updatedData, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"]);
      },
    }
  );

  const deleteClientMembersMutation = useMutation(
    ({ updatedData, userId }: { updatedData: object; userId: string }) =>
      updateUser({ updatedData, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"]);
      },
    }
  );

  const addMemberButtonHandler = () => {
    const updateMember = [...client?.members!, updateMemberData];
    console.log(updateMember);
    // 업데이트
    updateClientMembersMutation.mutate({
      updatedData: { members: updateMember },
      userId,
    });
    setIsAddModalOpen(false);
  };

  const deleteMemberButtonHandler = (memberNameToDelete: string) => {
    const deletedMember = client?.members?.filter(
      (member) => member.name !== memberNameToDelete
    );
    console.log(deletedMember);
    // 업데이트
    updateClientMembersMutation.mutate({
      updatedData: { members: deletedMember },
      userId,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>추가</button>
      </div>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <button onClick={addMemberButtonHandler}>멤버 추가하기</button>
            </>
          }
        >
          <AddMemberModal setUpdateMemberData={setUpdateMemberData} />
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
                  <button>수정</button>
                  <button
                    onClick={() => {
                      deleteMemberButtonHandler(member.name);
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
