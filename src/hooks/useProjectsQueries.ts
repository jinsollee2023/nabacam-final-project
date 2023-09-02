import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectOfClientBySort,
  getProjectByClientWithBeforeProgress,
  updateProject,
  getSuggestedFreelancers,
  getProjectOfFreelancerBySort,
  getProjects,
  getOngoingProjects,
  getTerminationedProjects,
  updateApprovalFreelancer,
  deleteVolunteerAndPendingFreelancer,
  deletePendingFreelancer,
  getTerminationedProjectsWithFreelancer,
  getProjectsOfFreelancer,
} from "../api/Project";
import { IProjectWithFreelancer, Project } from "../Types";
import { addProjectIdToUser, getUser } from "../api/User";
import { updatePendingFreelancer } from "../api/Project";
import { Dispatch, SetStateAction } from "react";

interface useProjectsQueriesProps {
  currentUserId: string;
  sortLabel?: string;
  freelancerId?: string;
  selectedProject?: Project | null;
}

const useProjectsQueries = ({
  currentUserId,
  sortLabel,
  freelancerId,
  selectedProject,
}: useProjectsQueriesProps) => {
  const { data: projectsOfClient } = useQuery(
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

  const { data: projectsOfFreelancer } = useQuery(
    ["projects"],
    async () => {
      const projectsData = await getProjectsOfFreelancer(
        currentUserId as string
      );
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  // 지원한 프로젝트 확인에 사용
  const {
    data: appliedProjectList,
    isError: appliedProjectListIsError,
    isLoading: appliedProjectListIsLoading,
  } = useQuery(
    ["projectList"],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
      select: (allProjectList) =>
        allProjectList?.filter(
          (project) =>
            project.volunteer?.includes(currentUserId) ||
            project.pendingFreelancer?.includes(currentUserId)
        ),
    }
  );

  const {
    data: allProjectList,
    isError: allProjectListIsError,
    isLoading: allProjectListIsLoading,
  } = useQuery(
    ["allprojectList"],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  // 제안 받은 프로젝트 확인에 사용
  const {
    data: suggestedProjectList,
    isError: suggestedProjectListIsError,
    isLoading: suggestedProjectListIsLoading,
  } = useQuery(
    ["projectList", updateProject],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
      select: (allProjectList) =>
        allProjectList?.filter((project) =>
          project.SuggestedFreelancers?.includes(currentUserId)
        ),
    }
  );

  const addProjectMutation = useMutation(
    (newProject: Project) => addProject(newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const deleteProjectMutation = useMutation(
    (projectId: string) => deleteProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const updateProjectMutation = useMutation(
    ({ projectId, newProject }: { projectId: string; newProject: Project }) =>
      updateProject(projectId, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["projectsListBySort"]);
        queryClient.invalidateQueries(["projectList"]);
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
          (projectList) =>
            !projectList.SuggestedFreelancers?.includes(freelancerId as string)
        ),
    }
  );

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

  const {
    data: projectsListBySort,
    error: projectListIsError,
    isLoading: projectListIsLoading,
  } = useQuery(["projectsListBySort", sortLabel], async () => {
    const projectList = await getProjectOfFreelancerBySort(sortLabel as string);
    return projectList;
  });

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
    }) =>
      updatePendingFreelancer(projectId, updateVolunteer, pendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
      },
    }
  );

  const updateFreelancerApprovalMutation = useMutation(
    ({
      userId,
      projectId,
      endDate,
    }: {
      userId: string;
      projectId: string;
      endDate: string;
    }) => updateApprovalFreelancer(userId, projectId, endDate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
        queryClient.invalidateQueries(["pendingFreelancers"]);
      },
    }
  );

  const addProjectIdToUserMutation = useMutation(
    ({ userId, projectIds }: { userId: string; projectIds: string[] }) =>
      addProjectIdToUser(userId, projectIds),
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
    ({
      projectId,
      updateVolunteer,
      updatePendingFreelancer,
    }: {
      projectId: string;
      updateVolunteer: string[];
      updatePendingFreelancer: string[];
    }) =>
      deleteVolunteerAndPendingFreelancer(
        projectId,
        updateVolunteer,
        updatePendingFreelancer
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["applicantFreelancers"]);
        queryClient.invalidateQueries(["pendingFreelancers"]);
      },
    }
  );

  const { data: ongoingProjectsWithFreelancers } = useQuery<
    IProjectWithFreelancer[]
  >(
    ["ongoingProjectsWithFreelancers"],
    async () => {
      const ongoingProjectsData = await getOngoingProjects(
        currentUserId as string
      );
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

  const { data: terminationedProjectsWithFreelancers } = useQuery<
    IProjectWithFreelancer[]
  >(
    ["terminationedProjectsWithFreelancers"],
    async () => {
      const terminationedProjectsData = await getTerminationedProjects(
        currentUserId as string
      );
      const terminationedProjectsWithPromise = terminationedProjectsData.map(
        (info) => ({
          ...info,
          freelancerPromise: getUser(info.freelancerId as string),
        })
      );
      const terminationedProjectsWithFreelancers = await Promise.all(
        terminationedProjectsWithPromise.map(async (project) => ({
          ...project,
          freelancer: await project.freelancerPromise,
        }))
      );
      return terminationedProjectsWithFreelancers;
    },
    {
      enabled: !!currentUserId,
    }
  );

  const { data: matchingCompletedProjectsData } = useQuery(
    ["matchingCompletedProjectsData"],
    async () => {
      const terminationedProjects =
        await getTerminationedProjectsWithFreelancer(
          currentUserId as string,
          freelancerId as string
        );
      if (!terminationedProjects) {
        return [];
      }
      return terminationedProjects;
    },
    {
      enabled: !!currentUserId && !!freelancerId,
    }
  );

  return {
    projectsOfClient,
    projectsOfFreelancer,
    appliedProjectList,
    appliedProjectListIsError,
    appliedProjectListIsLoading,
    suggestedProjectList,
    suggestedProjectListIsError,
    suggestedProjectListIsLoading,
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
    projectsListBySort,
    projectListIsError,
    projectListIsLoading,
    applicantFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    pendingFreelancers,
    ongoingProjectsWithFreelancers,
    terminationedProjectsWithFreelancers,
    updatePendingFreelancerMutation,
    deletePendingFreelancerMutation,
    allProjectList,
    matchingCompletedProjectsData,
    addProjectIdToUserMutation,
  };
};

export default useProjectsQueries;
