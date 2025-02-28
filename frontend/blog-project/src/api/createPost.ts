import axios from "axios";

const API_URL = "http://localhost:9090/api/post";

// ✅ 게시글 작성 API 요청 함수
const createPost = async (postData: { title: string; content: string; author: string }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, postData, {
      headers: {
        "Content-Type": "application/json", // ✅ JSON 전송
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};

export default createPost;
