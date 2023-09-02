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
    height: 100%;
    margin-bottom: 0;
    display: block;
  `,
  ContainerInner: styled.div`
    height: 50vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  // 프로필
  ProfileContainer: styled.section`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  ProfileTitle: styled.p`
    font-size: 18px;
    font-weight: bold;
  `,
  ProfileInputBox: styled.div`
    font-size: 14px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    border: 1.2px solid var(--main-blue);
  `,
  ProfileBtn: styled.button`
    background-color: transparent;
    border: solid var(--hover-blue);
    padding: 5px 7px;
    border-radius: 5px;
    margin-top: 6px;
    margin-left: 8px;
    cursor: pointer;
    font-size: 10px;
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
    font-size: 18px;
    font-weight: bold;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  WorkExperienceList: styled.li`
    padding-top: 20px;
    padding-bottom: 5px;
    list-style: none;
    border-radius: 8px;
    border: 1.2px solid var(--main-blue);
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

  //------------모달-----------------------//
  // 계정 모달

  // 프로필 모달
  AccountForm: styled.form`
    max-width: 400px;
    margin: 0 auto;
  `,

  // 경력 모달
  Input: styled.input`
    width: 100%;
    height: 32px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  `,
  Label: styled.label`
    font-size: 16px;
    margin-bottom: 15px;
  `,
  subText: styled.p`
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
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
  JustifyBox: styled.div`
    display: flex;
    align-items: center;
  `,
};
