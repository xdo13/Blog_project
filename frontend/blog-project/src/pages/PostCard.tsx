import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, CardMedia } from '@mui/material';
import { PostProps } from '../types/PostCard';

interface PostCardProps {
  post: PostProps;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // filePath에서 파일명만 추출 (슬래시(/)와 백슬래시(\\) 모두 처리)
  const fileName = post.filePath;

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

        {fileName && (
          <CardMedia
            component="img"
            height="200"
            image={`${fileName}`} // 파일명만 사용
            alt={post.title}
            sx={{ borderRadius: '8px', mb: 2, objectFit: 'cover' }}
          />
        )}

        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="body2">{post.author}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;