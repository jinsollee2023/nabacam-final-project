import { useEffect, useState } from "react";
import { Member } from "src/Types";
import { styled } from "styled-components";

interface AddMemberModalProps {
  currentMemberData?: Member;
  setUpdateMemberData: (updatdMemberData: Member) => void;
}

const AddMemberModal = ({
  currentMemberData,
  setUpdateMemberData,
}: AddMemberModalProps) => {
  const [name, setName] = useState(
    currentMemberData ? currentMemberData.name : ""
  );
  const [team, setTeam] = useState(
    currentMemberData ? currentMemberData.team : ""
  );
  const [email, setEmail] = useState(
    currentMemberData ? currentMemberData.contact.email : ""
  );
  const [phone, setPhone] = useState(
    currentMemberData ? currentMemberData.contact.phone : ""
  );

  useEffect(() => {
    setUpdateMemberData({
      name,
      team,
      contact: {
        email,
        phone,
      },
    });
  }, [name, team, email, phone]);

  return (
    <S.AddMemberBox>
      <label htmlFor="memberName">이름</label>
      <input
        id="memberName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="memberTeam">팀</label>
      <input
        id="memberTeam"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <label htmlFor="memberEmail">이메일</label>
      <input
        id="memberEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="memberPhone">번호</label>
      <input
        id="memberPhone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </S.AddMemberBox>
  );
};

export default AddMemberModal;

const S = {
  AddMemberBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
