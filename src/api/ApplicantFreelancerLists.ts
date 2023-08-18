import supabase from "../config/supabaseClient";

const getApplicantFreelancers = async (): Promise<any> => {
  let usersArr = [];
  const user = await supabase.auth.getSession();

  const findByProjects = await supabase
    .from("projects")
    .select()
    .eq("clientId", user.data.session?.user.id);

  if (findByProjects.data == null) throw new Error("TEST");
  for (const info of findByProjects.data) {
    const findByUsers = await supabase.from("users").select().in("userId", info.Volunteer);
    usersArr.push(findByUsers);
  }

  console.log(usersArr);

  return usersArr;
};

export { getApplicantFreelancers };
