import axios from 'axios';

const API_URL = '/api/posts';

// 회원가입 API 요청 함수
export const signUp = async (userData: { username: string; password: string; email: string }) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// 로그인 API 요청 함수
export const login = async (loginData: { username: string; password: string }) => {
  return await axios.post(`${API_URL}/login`, loginData);
};