import { styled } from "styled-components";

export const S = {
  searchContainer: styled.div`
    margin: 20px 20px 0 30px;
    width: 80%;
  `,

  searchForm: styled.form`
    width: 100%;
    position: relative;
  `,

  searchInput: styled.input`
    width: 100%;
    padding: 15px;
    border: none;
    background-color: rgba(0,0,0,0.1);
    border-radius: 50px;

    &:focus { 
      outline: none;
    }
  `,

  searchInputButton: styled.button`
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.5;
  `
}