// 인증 인가 api
import axios from "axios";

const AUTH_API_HOST = "https://moneyfulpublicpolicy.co.kr";

export const register = async ({id,password,nickname}) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/register", {
      id: id,
      password: password,
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    console.log('@@ error', error?.response?.data?.message);
    // alert( error?.response?.data?.message)
  }
}

export const login = async ({id, password}) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/login?expiresIn=30m" ,{
      id: id,
      password: password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;

  } catch (error) {
    console.log('@@ error', error?.response?.data?.message);
    // alert( error?.response?.data?.message)
  }
}

export const getUserInfo = async () => {
  // getUserInfo 함수를 실행하면 localStorage에서 accessToken을 먼저 가져온다.
  const accessToken = localStorage.getItem("accessToken");
  if(accessToken) {
    try {
      // 회원정보 확인하는 API 호출
      const response = await axios.get(AUTH_API_HOST + "/user", {
        headers : {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      return response.data;
    } catch (error) {
      alert("AccessToken이 만료되었습니다.");
      localStorage.clear();
    }
  }
}

export const updateProfile = async (formData) => {
  const accessToken = localStorage.getItem("accessToken");
  if(accessToken) {
    try {
      // 회원정보 확인하는 API 호출
      const response = await axios.patch(AUTH_API_HOST + "/profile",
        formData,
        {
        headers : {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`
        }
      })
      return response.data;
    } catch (error) {
        console.log('@@ error', error)
    }
  }
}
