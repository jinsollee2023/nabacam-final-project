import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "src/App";
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "src/api/ResumeExperience";

const useResumeExperienceQueries = ({
  userId,
  experienceId,
}: {
  userId: string;
  experienceId?: string;
}) => {
  const addExperienceMutation = useMutation(addExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "resumeExperienceArray",
        userId,
        experienceId,
      ]); // queryClient.invalidateQueries를 호출할 때 사용하는 키
    },
  });

  const { status, data: resumeExperienceArray } = useQuery(
    ["resumeExperienceArray", userId], // useQuery 키
    () => getExperience(userId),
    {
      enabled: !!userId || !!experienceId,
    }
  );

  const deleteExperienceMutation = useMutation(
    ({ experienceId, userId }: { experienceId: string; userId: string }) =>
      deleteExperience({ experienceId, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "resumeExperienceArray",
          userId,
          experienceId,
        ]);
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
          pastWorkEndDate: Date;
          pastWorkStartDate: Date;
        };
        pastWorkPlace: string;
        pastWorkPosition: string;
      };
    }) => updateExperience({ userId, experienceId, newExperience }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "resumeExperienceArray",
          userId,
          experienceId,
        ]);
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
