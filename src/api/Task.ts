import { Task } from "../Types";
import supabase from "../config/supabaseClient";

export const getTasks = async (projectId: string): Promise<Task[]> => {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("projectId", projectId)
    .order("created_at", { ascending: true });
  return tasks as Task[];
};

export const addTasks = async (projectId: string): Promise<void> => {
  await supabase
    .from("tasks")
    .insert([{ projectId: projectId }])
    .select();
};

export const updateTaskTitle = async (
  taskId: string,
  title: string
): Promise<void> => {
  await supabase
    .from("tasks")
    .update({ title: title })
    .eq("taskId", taskId)
    .select();
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<void> => {
  await supabase
    .from("tasks")
    .update({ status: status })
    .eq("taskId", taskId)
    .select();
};

export const updateTaskImportance = async (
  taskId: string,
  importance: number
): Promise<void> => {
  await supabase
    .from("tasks")
    .update({ importance: importance })
    .eq("taskId", taskId)
    .select();
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await supabase.from("tasks").delete().eq("taskId", taskId);
};
