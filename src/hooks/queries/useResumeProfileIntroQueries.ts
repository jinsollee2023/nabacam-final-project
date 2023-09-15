import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import {
  addFreelancerResumeProfileIntro,
  getFreelancerResumeProfileIntro,
  updateFreelancerResumeProfileIntro,
} from "../../api/Resume";

/** 마이페이지 이력서 프로필 소개글 : C, R, U*/
const useResumeProfileIntroQueries = (userId: string) => {
  const addProfileIntroMutation = useMutation(addFreelancerResumeProfileIntro, {
    onSuccess: () => {
      queryClient.invalidateQueries(["resumeProfileIntroObject", userId]);
    },
  });

  const { data: resumeProfileIntroObject } = useQuery(
    ["resumeProfileIntroObject", userId],
    () => getFreelancerResumeProfileIntro(userId),
    {
      enabled: !!userId,
    }
  );

  const updateProfileIntroMutation = useMutation(
    updateFreelancerResumeProfileIntro,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resumeProfileIntroObject", userId]);
      },
    }
  );

  return {
    addProfileIntroMutation,
    updateProfileIntroMutation,
    resumeProfileIntroObject,
  };
};
export default useResumeProfileIntroQueries;
