import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { Project } from "src/Types";
import { getSuggestedFreelancers, updateProject } from "src/api/Project";

interface useSuggestedFreelancersQueriesProps {
  currentUserId?: string;
  freelancerId?: string;
  selectedProject?: Project | null;
}

const useSuggestedFreelancersQueries = ({
  selectedProject,
}: useSuggestedFreelancersQueriesProps) => {
  const {
    data: suggestedFreelancersData,
    isLoading: suggestedFreelancersDataIsLoading,
    isError: suggestedFreelancersDataIsError,
  } = useQuery(
    ["suggestedFreelancersData"],
    () => getSuggestedFreelancers(selectedProject as Project),
    {
      enabled: !!selectedProject,
    }
  );

  // 새롭게 제안한 프리랜서를 해당 프로젝트에 업데이트 해주기..
  const updateSuggestedFreelancersDataMutation = useMutation(
    ({
      projectId,
      updatedSuggestedFreelancers,
    }: {
      projectId: string;
      updatedSuggestedFreelancers: string[];
    }) =>
      updateProject(projectId, {
        SuggestedFreelancers: updatedSuggestedFreelancers,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["suggestedFreelancersData"]);
        queryClient.invalidateQueries(["currentClientprojectLists"]);
      },
    }
  );
  return {
    suggestedFreelancersData,
    suggestedFreelancersDataIsLoading,
    suggestedFreelancersDataIsError,
    updateSuggestedFreelancersDataMutation,
  };
};

export default useSuggestedFreelancersQueries;
