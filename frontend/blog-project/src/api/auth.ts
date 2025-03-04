import axios from 'axios';

const API_URL = '/api/auth';


// 회원가입 API 요청 함수
export const signUp = async (userData: { username: string; password: string; email: string }) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// ✅ 로그인 API 요청 후 세션 저장
export const login = async (loginData: { username: string; password: string }, rememberMe: boolean) => {
  const response = await axios.post(`${API_URL}/login`, loginData, { withCredentials: true });

  if (response.status === 200) {
    const userData = { username: loginData.username };
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData)); // ✅ 영구 저장
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData)); // ✅ 브라우저 탭 닫으면 삭제
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
};
