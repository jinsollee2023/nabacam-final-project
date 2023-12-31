import { styled } from "styled-components";

export const S = {
  searchContainer: styled.div`
    min-width: 40%;
    width: 85%;
    height: 5.5vh;
    display: flex;
    align-items: start;
  `,

  searchForm: styled.form`
    width: 100%;
    position: relative;
  `,

  searchInput: styled.input`
    width: 100%;
    padding: 15px;
    border: solid 1px var(--darker-gray);
    border-radius: 5px;

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
  `,
};
