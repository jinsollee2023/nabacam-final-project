import React from "react";

interface initialErrorsForm {
  email: string;
  password: string;
  passwordConfirmCurrent: string;
  name: string;
  phone: string;
}

// validation 함수 erros의 초기값 설정

const Validation = (values: initialErrorsForm) => {
  const errors = {
    email: "",
    password: "",
    passwordConfirmCurrent: "",
    name: "",
    phone: "",
  };
  //   첫글자 영어 소대문자 숫자 두번째부터 -_. 들어갈수있고 @ 있어야하고 앞이랑 똑같이 @ 뒤에 붙게되며  .이 한개는 들어가게되면서 .com 같이 2~3글자 자리가있다
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  //   영문 숫자 포함 8자 ~25
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  //   앞자리 010 중간 자리 0~9 숫자로 3~4글자  0~9 4글자
  const phoneReg = /^(\d{3}-\d{4}-\d{4}|\d{3}-\d{3}-\d{4})$/;

  if (values.email === "") {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegEx.test(values.email)) {
    errors.email = "이메일 형식에 맞지 않습니다.";
  }
  if (values.password === "") {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (!passwordReg.test(values.password)) {
    errors.password = " 영문과 숫자가 포함된 8자리 이상 비밀번호";
  }

  if (values.passwordConfirmCurrent !== values.password) {
    errors.passwordConfirmCurrent = " 비밀번호가 틀립니다. 다시 확인해주세요.";
  }

  if (values.phone === "") {
    errors.phone = "전화번호를 입력해주세요";
  } else if (!phoneReg.test(values.phone)) {
    errors.phone = "010 으로 시작하는 핸드폰번호 10자리~ 11자리";
  }

  if (values.name === "") {
    errors.name = "이름을 입력해주세요";
  }

  return errors;
};

export default Validation;
