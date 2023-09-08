import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { logOut } from "src/api/auth";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const logOutButtonHandler = async () => {
    await logOut(navigate);
  };

  if (window.location.pathname === `/register`) {
    return null;
  }
  if (window.location.pathname === `/login`) {
    return null;
  }
  if (window.location.pathname === `/resetpassword`) {
    return null;
  }

  const handleConfirm = () => {
    logOutButtonHandler();
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.

    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <div>
        <p>로그아웃 하시겟습니까??</p>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <S.SidebarWrapper>
      <S.LogoWrapper>
        <img
          src="https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/workwave/workwave.png"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </S.LogoWrapper>
      <S.Divider />
      <S.ProfileWrapper>
        <S.ProfileImage src={user.photoURL} alt="img" />
        <div>
          <S.Name>{user.name}</S.Name>
          <S.Role>{user.role}</S.Role>
        </div>
        <S.LogOutButton onClick={showConfirmation}>
          <FiLogOut size="20" />
        </S.LogOutButton>
      </S.ProfileWrapper>
      <S.Divider />
      <S.UpperNavLinks>
        <S.NavLinkItem onClick={() => navigate("/home")}>
          {user.role === "client" ? "프리랜서 구인" : "프로젝트 탐색"}
        </S.NavLinkItem>

        <S.NavLinkItem onClick={() => navigate("/project-management")}>
          프로젝트 관리 도구
        </S.NavLinkItem>
      </S.UpperNavLinks>

      <S.LowerNavLinks>
        <S.NavLinkItem onClick={() => navigate("/my-page")}>
          {user.role === "client" ? "기업 페이지" : "마이 페이지"}
        </S.NavLinkItem>
        <S.NavLinkItem onClick={() => navigate("/chat")}>
          커뮤니케이션
        </S.NavLinkItem>
      </S.LowerNavLinks>
    </S.SidebarWrapper>
  );
};

export default Navbar;

const S = {
  SidebarWrapper: styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    border-right: 2px solid var(--hover-blue);
    width: 17vw;
    max-width: 280px;
    min-width: 210px;
    padding: 20px 0 0 20px;
    height: 100vh;
  `,
  LogoWrapper: styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 90%;
      cursor: pointer;
    }
  `,
  ProfileWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
  `,
  ProfileImage: styled.img`
    width: 45px;
    height: 45px;
    border-radius: 10px;
    margin-right: 10px;
  `,
  Name: styled.div`
    font-size: 18px;
    font-weight: bold;
  `,
  Role: styled.div`
    margin-top: 7px;
    font-size: 12px;
  `,
  UpperNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  Divider: styled.hr`
    margin: 20px 0;
    border: none;
    height: 2px;
    box-shadow: 0px 2px 4px #f2f2f2;
    background-color: var(--lighter-gray);
  `,
  LowerNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  NavLinkItem: styled.li`
    cursor: pointer;
    padding: 15px 5px;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: var(--hover-blue);
    }
  `,
  LogOutButton: styled.button`
    background-color: transparent;
    border: none;
  `,
};
