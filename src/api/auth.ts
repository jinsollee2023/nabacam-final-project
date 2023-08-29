import { useNavigate } from "react-router-dom";
import supabase, { supabaseService } from "src/config/supabaseClient";
import { getPhotoURL } from "./User";
// 회원탈퇴

export const Resign = async (userId: any) => {
  const isConfirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");

  if (isConfirmed && userId !== undefined) {
    try {
      const { error } = await supabaseService.auth.admin.deleteUser(userId);
      if (error) {
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      } else {
        await supabase.auth.signOut();

        alert("탈퇴 되었습니다. 로그인 페이지로 이동합니다.");
      }
    } catch (error) {
      alert(
        "회원 탈퇴 중 오류가 발생했습니다. 고객센터에 문의해주세요. error: info."
      );
    }
  }
};

// 유저 데이터 테이블 추가

export const userJoinData = async (
  newUserData: any,
  setUser: any,
  navigate: any
) => {
  try {
    const { data } = await supabase.from("users").insert(newUserData).select();
    if (data) {
      setUser(data[0]);
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

//  회원가입

export const clientSignupHandler = async (
  values: any,
  photoFile: any,
  uploadUserImage: any,
  role: string,
  workSelect: string,
  setUser: any,
  // setOpenClientJoin: any
  navigate: any
) => {
  try {
    await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 사진을 스토리지에 업로드
    const filePath = await uploadUserImage(user?.id, photoFile);
    const photoURL = await getPhotoURL(filePath);

    const newUserData = {
      userId: user?.id,
      name: values.name,
      role: role === "" ? "client" : role,
      photoURL: photoFile
        ? `${photoURL}?updated=${new Date().getTime()}`
        : "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users/defaultProfileImage/defaultProfileImage.jpeg",
      workField: { workField: workSelect, workSmallField: values.workField },
      workExp: values.workExp,
      contact: { email: user?.email, phone: values.phone },
    };
    await userJoinData(newUserData, setUser, navigate);

    // setOpenClientJoin(false);

    // navigate("/");
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃
export const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
  } catch (error) {
    alert(error);
  }
};
