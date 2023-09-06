import React from "react";

interface LoginForm {
  email: string;
  password: string;
}

const LoginValidation = (values: LoginForm) => {
  const errors = {
    email: "",
    password: "",
  };
  //   첫글자 영어 소대문자 숫자 두번째부터 -_. 들어갈수있고 @ 있어야하고 앞이랑 똑같이 @ 뒤에 붙게되며  .이 한개는 들어가게되면서 .com 같이 2~3글자 자리가있다
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  //   영문 숫자 포함 8자 ~25
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  if (values.email === "") {
    errors.email = "이름을 입력해주세요";
  } else if (!emailRegEx.test(values.email)) {
    errors.email = "이메일 형식에 맞지 않습니다.";
  }
  if (values.password === "") {
    errors.password = "비밀번호 를 입력해주세요";
  } else if (!passwordReg.test(values.password)) {
    errors.password = " 영문 숫자 가 들어간 8자리 이상 비밀번호";
  }

  return errors;
};

export default LoginValidation;
