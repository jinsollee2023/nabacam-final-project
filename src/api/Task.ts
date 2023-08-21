import { Task } from "../Types";
import supabase from "../config/supabaseClient";

export const getTasks = async (projectId: string): Promise<Task[]> => {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("projectId", projectId)
    .order("taskDate", { ascending: true });
  return tasks as Task[];
};

export const addTasks = async (projectId: string): Promise<void> => {
  await supabase
    .from("tasks")
    .insert([{ projectId: projectId }])
    .select();
};

export const updateTask = async (
  taskId: string,
  column: {
    title?: string;
    status?: string;
    deadLine?: Date;
    importance?: number;
    taskDate?: Date;
  }
): Promise<void> => {
  await supabase.from("tasks").update(column).eq("taskId", taskId).select();
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await supabase.from("tasks").delete().eq("taskId", taskId);
};
