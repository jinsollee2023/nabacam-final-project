import supabase, { supabaseService } from "src/config/supabaseClient";

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
  setFreelancerRole: any
) => {
  try {
    const { data } = await supabase.from("users").insert(newUserData).select();

    if (data) {
      // 추가
      const { role } = data[0];
      if (role) setFreelancerRole(role);
    }
  } catch (error) {
    console.log(error);
  }
};

//  회원가입

export const clientSignupHandler = async (
  values: any,
  uploadUserImage: any,
  role: any,
  workSelect: any,
  setFreelancerRole: any,
  setUserId: any,
  setOpenClientJoin: any,
  navigate: any
) => {
  console.log(values.email);
  console.log(values.password);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 사진을 스토리지에 업로드
    const userImage = await uploadUserImage(user?.id, values.photoURL);
    console.log(user);
    const newUserData = {
      userId: user?.id,
      name: values.name,
      role: role,
      photoURL: values.photoURL,
      workField: { workField: workSelect, workSmallField: values.workField },
      workExp: values.workExp,
      contact: { email: user?.email, phone: values.phone },
    };
    console.log("name", values.name);
    await userJoinData(newUserData, setFreelancerRole);

    if (user?.id) setUserId(user?.id);
    setOpenClientJoin(false);

    navigate("/");
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
