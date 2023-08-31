import { styled } from "styled-components";

interface BtnProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  padding?: string;
}

export const S = {
  Container: styled.div`
    width: 100%;
  `,

  // 프로필
  ProfileContainer: styled.section`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  ProfileTitle: styled.p`
    font-size: 20px;
    font-weight: bold;
  `,
  ProfileInputBox: styled.div`
    font-size: 18px;
    padding: 10px;
    margin-top: 15px;
    border-radius: 8px;
    border: 1.5px solid var(--main-blue);
  `,
  ProfileBtn: styled.button`
    background-color: none;
    border: none;
    padding: 4px 8px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
  `,

  // 경력사항
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  WorkExperienceTitle: styled.p`
    font-size: 20px;
    font-weight: bold;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 50px;
  `,
  WorkExperienceList: styled.li`
    padding-top: 20px;
    padding-bottom: 5px;
    list-style: none;
    border-radius: 8px;
    border: 1.5px solid var(--main-blue);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TextArea: styled.div``,
  PastWorkField: styled.p`
    font-size: 18px;
    font-weight: bolder;
  `,
  PastWorkDetail: styled.p`
    font-size: 16px;
    margin-top: 5px;
  `,
  PastWorkDuration: styled.p`
    font-size: 16px;
    margin-top: 5px;
  `,

  // 공통
  Btn: styled.button<BtnProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding || "10px"};
  `,
  RightEndBtnBox: styled.div`
    display: flex;
    margin-left: auto;

    margin-top: 25px;
    padding-right: 3%;
  `,
  CenterizeBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
