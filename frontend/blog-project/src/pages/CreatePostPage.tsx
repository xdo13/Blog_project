import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Axios 추가

const API_URL = "http://localhost:9090/api/post"; // ✅ 백엔드 API URL

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "", // ✅ 작성자 필드 추가 (로그인 여부와 관계없이 입력 가능)
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // 게시글 작성 API 요청 함수
  const createPost = async (postData: { title: string; content: string; author: string }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, postData);
      return response.data;
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      throw error;
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ 백엔드로 전송할 데이터 (작성자 포함)
      const postData = {
        title: form.title,
        content: form.content,
        author: form.author || "익명", // 로그인하지 않은 경우 "익명" 처리
      };

      // ✅ API 요청 (토큰 없이도 가능)
      await createPost(postData);

      alert("게시글이 등록되었습니다!");
      navigate("/blog"); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 작성 실패", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h4" gutterBottom>
          블로그 글 작성 📝
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="제목"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="내용"
            name="content"
            value={form.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
          />
          {/* ✅ 작성자는 로그인한 경우 자동 설정되지만, 로그인 안 해도 수동 입력 가능 */}
          <TextField
            fullWidth
            label="작성자"
            name="author"
            value={form.author}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            게시글 작성
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePostPage;
