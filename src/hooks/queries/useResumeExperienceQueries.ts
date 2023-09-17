import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "../../api/Resume";

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

  const { data: resumeExperienceArray } = useQuery(
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
