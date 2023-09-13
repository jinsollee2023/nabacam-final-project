import { useEffect, useState } from "react";
import { Member } from "src/Types";
import { S } from "./addMemberModal.style";
import { formatPhoneNumber } from "src/components/common/commonFunc";
import { useUserStore } from "src/store/useUserStore";
import useValidation from "src/hooks/useValidation";
import { Errors } from "./MemberList";

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
  const [values, setValues] = useState(initialValues);

  const { validateName, validateTeam, validateEmail, validatePhone } =
    useValidation();

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
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
      {values.name === "" ? (
        <S.ModalTitle>기업 구성원 추가하기</S.ModalTitle>
      ) : (
        <S.ModalTitle>기업 구성원 수정하기</S.ModalTitle>
      )}

      <S.ClientInfo>
        <S.ProfileImgBox>
          <S.ProfileImg alt="profileImg" src={user.photoURL} />
        </S.ProfileImgBox>
      </S.ClientInfo>
      <S.WriteBox>
        <S.Label htmlFor="memberName">이름</S.Label>
        <S.Input
          id="memberName"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => {
            const nameError = validateName(e.target.value);
            setErrors({ ...errors, name: nameError });
          }}
        />
        <S.ErrorMessage hasError={!!errors.name}>
          {errors.name && <p>{errors.name}</p>}
        </S.ErrorMessage>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberPhone">전화번호</S.Label>
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
        <S.ErrorMessage hasError={!!errors.phone}>
          {errors.phone && <p>{errors.phone}</p>}
        </S.ErrorMessage>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberEmail">이메일</S.Label>
        <S.Input
          id="memberEmail"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={(e) => {
            const emailError = validateEmail(e.target.value);
            setErrors({ ...errors, email: emailError });
          }}
        />
        <S.ErrorMessage hasError={!!errors.email}>
          {errors.email && <p>{errors.email}</p>}
        </S.ErrorMessage>
      </S.WriteBox>
      <S.WriteBox>
        <S.Label htmlFor="memberTeam">담당 부서</S.Label>
        <S.Input
          id="memberTeam"
          value={values.team}
          onChange={(e) => handleChange("team", e.target.value)}
          onBlur={(e) => {
            const teamError = validateTeam(e.target.value);
            setErrors({ ...errors, team: teamError });
          }}
        />
        <S.ErrorMessage hasError={!!errors.team}>
          {errors.team && <p>{errors.team}</p>}
        </S.ErrorMessage>
      </S.WriteBox>
    </S.AddMemberBox>
  );
};

export default AddMemberModal;
