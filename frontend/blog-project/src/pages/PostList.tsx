import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { PostProps } from "../types/PostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가

const PostList: React.FC = () => {
  const [post, setPost] = useState<PostProps[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ useNavigate 사용

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // ✅ 토큰이 있을 때만 추가
          },
        };

        const response = await axios.get("http://localhost:9090/api/post/all", config);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [token]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ color: "white", mb: 3, fontWeight: "bold" }}>
        최신 게시글
      </Typography>
      <Grid container spacing={3}>
        {post.length > 0 ? (
          post.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              {/* ✅ 클릭하면 상세 페이지 이동 */}
              <div onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: "pointer" }}>
                <PostCard post={post} />
              </div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "gray", textAlign: "center", width: "100%" }}>
            게시글이 없습니다.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default PostList;
