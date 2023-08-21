import supabase from "../config/supabaseClient";

const Join = async (formdata: any) => {
  const { data, error } = await supabase.auth.signUp({
    email: formdata.email,
    password: formdata.password,
  });
  return data;
};

export { Join };
