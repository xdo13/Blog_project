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
        height: '380px', // 카드 높이를 약간 늘려서 공간 확보 (필요에 따라 조정)
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ padding: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 이미지 영역 */}
        <Box
          sx={{
            height: '200px', // 이미지 영역 고정 높이
            width: '100%',
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {fileName ? (
            <CardMedia
              component="img"
              height="200"
              image={`${fileName}`}
              alt={post.title}
              sx={{ borderRadius: '8px', objectFit: 'cover' }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: '#888' }}>
              이미지가 없습니다
            </Typography>
          )}
        </Box>

        {/* 제목 영역 */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap', // 한 줄로 제한
          }}
        >
          {post.title}
        </Typography>

        {/* 내용 영역 */}
        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2, // 최대 2줄로 제한
            WebkitBoxOrient: 'vertical',
            flexGrow: 1, // 남은 공간을 차지
            maxHeight: '40px', // 내용 높이를 제한 (2줄에 맞게 조정)
          }}
        >
          {post.content}
        </Typography>

        {/* 작성자 영역 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 'auto', // 하단에 고정
          }}
        >
          <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="body2">{post.author}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;