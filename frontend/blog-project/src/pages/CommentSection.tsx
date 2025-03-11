import React, { useEffect, useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Divider, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  user: { username: string };
}

const CommentSection: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const currentEmail = localStorage.getItem("email") || "";
  const currentToken = localStorage.getItem("jwtToken") || "";

  useEffect(() => {
    fetchComments(currentToken);
  }, [postId]);

  const fetchComments = async (jwtToken: string) => {
    try {
      const headers = { Authorization: `Bearer ${jwtToken}` };
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
      setComments([response.data, ...comments]);
      setContent("");
    } catch (error: any) {
      console.error("❌ 댓글 작성 실패:", error);
      if (error.response) {
        console.log("응답 데이터:", error.response.data, "상태:", error.response.status);
        if (error.response.status === 403) {
          alert(`⚠️ 인증 실패: ${error.response.data.message || "토큰이 유효하지 않거나 권한이 없습니다."}`);
        } else {
          alert(`❌ 댓글 작성 실패: ${error.response.data || "알 수 없는 오류"}`);
        }
      } else {
        alert("❌ 네트워크 오류가 발생했습니다.");
      }
    }
  };

  const handleEditStart = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSave = async (commentId: number) => {
    console.log("댓글 수정 - token:", currentToken, "email from storage:", currentEmail, "commentId:", commentId);

    if (!currentToken || !currentEmail) {
      alert("⚠️ 로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:9090/api/comments/${commentId}`,
        {
          content: editContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, content: response.data.content } : comment
        )
      );
      setEditingCommentId(null);
      setEditContent("");
    } catch (error: any) {
      console.error("❌ 댓글 수정 실패:", error);
      if (error.response) {
        console.log("응답 데이터:", error.response.data, "상태:", error.response.status, "헤더:", error.response.headers);
        if (error.response.status === 403) {
          alert(`⚠️ 인증 실패: ${error.response.data.message || "토큰이 유효하지 않거나 권한이 없습니다."}`);
        } else {
          alert(`❌ 댓글 수정 실패: ${error.response.data || "알 수 없는 오류"}`);
        }
      } else {
        alert("❌ 네트워크 오류가 발생했습니다.");
      }
    }
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleDelete = async (commentId: number) => {
    console.log("댓글 삭제 - token:", currentToken, "email:", currentEmail, "commentId:", commentId);

    if (!currentToken || !currentEmail) {
      alert("⚠️ 로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:9090/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        data: { email: currentEmail },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error: any) {
      console.error("❌ 댓글 삭제 실패:", error);
      if (error.response) {
        console.log("응답 데이터:", error.response.data, "상태:", error.response.status);
        if (error.response.status === 403) {
          alert(`⚠️ 인증 실패: ${error.response.data.message || "토큰이 유효하지 않거나 권한이 없습니다."}`);
        } else {
          alert(`❌ 댓글 삭제 실패: ${error.response.data || "알 수 없는 오류"}`);
        }
      } else {
        alert("❌ 네트워크 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>💬 댓글</Typography>

      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="댓글 작성"
          fullWidth 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#aaa",
            },
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

      <List sx={{ bgcolor: "#1e1e1e", borderRadius: "10px", p: 1 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem
                disablePadding
                sx={{display:'flex', gap:2, }}
              >
                {editingCommentId === comment.id ? (
                  <TextField
                    fullWidth
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    sx={{
                      input: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#555" },
                        "&:hover fieldset": { borderColor: "#888" },
                      },
                      bgcolor: "#1e1e1e",
                      borderRadius: "5px",
                      margin: '5px 0',
                    }}
                  />
                ) : (
                  <ListItemText
                    primary={<Typography sx={{ color: "#fff" }}>{comment.content}</Typography>}
                    secondary={<Typography sx={{ color: "#aaa", fontSize: "0.9rem" }}>작성자: {comment.user.username}</Typography>}
                  />
                )}
                {
                  currentEmail && currentEmail.length > 0 && ( // email 기반 체크 유지
                      <Box display="flex" gap={2} sx={{paddingRight:'1rem'}}>
                      {editingCommentId === comment.id ? (
                        <>
                          <IconButton edge="end" onClick={() => handleEditSave(comment.id)}>
                            <SaveIcon sx={{ color: "#1976d2" }} />
                          </IconButton>
                          <IconButton edge="end" onClick={handleEditCancel}>
                            <CancelIcon sx={{ color: "#d32f2f" }} />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton edge="end" onClick={() => handleEditStart(comment)}>
                            <EditIcon sx={{ color: "#1976d2" }} />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDelete(comment.id)}>
                            <DeleteIcon sx={{ color: "#d32f2f" }} />
                          </IconButton>
                        </>
                      )}
                      </Box>
                  )
                }
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