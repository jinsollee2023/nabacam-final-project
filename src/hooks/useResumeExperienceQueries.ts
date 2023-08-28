import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "src/App";
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "src/api/ResumeExperience";

const useResumeExperienceQueries = (userId: string) => {
  const addExperienceMutation = useMutation(addExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries(["experienceData", userId]);
    },
  });

  const { status, data: experienceData } = useQuery(
    ["experienceData", userId],
    () => getExperience(userId),
    {
      enabled: !!userId,
    }
  );

  const deleteExperienceMutation = useMutation(
    ({ userId, experienceId }: { userId: string; experienceId: string }) =>
      deleteExperience({ userId, experienceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experienceData"]);
      },
    }
  );

  const updateExperienceMutation = useMutation(
    ({
      userId,
      experienceId,
      updatedData,
    }: {
      userId: string;
      experienceId: string;
      updatedData: {
        pastWorkField: string;
        pastEmploymentType: string;
        pastWorkDuration: {
          pastWorkEndDate: string;
          pastWorkStartDate: string;
        };
        pastWorkPlace: string;
        pastWorkPosition: string;
      };
    }) => updateExperience({ userId, experienceId, updatedData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experienceData"]);
      },
    }
  );

  return {
    addExperienceMutation,
    deleteExperienceMutation,
    updateExperienceMutation,
    experienceData,
  };
};

export default useResumeExperienceQueries;
