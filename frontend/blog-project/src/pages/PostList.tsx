import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import PostCard from './PostCard';
import { PostProps } from '../types/PostCard';


const PostList: React.FC = () => {
  const [post, setPost] = useState<PostProps[]>([]);
  const token = localStorage.getItem('token'); // ✅ 저장된 JWT 토큰 가져오기

  useEffect(() => {
    fetch('http://localhost:9090/api/post/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ✅ JWT 토큰 추가
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((error) => console.error('게시글 불러오기 실패:', error));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
        최신 게시글
      </Typography>
      <Grid container spacing={3}>
        {post.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostList;
