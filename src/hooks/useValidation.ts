import React from "react";

const useValidation = () => {
  //   첫글자 영어 소대문자 숫자 두번째부터 -_. 들어갈수있고 @ 있어야하고 앞이랑 똑같이 @ 뒤에 붙게되며  .이 한개는 들어가게되면서 .com 같이 2~3글자 자리가있다
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  //   영문 숫자 포함 8자 ~25
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  //   앞자리 010 중간 자리 0~9 숫자로 3~4글자  0~9 4글자
  const phoneReg = /^(\d{3}-\d{4}-\d{4}|\d{3}-\d{3}-\d{4})$/;
  const nameReg = /^[가-힣]{2,8}$/;
  const workExpReg = /^[0-9]{1,2}$/;

  const validateEmail = (email: string) => {
    if (email === "") {
      return "이메일을 입력해주세요.";
    } else if (!emailRegEx.test(email)) {
      return "이메일 형식에 맞지 않습니다.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password === "") {
      return "비밀번호를 입력해주세요.";
    } else if (!passwordReg.test(password)) {
      return "영문과 숫자가 포함된 8자리 이상 비밀번호를 입력해주세요.";
    }
    return "";
  };

  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string
  ) => {
    if (passwordConfirm === "") {
      return "비밀번호 확인을 입력해주세요.";
    } else if (passwordConfirm !== password) {
      return "입력하신 비밀번호와 다릅니다. 다시 확인해주세요.";
    }
    return "";
  };

  const validateName = (name: string) => {
    if (name === "") {
      return "이름을 입력해주세요.";
    } else if (!nameReg.test(name)) {
      return "한글로된 2자에서 8자사이의 성함을 작성해주세요.";
    }
    return "";
  };

  const validateWorkSmallField = (workSmallField: string) => {
    if (workSmallField === "") {
      return "상세 작업 영역을 입력해주세요";
    }
    return "";
  };

  const validateWorkExp = (workExp: string) => {
    console.log(workExp);
    if (!workExp) {
      return "경력/연차를 입력해주세요.";
    } else if (!workExpReg.test(workExp)) {
      return "2자 이내의 숫자로 입력해주세요.";
    }
    return "";
  };

  const validatePhone = (phone: string) => {
    if (phone === "") {
      return "전화번호를 입력해주세요.";
    } else if (!phoneReg.test(phone)) {
      return "전화번호 10자리~ 11자리로 입력해주세요.";
    }
    return "";
  };

  const validateTeam = (team: string) => {
    if (team === "") {
      return "소속된 팀을 입력해주세요.";
    } else if (team.length > 15) {
      return "15자 이내로 입력해주세요.";
    }
    return "";
  };

  const validateInput = (key: string, value: string | File) => {
    if (!value) {
      return `${key}을/를 입력해주세요.`;
    }
    return "";
  };

  const validateSelect = (key: string, value: string) => {
    if (value === "") {
      return `${key}을/를 선택해주세요.`;
    }
    return "";
  };

  const validateDate = (key: string, value: string) => {
    if (!value) {
      return `${key}을/를 선택해주세요.`;
    }
    return "";
  };

  const validateWorkDuration = (startDate: string, endDate: string) => {
    const hireDate = new Date(startDate);
    const quitDate = new Date(endDate);
    if (!startDate || !endDate) {
      return "근무 기간을 입력해주세요.";
    } else if (quitDate < hireDate) {
      return "퇴사일은 입사일보다 이후여야 합니다.";
    }
    return "";
  };

  const validatePay = (min: number | string, max: number | string) => {
    if (!min || !max) {
      return "급여를 입력해주세요.";
    } else if (
      min !== "상의 후 결정" &&
      max !== "상의 후 결정" &&
      Number(min) > Number(max)
    ) {
      return "최대 급여는 최소 급여보다 낮을 수 없습니다.";
    }
    return "";
  };

  return {
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateName,
    validateWorkSmallField,
    validateWorkExp,
    validatePhone,
    validateTeam,
    validateInput,
    validateSelect,
    validateDate,
    validatePay,
    validateWorkDuration,
  };
};

export default useValidation;
