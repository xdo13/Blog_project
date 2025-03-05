import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatePost } from "../api/posts";

const PostEditPage = () => {
  const { postId } = useParams(); // 🔹 URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken"); // 🔹 JWT 토큰 가져오기

  const [form, setForm] = useState({ title: "", content: "" });

  // 🔹 기존 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("현재 JWT 토큰:", token); // ✅ 토큰이 잘 가져와지는지 확인
        const response = await axios.get(`http://localhost:9090/api/post/${postId}`, {
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

  // 🔹 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 수정 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(Number(postId), form, token || "");
      alert("게시글이 수정되었습니다!");
      navigate(`/post/${postId}`); // 🔹 수정 완료 후 상세 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
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
  );
};

export default PostEditPage;
