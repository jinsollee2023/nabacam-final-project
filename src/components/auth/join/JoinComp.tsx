import { useUserStore } from "../../../store/useUserStore";
import JoinForm from "./JoinForm";
import { S } from "./joinComp.styles";
import WaveEffect from "src/components/common/waveEffect/WaveEffect";

const JoinComp = () => {
  const { userRole, setUserRole } = useUserStore();
  const logoURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/workwave/workwave.png";
  window.history.forward();
  return (
    // ant design 사용 삼항연산자로 탭 클릭시 변경
    <>
      <S.RealBack>
        <S.JoinBG>
          <S.LogoBox>
            <S.Logo src={logoURL} alt="logo" />
          </S.LogoBox>
          <S.Joinfont>서비스 이용을 위해 회원가입을 진행 해주세요.</S.Joinfont>
          <S.UserRoleSelecteTabUL>
            <S.UserRoleSelecteTabItemLI>
              <S.UserRoleSelecteTabItemButton
                onClick={() => setUserRole("client")}
                className={userRole === "client" ? "selected" : ""}
              >
                클라이언트 회원가입
              </S.UserRoleSelecteTabItemButton>
            </S.UserRoleSelecteTabItemLI>
            <S.UserRoleSelecteTabItemLI>
              <S.UserRoleSelecteTabItemButton
                onClick={() => setUserRole("freelancer")}
                className={userRole === "freelancer" ? "selected" : ""}
              >
                프리랜서 회원가입
              </S.UserRoleSelecteTabItemButton>
            </S.UserRoleSelecteTabItemLI>
          </S.UserRoleSelecteTabUL>
          <JoinForm role={userRole} />
        </S.JoinBG>
        <WaveEffect />
      </S.RealBack>
    </>
  );
};

export default JoinComp;
