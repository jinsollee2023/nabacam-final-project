import supabase from "src/config/supabaseClient";
import { TRoom } from "../chat/Room";

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

/** sendDM 공통함수 */
const checkDuplicateRoomId = async ({
  DMfreelancerId,
  DMclientId,
}: {
  DMfreelancerId: string;
  DMclientId: string;
}) => {
  const { data, error } = await supabase
    .from("room_participants")
    .select("room_id")
    .match({
      receiver_id: DMclientId,
      user_id: DMfreelancerId,
    })
    .single();

  return data ? data.room_id : null;
};

export const sendDM = async ({
  DMfreelancerName,
  DMclientName,
  DMfreelancerId,
  DMclientId,
  navigate,
  setCreatedRoomId,
  setSelectedRoom,
}: {
  DMfreelancerName: string;
  DMclientName: string;
  DMfreelancerId: string;
  DMclientId: string;
  navigate: (path: string) => void;
  setCreatedRoomId: (roomId: string) => void;
  setSelectedRoom: (room: TRoom | null) => void;
}) => {
  // 중복 방 여부 확인
  const result = await checkDuplicateRoomId({ DMfreelancerId, DMclientId });

  if (result !== null) {
    navigate("/chat");
    return;
  }

  // 중복 없을 경우 새로운 방 생성
  const { data, error } = await supabase.rpc("create_room2", {
    roomname: `${DMfreelancerName}, ${DMclientName}`,
    user_id: DMfreelancerId,
    receiver_id: DMclientId,
  });

  if (data) {
    const room_id = data.room_id;
    setCreatedRoomId(room_id);
    setSelectedRoom(data);
  }
  navigate("/chat");
};
