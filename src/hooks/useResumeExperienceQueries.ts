import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../App";
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "../api/ResumeExperience";

/**
 * 마이페이지 경력사항 : C, R, U, D
 * 쿼리키에는 userId (o), experienceId (x) - R에만 넣었습니다 수정해주셔도 됩니다
 */
const useResumeExperienceQueries = ({
  userId,
  experienceId,
}: {
  userId: string;
  experienceId?: string;
}) => {
  const addExperienceMutation = useMutation(addExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries(["resumeExperienceArray", userId]);
    },
  });

  const { status, data: resumeExperienceArray } = useQuery(
    ["resumeExperienceArray", userId, experienceId],
    () => getExperience(userId),
    {
      enabled: !!userId,
    }
  );

  const deleteExperienceMutation = useMutation(
    ({ experienceId, userId }: { experienceId: string; userId: string }) =>
      deleteExperience({ experienceId, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resumeExperienceArray", userId]);
      },
    }
  );

  const updateExperienceMutation = useMutation(
    ({
      userId,
      experienceId,
      newExperience,
    }: {
      userId: string;
      experienceId: string;
      newExperience: {
        pastWorkField: string;
        pastEmploymentType: string;
        pastWorkDuration: {
          pastWorkEndDate: string;
          pastWorkStartDate: string;
        };
        pastWorkPlace: string;
        pastWorkPosition: string;
      };
    }) => updateExperience({ userId, experienceId, newExperience }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resumeExperienceArray", userId]);
      },
    }
  );

  return {
    addExperienceMutation,
    deleteExperienceMutation,
    updateExperienceMutation,
    resumeExperienceArray,
  };
};

export default useResumeExperienceQueries;
