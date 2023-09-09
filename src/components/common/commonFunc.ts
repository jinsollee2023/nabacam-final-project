// 마감 날짜 요일 구하기
export const getDayOfWeek = (date: Date) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  return daysOfWeek[date.getDay()];
};

// 등록일이 오늘 기준 몇 일전인지
export const calculateDaysAgo = (targetDate: Date) => {
  const today = new Date();
  const timeDiff = today.getTime() - targetDate.getTime();
  const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (daysAgo === 1) {
    return "1일 전";
  } else if (daysAgo > 1) {
    return `${daysAgo}일 전`;
  } else {
    return "오늘";
  }
};

export const formatPhoneNumber = (phoneNumber: string) => {
  // 숫자만 추출하고 하이픈 제거
  const digitsOnly = phoneNumber.replace(/[^0-9]/g, "");

  // 전화번호 형식 설정 (최대 11자리까지)
  let phoneNumberFormat = digitsOnly.slice(0, 11).replace(/-/g, "");

  // 11자리일 때는 3-4-4 형식
  if (phoneNumberFormat.length === 11) {
    phoneNumberFormat = phoneNumberFormat.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (phoneNumberFormat.length >= 10) {
    phoneNumberFormat = phoneNumberFormat.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (phoneNumberFormat.length >= 7) {
    phoneNumberFormat = phoneNumberFormat.replace(
      /(\d{3})(\d{3})(\d{1,4})/,
      "$1-$2-$3"
    );
  }

  return phoneNumberFormat;
};

// export
