import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/posts';
import { Post } from '../types/Post';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        블로그 게시글 📜
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 2 }} 
        onClick={() => navigate('/create-post')}
      >
        글 작성하기
      </Button>

      {posts.map((post) => (
        <Box key={post.id} sx={{ p: 2, boxShadow: 1, mb: 2, borderRadius: 1 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2">{post.content}</Typography>
          <Typography variant="caption">{post.author} | {new Date(post.createdAt).toLocaleString()}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PostsPage;
