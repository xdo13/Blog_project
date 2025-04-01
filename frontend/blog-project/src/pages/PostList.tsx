import React, { useEffect, useState, useCallback, useRef } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "./PostCard";
import { PostProps } from "../types/PostCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  // 마지막 요소를 감지하기 위한 ref
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 게시글 가져오기 함수
  const fetchPosts = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        params: {
          page: page,
          size: 10, // 한 번에 가져올 게시글 수 (페이징 크기)
        },
      };

      const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/api/post/all`, config);
      const newPosts = response.data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length === 10); // 페이지 당 10개라고 가정
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [page, token, hasMore]);

  // 페이지 변경 시 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        최신 게시글
      </Typography>
      <Grid container spacing={3}>
        {posts.length > 0 ? (
          posts.map((post, index) => {
            const isLastElement = posts.length === index + 1;
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
                ref={isLastElement ? lastPostElementRef : null}
              >
                <div
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <PostCard post={post} />
                </div>
              </Grid>
            );
          })
        ) : (
          !loading && (
            <Typography variant="h6" sx={{ color: "gray", textAlign: "center", width: "100%" }}>
              게시글이 없습니다.
            </Typography>
          )
        )}
      </Grid>
      {loading && (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
};

export default PostList;