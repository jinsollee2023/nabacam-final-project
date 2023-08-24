import { IUser } from "../Types";
import supabase from "../config/supabaseClient";

export const getApplicantFreelancers = async (): Promise<IUser[]> => {
  let ApplicantFreelancersArr = [];

  try {
    // 현재 사용자 세션
    const user = await supabase.auth.getSession();
    // 'projects' 테이블에서 클라이언트의 프로젝트 찾기
    const findByProjects = await supabase
      .from("projects")
      .select()
      .eq("clientId", user.data.session?.user.id);
    // console.log(findByProjects);

    if (findByProjects.data === null) {
      throw new Error("등록된 프로젝트가 없습니다.");
    }

    for (const info of findByProjects.data) {
      // 해당 프로젝트에 지원한 프리랜서 찾기
      const findByApplicantUsers = await supabase
        .from("users")
        .select()
        .in("userId", info.volunteer);

      // 지원한 프리랜서 데이터가 있는 경우, 'ApplicantFreelancersArr'에 추가
      if (findByApplicantUsers.data) {
        ApplicantFreelancersArr.push(
          ...findByApplicantUsers.data.map((x) => {
            return { title: info.title, deadLine: info.deadLine, pay: info.pay, ...x };
          })
        );
      }
    }
    // console.log(ApplicantFreelancersArr);
    return ApplicantFreelancersArr;
  } catch (error) {
    return ApplicantFreelancersArr;
  }
};

export const getPendingFreelancers = async (): Promise<IUser[]> => {
  let PendingFreelancersArr = [];

  try {
    // 현재 사용자 세션
    const user = await supabase.auth.getSession();
    // 'projects' 테이블에서 클라이언트의 프로젝트 찾기
    const findByProjects = await supabase
      .from("projects")
      .select()
      .eq("clientId", user.data.session?.user.id);
    // console.log(findByProjects);

    if (findByProjects.data === null) {
      throw new Error("등록된 프로젝트가 없습니다.");
    }

    for (const info of findByProjects.data) {
      // 보류된 프리랜서 찾기
      const findByPendingUsers = await supabase
        .from("users")
        .select()
        .in("userId", info.pendingFreelancer);

      // 보류된 프리랜서 데이터가 있는 경우, 'PendingFreelancersArr'에 추가
      // if (findByPendingUsers.data && findByPendingUsers.data.length > 0) {
      if (findByPendingUsers.data) {
        PendingFreelancersArr.push(
          ...findByPendingUsers.data.map((x) => {
            return { title: info.title, deadLine: info.deadLine, pay: info.pay, ...x };
          })
        );
      }
    }

    return PendingFreelancersArr;
  } catch (error) {
    return PendingFreelancersArr;
  }
};
