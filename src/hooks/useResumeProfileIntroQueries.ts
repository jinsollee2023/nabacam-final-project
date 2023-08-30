import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "src/App";
import {
  addFreelancerResumeProfileIntro,
  getFreelancerResumeProfileIntro,
  updateFreelancerResumeProfileIntro,
} from "src/api/ResumeProfileIntro";

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
