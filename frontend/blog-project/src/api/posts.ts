import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_ROOT}/api/post`;

// ✅ 게시글 생성 API (JWT 포함)
export const createPost = async (postData: { title: string; content: string; username: string }, token: string) => {
  return await axios.post(`${API_BASE_URL}/create`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ JWT 포함
    },
  });
  
};
// ✅ 특정 게시글 가져오기
export const getPostById = async (postId: string) => {
  const response = await axios.get(`${API_BASE_URL}/${postId}`);
  return response.data;
};

// 🔹 게시글 수정 API 요청
export const updatePost = async (id: number, postData: { title: string; content: string }, token: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔹 JWT 토큰 추가
    },
  });
  return response.data;
};
// ✅ 게시글 삭제 API 요청 함수
export const deletePost = async (postId: number, token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ JWT 포함
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};