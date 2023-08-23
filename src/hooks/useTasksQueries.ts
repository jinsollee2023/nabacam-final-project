import { useMutation, useQuery } from "@tanstack/react-query";
import { addTasks, deleteTask, getTasks, updateTask } from "../api/Task";
import { queryClient } from "../App";

const useTasksQueries = (projectId: string) => {
  const { data: tasks } = useQuery(
    ["tasks", projectId],
    async () => {
      const tasksData = await getTasks(projectId);
      return tasksData;
    },
    { enabled: !!projectId }
  );

  const addTaskMutation = useMutation(() => addTasks(projectId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", projectId]);
    },
  });

  const deleteTaskMutation = useMutation(
    (taskId: string) => deleteTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  const updateTaskTitleMutation = useMutation(
    ({ taskId, title }: { taskId: string; title: string }) =>
      updateTask(taskId, { title }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  const updateTaskStatusMutation = useMutation(
    ({ taskId, status }: { taskId: string; status: string }) =>
      updateTask(taskId, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  const updateTaskDeadLineMutation = useMutation(
    ({ taskId, deadLine }: { taskId: string; deadLine: Date }) =>
      updateTask(taskId, { deadLine }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  const updateTaskImportanceMutation = useMutation(
    ({ taskId, importance }: { taskId: string; importance: number }) =>
      updateTask(taskId, { importance }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  const updateTaskMonthMutation = useMutation(
    ({ taskId, taskDate }: { taskId: string; taskDate: Date }) =>
      updateTask(taskId, { taskDate }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", projectId]);
      },
    }
  );

  return {
    tasks,
    addTaskMutation,
    deleteTaskMutation,
    updateTaskTitleMutation,
    updateTaskStatusMutation,
    updateTaskDeadLineMutation,
    updateTaskImportanceMutation,
    updateTaskMonthMutation,
  };
};

export default useTasksQueries;
