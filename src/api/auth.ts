import supabase, { supabaseService } from "../config/supabaseClient";
import { getPhotoURL } from "./User";
// 회원탈퇴

export const resign = async (
  userId: string,
  navigate: (path: string) => void
) => {
  const isConfirmed = window.confirm(
    "회원 탈퇴시 모든 정보가 삭제되며, 삭제된 정보는 복구가 불가능합니다. \n회원 탈퇴하시겠습니까?"
  );

  if (isConfirmed && userId !== undefined) {
    try {
      const { error } = await supabaseService.auth.admin.deleteUser(userId);
      if (error) {
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      } else {
        await supabase.auth.signOut();

        alert("탈퇴 되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
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
  setUserId: any,
  setUserRole: any,
  navigate: any
) => {
  try {
    const { data } = await supabase.from("users").insert(newUserData).select();
    if (data) {
      setUser(data[0]);
      setUserId(data[0].userId);
      setUserRole(data[0].role);
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

//  회원가입

export const clientSignupHandler = async (
  values: {
    email: string;
    password: string;
    passwordConfirmCurrent: string;
    name: string;
    workExp: number;
    phone: string;
    category: string;
    workField: string;
    photoFile: File | null;
  },
  uploadUserImage: any,
  role: string,
  setUser: any,
  setUserId: any,
  setUserRole: any,
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
    const filePath = await uploadUserImage(user?.id, values.photoFile);
    const photoURL = await getPhotoURL(filePath);

    const newUserData = {
      userId: user?.id,
      name: values.name,
      role: role === "" ? "client" : role,
      photoURL: values.photoFile
        ? `${photoURL}?updated=${new Date().getTime()}`
        : "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users/defaultProfileImage/defaultProfileImage.jpeg",
      workField: {
        workField: values.category,
        workSmallField: values.workField,
      },
      workExp: values.workExp,
      contact: { email: user?.email, phone: values.phone },
    };
    await userJoinData(newUserData, setUser, setUserId, setUserRole, navigate);
    alert("회원가입이 완료되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃
export const logOut = async (navigate: (path: string) => void) => {
  const isConfirmed = window.confirm("정말로 로그아웃 하시겠습니까?");
  if (isConfirmed) {
    try {
      await supabase.auth.signOut();
      alert("로그아웃 되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  }
};
