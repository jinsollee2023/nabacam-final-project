import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "src/App";
import { addExperience, deleteExperience, getExperience } from "src/api/Resume";

const useExperienceQueries = (userId: string) => {
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
    (userId: string) => deleteExperience(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experienceData"]);
      },
    }
  );

  return {
    addExperienceMutation,
    deleteExperienceMutation,
    experienceData,
  };
};

export default useExperienceQueries;
