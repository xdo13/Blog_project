import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, CircularProgress, Stack, CssBaseline, Button } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "./blog/components/AppAppBar";
import Footer from "./blog/components/Footer";
import { getPostById, deletePost } from "../api/posts";

const PostDetail: React.FC = () => {
  const { postId } = useParams(); // ✅ URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState<{ title: string; content: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // ✅ 로그인한 사용자 정보
  const token = localStorage.getItem("jwtToken"); // ✅ JWT 토큰 가져오기

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

    // ✅ username을 localStorage에서 가져옴
    const storedUser = localStorage.getItem("username");
    setCurrentUser(storedUser ? storedUser.trim() : null);
  }, [postId]);

  // ✅ 게시글 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePost(Number(postId), token || "");
      alert("게시글이 삭제되었습니다.");
      navigate("/blog"); // ✅ 삭제 후 목록으로 이동
    } catch (error) {
      alert("게시글 삭제 실패!");
    }
  };

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
                작성자: {post.author}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {post.content}
              </Typography>

              {/* ✅ 로그인한 사용자와 작성자가 같다면 수정/삭제 버튼 표시 */}
              {currentUser === post.author && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={() => navigate(`/post/edit/${postId}`)} // ✅ 수정 페이지로 이동
                  >
                    수정하기
                  </Button>
                  <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
                    삭제하기
                  </Button>
                </>
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
