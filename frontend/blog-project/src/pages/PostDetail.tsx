import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, CircularProgress, Stack, CssBaseline, Button } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "./blog/components/AppAppBar";
import Footer from "./blog/components/Footer";
import { getPostById } from "../api/posts";

const PostDetail: React.FC = () => {
  const { postId } = useParams(); // ✅ URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState<{ title: string; content: string; username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // ✅ 로그인한 사용자 정보

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId!);
        setPost(data);
      } catch (error) {
        console.error("게시글 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // ✅ 로그인한 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser).username); // 로그인한 사용자의 이메일 저장
    }
  }, [postId]);

  if (loading) return <CircularProgress />;

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md" sx={{ mt: 5 }}>
          {post ? (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h3" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                작성자: {post.username}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {post.content}
              </Typography>

              {/* ✅ 로그인한 사용자와 작성자가 같다면 수정 버튼 표시 */}
               {currentUser === post.username && ( 
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/post/edit/${postId}`)} // ✅ 수정 페이지로 이동
                >
                  수정하기
                </Button>
               )} 
            </Paper>
          ) : (
            <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
          )}
        </Container>
      </Stack>
      <Footer />
    </AppTheme>
  );
};

export default PostDetail;
