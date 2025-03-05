import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, CssBaseline, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppAppBar from "./blog/components/AppAppBar";
import AppTheme from "../shared-theme/AppTheme";
import Footer from "./blog/components/Footer";

const API_URL = "http://localhost:9090/api/post"; // ✅ 백엔드 API URL

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    username: "",
  });
  const [token, setToken] = useState<string | null>(null); // ✅ JWT 토큰 상태 추가

  // ✅ 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken"); // ✅ 'jwtToken'으로 변경
    const storedUsername = localStorage.getItem("username");

    console.log("🚀 localStorage에서 가져온 jwtToken:", storedToken);
    console.log("🚀 localStorage에서 가져온 username:", storedUsername);

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setForm((prevForm) => ({
        ...prevForm,
        username: storedUsername,
      }));
    }
  }, []);

  // ✅ 토큰이 유효한지 확인 (만료된 경우 자동 로그아웃)
  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // JWT 디코딩
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)

        console.log("🚀 JWT 만료 시간:", decoded.exp);
        console.log("🚀 현재 시간:", currentTime);

        if (decoded.exp < currentTime) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("username");
          setToken(null);
          navigate("/login");
        }
      } catch (error) {
        console.error("🚀 JWT 디코딩 중 오류 발생:", error);
        alert("잘못된 로그인 정보입니다. 다시 로그인해주세요.");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        setToken(null);
        navigate("/login");
      }
    }
  }, [token]);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // 게시글 작성 API 요청 (Authorization 헤더 추가)
  const createPost = async (postData: { title: string; content: string; username: string }) => {
    try {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/create`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ JWT 토큰 추가
          },
        }
      );
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
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      // ✅ 백엔드로 전송할 데이터 (작성자 포함)
      const postData = {
        title: form.title,
        content: form.content,
        username: form.username,
      };

      await createPost(postData);

      alert("게시글이 등록되었습니다!");
      navigate("/blog"); // 게시글 목록 페이지로 이동
    } catch (error) {
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Box sx={{ mt: 0, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
            <Typography variant="h4" gutterBottom>
              블로그 글 작성 📝
            </Typography>
            {!token ? (
              <Typography color="error" sx={{ mb: 2 }}>
                ⚠️ 로그인 후 게시글을 작성할 수 있습니다.
              </Typography>
            ) : (
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
                  sx={{ minHeight: "100px" }}
                  required
                />
                <TextField
                  fullWidth
                  label="작성자"
                  name="username"
                  value={form.username}
                  margin="normal"
                  required
                  disabled
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!token}>
                  게시글 작성
                </Button>
              </form>
            )}
          </Box>
        </Container>
      </Stack>
      <Footer />
    </AppTheme>
  );
};

export default CreatePostPage;
