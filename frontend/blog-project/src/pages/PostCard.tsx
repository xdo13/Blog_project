import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { PostProps } from '../types/PostCard';



const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#121212',
        color: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '16px',
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{post.author[0]}</Avatar>
          <Typography variant="body2">{post.author}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
