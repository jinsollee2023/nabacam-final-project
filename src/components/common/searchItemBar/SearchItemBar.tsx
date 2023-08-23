import React, { ChangeEvent, useEffect, useRef } from "react";
import { S } from "./searchItemBar.styles";
import { MdPersonSearch } from "react-icons/md";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";

const SearchItemBar = () => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const HandleSearchKeywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearchKeyword(e.target.value);
  };

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <S.searchContainer>
      <S.searchForm>
        <S.searchInput
          ref={searchInput}
          type="text"
          value={searchKeyword}
          onChange={HandleSearchKeywordOnChange}
          placeholder="검색어를 입력해주세요."
        ></S.searchInput>
        <S.searchInputButton onClick={handleSearchButtonClick}>
          <MdPersonSearch size="25" />
        </S.searchInputButton>
      </S.searchForm>
    </S.searchContainer>
  );
};

export default SearchItemBar;
