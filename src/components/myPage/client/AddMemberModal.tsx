import { useEffect, useState } from "react";
import { Member } from "src/Types";
import { S } from "./addMemberModal.style";
import { formatPhoneNumber } from "src/components/common/commonFunc";
import { useUserStore } from "src/store/useUserStore";
import useValidation from "src/hooks/useValidation";
import { Errors } from "./MemberList";
import useMemberValuesStore from "src/store/useMemberModal";

interface AddMemberModalProps {
  currentMemberData?: Member;
  setUpdateMemberData: (updatdMemberData: Member) => void;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}

const AddMemberModal = ({
  currentMemberData,
  setUpdateMemberData,
  errors,
  setErrors,
}: AddMemberModalProps) => {
  const { user } = useUserStore();
  const initialValues = {
    name: currentMemberData ? currentMemberData.name : "",
    team: currentMemberData ? currentMemberData.team : "",
    email: currentMemberData ? currentMemberData.contact.email : "",
    phone: currentMemberData ? currentMemberData.contact.phone : "",
  };
  const { values, setMamber } = useMemberValuesStore();

  const { validateName, validateTeam, validateEmail, validatePhone } =
    useValidation();

  const handleChange = (key: string, value: string) => {
    setMamber({ ...values, [key]: value });
  };

  useEffect(() => {
    setUpdateMemberData({
      name: values.name,
      team: values.team,
      contact: {
        email: values.email,
        phone: values.phone,
      },
    });
  }, [values]);

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
        <div>
          <S.Input
            id="memberName"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={(e) => {
              const nameError = validateName(e.target.value);
              setErrors({ ...errors, name: nameError });
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberPhone">전화번호</S.Label>
        <div>
          <S.Input
            id="memberPhone"
            value={values.phone}
            onChange={(e) =>
              handleChange("phone", formatPhoneNumber(e.target.value))
            }
            onBlur={(e) => {
              const phoneError = validatePhone(e.target.value);
              setErrors({ ...errors, phone: phoneError });
            }}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberEmail">이메일</S.Label>
        <div>
          <S.Input
            id="memberEmail"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => {
              const emailError = validateEmail(e.target.value);
              setErrors({ ...errors, email: emailError });
            }}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberTeam">담당 부서</S.Label>
        <div>
          <S.Input
            id="memberTeam"
            value={values.team}
            onChange={(e) => handleChange("team", e.target.value)}
            onBlur={(e) => {
              const teamError = validateTeam(e.target.value);
              setErrors({ ...errors, team: teamError });
            }}
          />
          {errors.team && <p>{errors.team}</p>}
        </div>
      </S.WriteBox>
    </S.AddMemberBox>
  );
};

export default AddMemberModal;
