import React, { useEffect, useState } from 'react'
import supabase from '../../../config/supabaseClient'
import { Portfolio, User } from '../../../Types';

const FreelancerList = () => {
  const [freelancerList, setFreelancerList] = useState<User[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  const fetchUsers =  async () => {
    try{
      const {data, error} = await supabase.from('users').select('*')
      if(data){
        setFreelancerList(data)
        console.log("fetchUsers data : ", data)
      } else {
        console.log("fetchUsers error : ", error?.message)
      }
    } catch (error) {
      console.error('fetchUsers error: ', error);
    }
  } 

  const fetchPortfolios = async () => {
    try{
      // const {data, error} = await supabase.from('portfolios').select('*').eq('freelancerId','18179829-dfbc-4be0-8dcd-d0d0d3211edf')
      const {data, error} = await supabase.from('portfolios').select('*')
      if(data){
        setPortfolio(data);
        console.log("fetchPortfolios data :", data)
      } else {
        console.error('fetchPortfolios error : ', error.message);
      }
    } catch (error) {
      console.error('fetchPortfolios error : ', error);
    }
  }

  useEffect(()=>{
    fetchUsers();
    fetchPortfolios();
  },[])


  return (
    <div id='freelancerListContainer'>
      <div>
      {freelancerList?.map((item) => (
        <div>
          <div>
            <ul>
              {portfolio
                .filter((portfolioItem)=> portfolioItem.freelancerId === item.userId )
                .map((filteredPortfolio)=>(
                  <li><img src={filteredPortfolio.thumbnailURL} alt='thumbnailImage'/></li>  
              ))}
            </ul>
          </div>
          <div key={item.userId}>
            <span>{item.name}</span>
            <span>{item.workField}</span>
            <span>{item.workExp}</span>
            <button>제안하기</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default FreelancerList;