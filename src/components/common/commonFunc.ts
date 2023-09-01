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
