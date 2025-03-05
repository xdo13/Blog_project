import axios from 'axios';

const API_URL = '/api/auth';


// 회원가입 API 요청 함수
export const signUp = async (userData: { username: string; password: string; email: string }) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// ✅ 로그인 API 요청 후 localStorage에 username 저장
export const login = async (loginData: { email: string; password: string }, rememberMe: boolean) => {
  const response = await axios.post(`${API_URL}/login`, loginData, { withCredentials: true });

  if (response.status === 200) {
    const { token, username } = response.data; // ✅ username 추가
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("username", username); // ✅ username 저장

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify({ email: loginData.email, username }));
    } else {
      sessionStorage.setItem("user", JSON.stringify({ email: loginData.email, username }));
    }
  }

  return response;
};
// ✅ 현재 로그인한 사용자 가져오기
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
};

// ✅ 로그아웃 (세션 삭제)
export const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  localStorage.removeItem("username"); // ✅ 저장된 사용자 이름 삭제
  localStorage.removeItem("jwtToken"); // ✅ 저장된 JWT 토큰 삭제
  window.location.href = "/signin"; // ✅ 로그인 페이지로 이동
};
