import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/post";

// ✅ 게시글 생성 API (JWT 포함)
export const createPost = async (postData: { title: string; content: string; author: string }, token: string) => {
  return await axios.post(`${API_BASE_URL}/create`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ JWT 포함
    },
  });
};
