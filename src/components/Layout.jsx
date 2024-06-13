import styled from "styled-components";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserInfo} from "../lib/api/auth.js";

// eslint-disable-next-line react/prop-types
export default function Layout({user, setUser}) {
  const navigate = useNavigate();
  // accessToken을 이용하여 현재 회원 정보를 가져오는 API 부르는 함수
  useEffect(() => {
    getUserInfo().then((res) => {
      if(res) {
        setUser ({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        })
        // 토큰이 유효하지 않다 하면
      } else {
        handleLogout();
      }
      // console.log('@@ 현재 로그인된 유저가 있나요>????????', res);
    })
  }, []);

  const handleLogout = () => {
    setUser(null)
    navigate("/sign_in");
    localStorage.clear();
  }

  return <>
    <Navbar>
      <NavItem to={"/"}>Home</NavItem>
      <NavItem to={"profile"}>프로필</NavItem>
      <UserProfile>
        {user && (
          <>
            <UserAvatar src={user.avatar} alt="user avatar" />
            <UserName>{user.nickname}</UserName>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        )}
      </UserProfile>

    </Navbar>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </>

}

const Navbar = styled.nav`
  background-color: #333;
  color : #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0;
  z-index: 1000;
  max-width: 1240px;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
`

const NavItem = styled(Link)`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserName = styled.span`
  color: #fff;
  margin-right: 20px;
`
 
const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4ddd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #cc0000;
  }
`

const PageContainer = styled.div`
  padding: 6rem 2rem;
`