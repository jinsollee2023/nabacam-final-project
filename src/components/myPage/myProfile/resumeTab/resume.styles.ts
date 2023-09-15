import TextArea from "antd/es/input/TextArea";
import { styled } from "styled-components";

interface ButtonProps {
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
    margin-bottom: 0;
  `,
  ContainerInner: styled.div`
    height: 60vh;
  `,

  // 프로필
  ProfileContainer: styled.section`
    width: 92%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
  `,
  ProfileTitle: styled.p`
    font-size: 18px;
    font-weight: bold;
  `,
  ProfileInputBox: styled.div`
    width: 90%;
    height: 120px;
    line-height: 1.2;
    font-size: 16px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #f0f0f0;
    white-space: pre-line;
  `,
  ProfileButton: styled.button`
    background-color: transparent;
    padding: 5px 7px;
    border-radius: 5px;
    border: none;
    margin-left: 8px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: dimgray;

    transition: font-weight 0.2s ease-in-out;
    &:hover {
      font-weight: 800;
    }
  `,

  // 경력사항
  ResumeExpreienceModalForm: styled.form`
    width: 100%;
  `,
  WorkExperienceContainer: styled.div`
    padding-top: 10px;
    margin-top: 10px;
    position: relative;
  `,
  WorkExperienceTitle: styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
    height: 40vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  WorkExperienceList: styled.li`
    width: 220px;
    height: 190px;
    padding: 20px 0 10px 0;
    list-style: none;
    border-radius: 10px;
    border: 1px solid var(--lighter-gray);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TextArea: styled.div``,
  PastWorkField: styled.p`
    font-size: 16px;
    font-weight: bolder;
  `,
  PastWorkDetail: styled.p`
    font-size: 14px;
    margin-top: 5px;
  `,
  PastWorkDuration: styled.p`
    font-size: 14px;
    margin-top: 5px;
  `,

  //------------모달-----------------------//
  // 프로필 모달
  AccountForm: styled.form`
    max-width: 400px;
    margin: 0 auto;
  `,
  AntdTextArea: styled(TextArea)`
    height: 200px;
    margin-top: 24px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--main-blue);
    width: 100%;
  `,

  // 경력 모달
  Input: styled.input`
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--lighter-gray);
    border-radius: 5px;
    font-size: 14px;
    outline: none;
  `,
  Label: styled.label`
    font-size: 16px;
    margin-bottom: 5px;
    color: #595959;
  `,
  subText: styled.p`
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  ResumButton: styled.button<ButtonProps>`
    width: ${(props) => props.width};
    color: var(--main-blue);
    border: 1px solid var(--main-blue);
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    background-color: transparent;
    padding: ${(props) => props.padding || "7px"};
    margin-top: ${(props) => props.marginTop};
    margin-left: ${(props) => props.marginLeft};
  `,
  AcceptButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
    background-color: #0086d0;
    color: white;
  `,
  DeclineButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
  `,
  WriteBox: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
  `,

  // 공통
  Button: styled.button<ButtonProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding || "7px"};
  `,
  RightEndButtonBox: styled.div`
    display: flex;
    margin-left: auto;
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
  WorkExperienceAddButton: styled.button`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 15px;
    width: 500px;
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  `,
  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "20px" : "0")};
    margin: 10px 0 20px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
  `,
};
