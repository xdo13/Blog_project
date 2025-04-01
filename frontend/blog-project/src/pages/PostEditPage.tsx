import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatePost } from "../api/posts";
import AppTheme from "../shared-theme/AppTheme";
import { TextField, Button, Container, Typography, Box, CssBaseline, Stack } from "@mui/material";
import AppAppBar from "./blog/components/AppAppBar";
import Footer from "./blog/components/Footer";

const PostEditPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("현재 JWT 토큰:", token);
        const response = await axios.get(`http://1.2.3.4:9090/api/post/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(response.data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        alert("게시글을 불러오는 데 실패했습니다.");
        navigate("/blog");
      }
    };
    
    fetchPost();
  }, [postId, token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(Number(postId), form, token || "");
      alert("게시글이 수정되었습니다!");
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Box sx={{ mt: 0, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
            <Typography variant="h4" gutterBottom>
              게시글 수정 ✏️
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
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                게시글 수정
              </Button>
            </form>
          </Box>
        </Container>
      </Stack>
      <Footer />
    </AppTheme>
  );
};

export default PostEditPage;