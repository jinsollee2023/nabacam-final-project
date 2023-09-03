import React, { useEffect, useState } from "react";
import { Select } from "antd";
import PreviewImage from "./PreviewImage";
import { uploadUserImage } from "../../../api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../zustand/useUserStore";
import { clientSignupHandler } from "../../../api/auth";
import Validation from "./Validation";
import { styled } from "styled-components";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface JoinFormProps {
  // freelancerOpen: boolean;
  role: string;
}

// 회원가입
const JoinForm = ({ role }: JoinFormProps) => {
  // useinput

  const initialValues: any = {
    email: "",
    name: "",
    workExp: 0,
    phone: "",
  };

  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState<File>();
  const [values, setValues] = useState(initialValues);
  const [openClientJoin, setOpenClientJoin] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [workSelect, setWorkSelect] = useState("");
  const [modal, setModal] = useState(false);
  const { setUser } = useUserStore(); // 추가
  const check =
    errors.email &&
    errors.password &&
    errors.passwordConfirmCurrent &&
    errors.name &&
    errors.phone;
  const onChange = (value: string) => {
    setWorkSelect(value);
  };

  // 회원가입 api

  const signUP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (
      !errors.email &&
      !errors.password &&
      !errors.passwordConfirmCurrent &&
      !errors.name &&
      !errors.phone
    ) {
      await clientSignupHandler(
        values,
        photoFile,
        uploadUserImage,
        role,
        workSelect,
        setUser,

        navigate
      );
    }
  };

  //  순수 useState handler

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  const openModalHandler = () => {
    setModal(!modal);
  };
  // 미리보기 핸들러
  const handlePhotoURLOnChange = (file: File) => {
    setPhotoFile(file);
  };
  // 비밀번호 표시
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };

  // 모달

  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  return (
    <>
      <S.JoinFormContainer>
        <S.JoinForm>
          {openClientJoin && (
            <form onSubmit={(e) => signUP(e)}>
              <PreviewImage
                handlePhotoURLOnChange={handlePhotoURLOnChange}
                defaultImage={JoinDefaultImage}
              />
              <S.InputWrapper>
                <label
                  htmlFor="emailInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 이메일
                </label>
                <S.JoinInput
                  id="emailInput"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <S.errordiv>{errors.email && <p>{errors.email}</p>}</S.errordiv>

                <label
                  htmlFor="passwordInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 비밀번호
                </label>
                <S.JoinInput
                  id="passwordInput"
                  type={showPswd ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <S.errordiv>
                  {errors.password && <p>{errors.password}</p>}
                </S.errordiv>

                <label
                  htmlFor="checkPasswordInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 비밀번호 확인
                </label>

                <S.JoinInput
                  id="checkPasswordInput"
                  type={showPswd ? "text" : "password"}
                  name="passwordConfirmCurrent"
                  value={values.passwordConfirmCurrent}
                  onChange={handleChange}
                />

                <S.errordiv>
                  {errors.passwordConfirmCurrent && (
                    <p>{errors.passwordConfirmCurrent}</p>
                  )}
                </S.errordiv>

                <label
                  htmlFor="nameInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 이름
                </label>

                <S.JoinInput
                  id="nameInput"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <div>{errors.name && <p>{errors.name}</p>}</div>

                {role === "freelancer" && (
                  <>
                    <label
                      htmlFor="workFieldInput"
                      style={{
                        color: "var(--darker-gray)",
                        marginBottom: "10px",
                      }}
                    >
                      * 작업영역
                    </label>
                    <Select
                      id="workFieldInput"
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={onChange}
                      options={[
                        {
                          value: "개발",
                          label: "개발",
                        },
                        {
                          value: "디자인",
                          label: "디자인",
                        },
                        {
                          value: "운영",
                          label: "운영",
                        },
                        {
                          value: "기획",
                          label: "기획",
                        },
                        {
                          value: "기타",
                          label: "기타",
                        },
                      ]}
                    />
                    <label
                      htmlFor="workSmallFieldInput"
                      style={{ color: "var(--darker-gray)" }}
                    >
                      * 작업 영역 (상세)
                    </label>

                    <S.JoinInput
                      id="workSmallFieldInput"
                      type="text"
                      name="workField"
                      value={values.workField}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="workExpInput"
                      style={{ color: "var(--darker-gray)" }}
                    >
                      * 경험/연차 (숫자만 입력 가능합니다.)
                    </label>
                    <S.JoinInput
                      id="workExpInput"
                      type="number"
                      name="workExp"
                      value={values.workExp}
                      onChange={handleChange}
                    />
                  </>
                )}

                <label
                  htmlFor="phoneNumberInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 전화번호
                </label>
                <S.JoinInput
                  id="phoneNumberInput"
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
                <div>{errors.phone && <p>{errors.phone}</p>}</div>
                <br />
              </S.InputWrapper>

              <S.JoinButton>
                {role !== "freelancer"
                  ? "클라이언트 회원가입"
                  : "프리랜서 회원가입"}
              </S.JoinButton>
            </form>
          )}
          <S.passwordView onClick={showPasswordHandler}>
            {showPswd ? (
              <EyeOutlined onClick={showPasswordHandler} />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </S.passwordView>

          <br />
          <div>
            <S.passwordFindButton onClick={openModalHandler}>
              비밀번호찾기
            </S.passwordFindButton>
            {modal && <EmailCheck openModal={openModalHandler} />}
          </div>
        </S.JoinForm>
      </S.JoinFormContainer>
    </>
  );
};

export default JoinForm;

const S = {
  JoinFormContainer: styled.div`
    width: 54vw;
    position: relative;
  `,
  JoinForm: styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  JoinInput: styled.input`
    border: none;
    border-bottom: 1px solid var(--lighter-gray);
    left: 10%;
    width: 400px;
    padding: 10px;
    outline: none;
    font-size: 12px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  JoinButton: styled.button`
    width: 417px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background-color: var(--main-blue);
    cursor: pointer;
    color: white;
  `,
  passwordFindButton: styled.button`
    width: 417px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: transparent;
  `,
  passwordView: styled.button`
    position: fixed;
    top: 21%;
    left: 53.5%;
    width: 2%;
    height: 2%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  `,
  errordiv: styled.div`
    height: 20px;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
