import { useQuery } from "@tanstack/react-query";
import { getWhole, getWholeWhenProject } from "src/api/Chat";

const useChatCompQueries = ({
  createdRoomId,
  exitResult,
  currentuserid,
}: {
  createdRoomId: string;
  exitResult: null | string;
  currentuserid?: string;
}) => {
  console.log({ createdRoomId, exitResult, currentuserid });
  // const { exitResult, createdRoomId } = useRoomStore();

  // const { data: tasks } = useQuery(
  //   ["tasks", projectId],
  //   async () => {
  //     const tasksData = await getTasks(projectId);
  //     return tasksData;
  //   },
  //   { enabled: !!projectId }
  // );

  const { data: existData } = useQuery(
    ["existData", exitResult, createdRoomId],
    async () => getWhole(currentuserid as string),
    { enabled: true || !!exitResult || !!createdRoomId }
  );

  const { data: existDataWhenProject } = useQuery(
    ["existDataWhenProject", exitResult, createdRoomId],
    async () => getWholeWhenProject(currentuserid as string),
    { enabled: true || !!exitResult || !!createdRoomId }
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
    existDataWhenProject,
  };
};

export default useChatCompQueries;
