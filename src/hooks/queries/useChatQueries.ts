import { useMutation, useQuery } from "@tanstack/react-query";
import { addTasks, deleteTask, getTasks, updateTask } from "../../api/Task";
import { queryClient } from "../../App";
import { toast } from "react-toastify";
import { getWhole } from "src/api/Chat";
import { useRoomStore } from "../../store/useRoomStore";

const useChatQueries = ({
  createdRoomId,
  exitResult,
}: {
  createdRoomId: string;
  exitResult: null | string;
}) => {
  // const { exitResult, createdRoomId } = useRoomStore();

  // const { data: tasks } = useQuery(
  //   ["tasks", projectId],
  //   async () => {
  //     const tasksData = await getTasks(projectId);
  //     return tasksData;
  //   },
  //   { enabled: !!projectId }
  // );

  const { data: existData, error } = useQuery(
    ["existData", exitResult, createdRoomId],
    async () => getWhole(),
    { enabled: !!exitResult || !!createdRoomId }
  );

  // const addTaskMutation = useMutation(() => addTasks(projectId), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["tasks", projectId]);
  //   },
  // });

  // const deleteTaskMutation = useMutation(
  //   (taskId: string) => deleteTask(taskId),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["tasks", projectId]);
  //     },
  //   }
  // );

  // const updateTaskTitleMutation = useMutation(
  //   ({ taskId, title }: { taskId: string; title: string }) =>
  //     updateTask(taskId, { title }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["tasks", projectId]);
  //     },
  //   }
  // );

  return {
    // tasks,
    // addTaskMutation,
    // deleteTaskMutation,
    // updateTaskTitleMutation,
    existData,
  };
};

export default useChatQueries;
