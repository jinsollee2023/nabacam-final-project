import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectOfClientBySort,
  getProjectByClientWithBeforeProgress,
  updateProject,
  getSuggestedFreelancers,
  getOngoingProjects,
  getTerminationedProjects,
  updateApprovalFreelancer,
  deleteVolunteerAndPendingFreelancer,
  deletePendingFreelancer,
} from "src/api/Project";
import { IProjectWithFreelancer, Project } from "src/Types";
import { getUser } from "src/api/User";
import { updatePendingFreelancer } from "../api/Project";

interface useProjectsQueriesProps {
  currentUserId: string;
  sortLabel?: string;
  freelancerId?: string;
  selectedProject?: Project | null;
  volunteer?: string;
  pendingFreelancer?: string;
  projectId?: string;
  userId?: string;
  endDate?: string;
}

const useProjectsQueries = ({
  currentUserId,
  sortLabel,
  freelancerId,
  selectedProject,
  volunteer,
  pendingFreelancer,
  projectId,
  userId,
  endDate,
}: useProjectsQueriesProps) => {
  const { data: projects } = useQuery(
    ["projects", sortLabel],
    async () => {
      const projectsData = await getProjectOfClientBySort(
        currentUserId as string,
        sortLabel as string
      );
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  const addProjectMutation = useMutation((newProject: Project) => addProject(newProject), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const deleteProjectMutation = useMutation((projectId: string) => deleteProject(projectId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const updateProjectMutation = useMutation(
    ({ projectId, newProject }: { projectId: string; newProject: Project }) =>
      updateProject(projectId, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const {
    data: projectDataForSuggestions,
    isLoading: projectDataForSuggestionsIsLoading,
    isError: projectDataForSuggestionsIsError,
    refetch: refetchprojectDataForSuggestions,
  } = useQuery(
    ["currentClientprojectLists"],
    () => getProjectByClientWithBeforeProgress(currentUserId as string),
    {
      enabled: !!currentUserId,
      select: (projectLists) =>
        projectLists?.filter(
          (projectList) => !projectList.SuggestedFreelancers?.includes(freelancerId as string)
        ),
    }
  );

  const {
    data: suggestedFreelancersData,
    isLoading: suggestedFreelancersDataIsLoading,
    isError: suggestedFreelancersDataIsError,
  } = useQuery(["suggestedFreelancersData"], () =>
    getSuggestedFreelancers(selectedProject as Project)
  );

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
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const { data: applicantFreelancers } = useQuery(
    ["applicantFreelancers"],
    async () => {
      const applicantFreelancersData = await getProjectOfClientBySort(
        currentUserId as string,
        "최신순"
      );

      let resultData = [];
      let volunteerUser = [];

      for (const info of applicantFreelancersData) {
        volunteerUser = [];
        if (!info.volunteer) info.volunteer = [];
        for (const data of info.volunteer) {
          volunteerUser.push(await getUser(data));
        }
        resultData.push({ ...info, volunteerUser });
      }

      return resultData;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
    }
  );

  const { data: pendingFreelancers } = useQuery(
    ["pendingFreelancers"],
    async () => {
      const applicantFreelancersData = await getProjectOfClientBySort(
        currentUserId as string,
        "최신순"
      );

      let resultData = [];
      let pendingFreelancerUser = [];

      for (const info of applicantFreelancersData) {
        pendingFreelancerUser = [];
        if (!info.pendingFreelancer) info.pendingFreelancer = [];
        for (const data of info.pendingFreelancer) {
          pendingFreelancerUser.push(await getUser(data));
        }
        resultData.push({ ...info, pendingFreelancerUser });
      }

      return resultData;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
    }
  );

  const updatePendingFreelancerMutation = useMutation(
    ({
      projectId,
      updateVolunteer,
      pendingFreelancer,
    }: {
      projectId: string;
      updateVolunteer: string[];
      pendingFreelancer: string[];
    }) => updatePendingFreelancer(projectId, updateVolunteer, pendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
      },
    }
  );

  const updateFreelancerApprovalMutation = useMutation(
    ({ userId, projectId, endDate }: { userId: string; projectId: string; endDate: string }) =>
      updateApprovalFreelancer(userId, projectId, endDate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
        queryClient.invalidateQueries(["pendingFreelancers"]);
      },
    }
  );

  const deletePendingFreelancerMutation = useMutation(
    ({
      projectId,
      updatePendingFreelancer,
    }: {
      projectId: string;
      updatePendingFreelancer: string[];
    }) => deletePendingFreelancer(projectId, updatePendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pendingFreelancers"]);
      },
    }
  );

  const deleteVolunteerAndPendingFreelancerMutation = useMutation(
    (projectId: string) => deleteVolunteerAndPendingFreelancer(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
      },
    }
  );

  const { data: ongoingProjectsWithFreelancers } = useQuery<IProjectWithFreelancer[]>(
    ["ongoingProjectsWithFreelancers"],
    async () => {
      const ongoingProjectsData = await getOngoingProjects(currentUserId as string);
      const ongoingProjectsWithPromise = ongoingProjectsData.map((info) => ({
        ...info,
        freelancerPromise: getUser(info.freelancerId as string),
      }));
      const ongoingProjectsWithFreelancers = await Promise.all(
        ongoingProjectsWithPromise.map(async (project) => ({
          ...project,
          freelancer: await project.freelancerPromise,
        }))
      );
      // console.log(ongoingProjectsWithFreelancers);
      return ongoingProjectsWithFreelancers;
    },
    {
      enabled: !!currentUserId,
    }
  );

  const { data: terminationedProjectsWithFreelancers } = useQuery<IProjectWithFreelancer[]>(
    ["terminationedProjectsWithFreelancers"],
    async () => {
      const terminationedProjectsData = await getTerminationedProjects(currentUserId as string);
      const terminationedProjectsWithPromise = terminationedProjectsData.map((info) => ({
        ...info,
        freelancerPromise: getUser(info.freelancerId as string),
      }));
      const terminationedProjectsWithFreelancers = await Promise.all(
        terminationedProjectsWithPromise.map(async (project) => ({
          ...project,
          freelancer: await project.freelancerPromise,
        }))
      );
      // console.log(terminationedProjectsWithFreelancers);
      return terminationedProjectsWithFreelancers;
    },
    {
      enabled: !!currentUserId,
    }
  );

  return {
    projects,
    addProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
    suggestedFreelancersData,
    suggestedFreelancersDataIsLoading,
    suggestedFreelancersDataIsError,
    updateSuggestedFreelancersDataMutation,
    applicantFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    pendingFreelancers,
    ongoingProjectsWithFreelancers,
    terminationedProjectsWithFreelancers,
    updatePendingFreelancerMutation,
    deletePendingFreelancerMutation,
  };
};

export default useProjectsQueries;
