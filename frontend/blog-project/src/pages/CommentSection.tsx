import React, { useEffect, useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  user: { username: string };
}

const CommentSection: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    fetchComments(storedToken);
  }, [postId]);

  const fetchComments = async (jwtToken: string | null) => {
    try {
      const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
      const response = await axios.get(`http://localhost:9090/api/comments/${postId}`, { headers });
      setComments(response.data);
    } catch (error) {
      console.error("❌ 댓글 불러오기 실패:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!content.trim()) {
      alert("⚠️ 댓글 내용을 입력해주세요.");
      return;
    }

    const currentToken = localStorage.getItem("jwtToken");
    const currentEmail = localStorage.getItem("email");

    if (!currentToken || !currentEmail) {
      alert("⚠️ 로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9090/api/comments/${postId}`,
        {
          content: content,
          email: currentEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      // 최신 댓글이 위에 오도록 정렬 변경
      setComments([response.data, ...comments]);
      setContent("");
    } catch (error: any) {
      console.error("❌ 댓글 작성 실패:", error);
      if (error.response?.status === 403) {
        alert("⚠️ 인증 실패: 토큰이 유효하지 않거나 권한이 없습니다.");
      } else {
        alert(`❌ 댓글 작성 실패: ${error.response?.data || "알 수 없는 오류"}`);
      }
    }
  };

  return (
    <div style={{ marginTop: "40px" }}> {/* 게시글과 댓글 사이 간격 추가 */}
      <Typography variant="h5" sx={{ mb: 2 }}>💬 댓글</Typography>

      {/* 댓글 입력 폼을 최상단으로 이동 */}
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="댓글 작성"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" },
            },
            bgcolor: "#1e1e1e",
            borderRadius: "5px",
          }}
        />
        <Button onClick={handleCommentSubmit} variant="contained" sx={{ mt: 1, bgcolor: "#1976d2" }}>
          등록
        </Button>
      </div>

      {/* 댓글 리스트 */}
      <List sx={{ bgcolor: "#1e1e1e", borderRadius: "10px", p: 1 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem>
                <ListItemText
                  primary={<Typography sx={{ color: "#fff" }}>{comment.content}</Typography>}
                  secondary={<Typography sx={{ color: "#aaa", fontSize: "0.9rem" }}>작성자: {comment.user.username}</Typography>}
                />
              </ListItem>
              <Divider sx={{ bgcolor: "#444" }} />
            </React.Fragment>
          ))
        ) : (
          <Typography sx={{ color: "#aaa", textAlign: "center", p: 2 }}>아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</Typography>
        )}
      </List>
    </div>
  );
};

export default CommentSection;
