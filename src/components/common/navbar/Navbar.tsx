import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { logOut } from "src/api/auth";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTabStore } from "src/store/useTabStore";
import { S } from "./navBar.styles";
import { CommonS } from "../button/commonButton";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setCurrentTab } = useTabStore();
  const token = localStorage.getItem("sb-iwbhucydhgtpozsnqeec-auth-token");
  if (!token) {
    return null;
  }
  const logOutButtonHandler = async () => {
    await logOut(navigate);
  };

  const handleConfirm = () => {
    logOutButtonHandler();
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>로그아웃 하시겟습니까?</CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleLogoClick = () => {
    if (user.role === "freelancer") {
      navigate("/home");
      setCurrentTab("프로젝트 탐색");
    } else {
      navigate("/home");
      setCurrentTab("프리랜서 마켓");
    }
  };

  return (
    <S.SidebarWrapper>
      <S.LogoWrapper>
        <img
          src="https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/workwave/workwave.png"
          alt="logo"
          onClick={handleLogoClick}
        />
      </S.LogoWrapper>
      {/* <S.Divider /> */}
      <S.ProfileWrapper>
        <S.ProfileImageWrapper>
          <img
            src={user.photoURL}
            alt="profile-img"
            onClick={() => navigate("my-page")}
          />
        </S.ProfileImageWrapper>
        <S.ProfileContentsWrapper>
          <S.Role>{user.role}</S.Role>
          <S.Name>{user.name}</S.Name>
        </S.ProfileContentsWrapper>
      </S.ProfileWrapper>
      {/* <S.Divider /> */}
      <S.UpperNavLinks>
        <S.NavLinkItem
          onClick={() => {
            navigate("/home");
            {
              user.role === "client"
                ? setCurrentTab("프리랜서 마켓")
                : setCurrentTab("프로젝트 탐색");
            }
          }}
        >
          {user.role === "client" ? "프리랜서 구인" : "프로젝트 탐색"}
        </S.NavLinkItem>

        <S.NavLinkItem
          onClick={() => {
            navigate("/project-management");
            {
              user.role === "client" && setCurrentTab("프로젝트 목록");
            }
          }}
        >
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

      <S.LogOutButton onClick={showConfirmation}>
        로그아웃&nbsp;&nbsp;
        <FiLogOut size="15" />
      </S.LogOutButton>
    </S.SidebarWrapper>
  );
};

export default Navbar;
