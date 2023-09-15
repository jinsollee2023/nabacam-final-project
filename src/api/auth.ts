import { toast } from "react-toastify";
import supabase, { supabaseService } from "../config/supabaseClient";
import { getPhotoURL } from "./User";
import "react-toastify/dist/ReactToastify.css";
import { User } from "src/Types";
import { NavigateFunction } from "react-router-dom";

// 회원탈퇴
export const resign = async (
  userId: string,
  navigate: (path: string) => void
) => {
  try {
    const { error } = await supabaseService.auth.admin.deleteUser(userId);
    window.localStorage.clear();
    if (error) {
      toast.error("회원 탈퇴 중 오류가 발생했습니다.");
    } else {
      await supabase.auth.signOut();

      toast.success("탈퇴 되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  } catch (error) {
    toast.error(
      "회원 탈퇴 중 오류가 발생했습니다. 고객센터에 문의해주세요. error: info."
    );
  }
};

// 유저 데이터 테이블 추가
export const userJoinData = async (
  newUserData: User,
  setUser: (user: User) => void,
  setUserId: (id: string) => void,
  setUserRole: (role: string) => void,
  navigate: NavigateFunction
) => {
  try {
    const { data } = await supabase.from("users").insert(newUserData).select();
    if (data) {
      toast.success("회원가입이 완료되었습니다.");
      setUser(data[0]);
      setUserId(data[0].userId);
      setUserRole(data[0].role);
      navigate("/home");
    }
  } catch (error) {
    console.log(error);
    toast.error("회원가입에 실패하였습니다.");
  }
};

//  회원가입
export const clientSignupHandler = async (
  values: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    workExp: number | null;
    phone: string;
    workField: string;
    workSmallField: string;
    photoFile: File | null | string;
  },
  uploadUserImage: (
    userId: string | undefined,
    file: File
  ) => Promise<{
    path: string;
  }>,
  role: string,
  setUser: (user: User) => void,
  setUserId: (id: string) => void,
  setUserRole: (role: string) => void,
  navigate: NavigateFunction,
  setSubmitButtonClicked: (submitButtonClicked: boolean) => void
) => {
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
  if (!error) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const filePath =
      values.photoFile &&
      (await uploadUserImage(user?.id, values.photoFile as File));
    const photoURL = filePath && (await getPhotoURL(filePath));

    const newUserData: User = {
      userId: user?.id as string,
      name: values.name,
      role: role === "" ? "client" : role,
      photoURL: values.photoFile
        ? `${photoURL}?updated=${new Date().getTime()}`
        : "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users/defaultProfileImage/defaultProfileImage.jpeg",
      workField: {
        workField: values.workField,
        workSmallField: values.workSmallField,
      },
      workExp: values.workExp as number,
      contact: { email: user?.email as string, phone: values.phone },
      signUpDate: new Date(),
      portfolioCount: 0,
    };
    await userJoinData(newUserData, setUser, setUserId, setUserRole, navigate);
  }
  if (error) {
    if (error.message === "User already registered") {
      toast.error("이미 가입된 이메일입니다.");
      setSubmitButtonClicked(false);
    } else {
      toast.error("회원가입에 실패하였습니다.");
      setSubmitButtonClicked(false);
      console.log(error);
    }
  }
};

// 로그아웃
export const logOut = async (navigate: (path: string) => void) => {
  try {
    await supabase.auth.signOut();
    window.localStorage.clear();

    toast.success("로그아웃 되었습니다. 로그인 페이지로 이동합니다.");
    navigate("/login");
  } catch (error) {
    toast.error("로그아웃이 실패했습니다.");
  }
};
