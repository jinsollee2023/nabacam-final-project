import { useEffect, useState } from "react";
import { Member } from "src/Types";
import { S } from "./addMemberModal.style";
import { useUserStore } from "src/store/useUserStore";

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
  const { user } = useUserStore();

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
      <S.ClientInfo>
        <S.ProfileImgBox>
          <S.ProfileImg alt="profileImg" src={user.photoURL} />
        </S.ProfileImgBox>
        <S.ModalTitle>기업 구성원</S.ModalTitle>
      </S.ClientInfo>
      <S.WriteBox>
        <S.Label htmlFor="memberName">이름</S.Label>
        <S.Input
          id="memberName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberPhone">전화번호</S.Label>
        <S.Input
          id="memberPhone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberEmail">이메일</S.Label>
        <S.Input
          id="memberEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberTeam">담당 부서</S.Label>
        <S.Input
          id="memberTeam"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
      </S.WriteBox>
    </S.AddMemberBox>
  );
};

export default AddMemberModal;
