import { IUser } from "../Types";
import supabase from "../config/supabaseClient";

export const getApplicantFreelancers = async (): Promise<IUser[]> => {
  let usersArr = [];

  try {
    // 현재 사용자 세션
    const user = await supabase.auth.getSession();
    // 'projects' 테이블에서 클라이언트의 프로젝트 찾기
    const findByProjects = await supabase
      .from("projects")
      .select()
      .eq("clientId", user.data.session?.user.id);
    console.log(findByProjects);

    if (findByProjects.data === null) {
      throw new Error("등록된 프로젝트가 없습니다.");
    }

    for (const info of findByProjects.data) {
      // 'users' 테이블에서 해당 프로젝트에 지원한 프리랜서 찾기
      const findByUsers = await supabase.from("users").select().in("userId", info.volunteer);

      // 프리랜서 데이터가 있는 경우, 'usersArr'에 추가
      if (findByUsers.data) {
        usersArr.push(
          ...findByUsers.data.map((x) => {
            return { title: info.title, ...x };
          })
        );
      }
    }

    return usersArr;
  } catch (error) {
    throw new Error("지원한 프리랜서 목록을 가져오지 못했습니다.");
  }
};
