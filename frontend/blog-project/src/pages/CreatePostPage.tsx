import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, CssBaseline, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppAppBar from "./blog/components/AppAppBar";
import AppTheme from "../shared-theme/AppTheme";
import Footer from "./blog/components/Footer";

const API_URL = "http://localhost:9090/api/post";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    username: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 로그인 정보 가져오기
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setForm((prev) => ({ ...prev, username: storedUsername }));
    }
  }, []);

  // 토큰 유효성 검사
  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("username");
          setToken(null);
          navigate("/signin");
        }
      } catch (error) {
        console.error("JWT 디코딩 오류:", error);
        alert("잘못된 로그인 정보입니다. 다시 로그인해주세요.");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        setToken(null);
        navigate("/signin");
      }
    }
  }, [token, navigate]);

  // 텍스트 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  // 게시글 작성 API 호출
  const createPost = async (data: FormData) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      throw error;
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const postData = new FormData();
    postData.append("title", form.title);
    postData.append("content", form.content);
    postData.append("username", form.username);
    if (file) {
      postData.append("file", file);
    }

    try {
      await createPost(postData);
      alert("게시글이 등록되었습니다!");
      navigate("/blog");
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
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
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
                  required
                />
                <TextField
                  fullWidth
                  label="작성자"
                  name="username"
                  value={form.username}
                  margin="normal"
                  disabled
                  required
                />
                <Box sx={{ my: 2 }}>
                  <Button variant="outlined" component="label">
                    파일 업로드
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {file && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      선택된 파일: {file.name}
                    </Typography>
                  )}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!token}
                  sx={{ mt: 2 }}
                >
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