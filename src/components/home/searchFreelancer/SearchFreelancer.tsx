import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { S } from './searchFreelancer.styles'
import {MdPersonSearch} from 'react-icons/md'
import { SearchFreelancerProps } from '../../../Types';


const SearchFreelancer = ({onSearch} : SearchFreelancerProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchInput.current?.focus();
  },[])

  const HandleSearchKeywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchKeyword);
  }

  return (
    <S.searchContainer>
      <S.searchForm>
        <S.searchInput ref={searchInput} type='text' value={searchKeyword} onChange={HandleSearchKeywordOnChange} placeholder='검색어를 입력해주세요.'></S.searchInput>
        <S.searchInputButton onClick={handleSearchButtonClick}><MdPersonSearch size='25'/></S.searchInputButton>
      </S.searchForm>
    </S.searchContainer>
  )
}

export default SearchFreelancer