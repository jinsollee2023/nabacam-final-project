import { User } from '../Types';
import supabase from '../config/supabaseClient'
  
export const getFreelancers = async () : Promise<User[]> => {
    try {
      const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('role', 'freelancer')
        if(error) {
          alert(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`)
        }
        return data as User[];
    } catch (error) {
      throw new Error(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`)
    }
  }

  export const getClients = async () => {
    try {
      const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('role', 'client')
  
        if(error) {
          alert(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`)
        }
        return data;
    } catch (error) {
      throw new Error(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`)
    }
  }  
