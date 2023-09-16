import { TRoom } from "src/components/chat/Room";
import supabase from "../config/supabaseClient";

export const getWhole = async (): Promise<TRoom[]> => {
  const { data: existData, error } = await supabase.rpc("get_whole");
  return existData;
};

// export const addTasks = async (projectId: string): Promise<void> => {
//   await supabase
//     .from("tasks")
//     .insert([{ projectId: projectId }])
//     .select();
// };

// export const updateTask = async (
//   taskId: string,
//   column: {
//     title?: string;
//     status?: string;
//     deadLine?: Date;
//     importance?: number;
//     taskDate?: Date;
//   }
// ): Promise<void> => {
//   await supabase.from("tasks").update(column).eq("taskId", taskId).select();
// };

// export const deleteTask = async (taskId: string): Promise<void> => {
//   await supabase.from("tasks").delete().eq("taskId", taskId);
// };
