import { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { createPost } from '../api/posts'; // API 연동 함수
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(form); // API 호출
      alert('게시글이 등록되었습니다!');
      navigate('/posts'); // 게시글 목록으로 이동
    } catch (error) {
      console.error('게시글 작성 실패', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
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
