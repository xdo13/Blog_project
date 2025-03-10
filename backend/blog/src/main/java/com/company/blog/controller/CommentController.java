package com.company.blog.controller;

import com.company.blog.entity.Comment;
import com.company.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // 특정 게시글의 모든 댓글 조회
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // 댓글 작성 (요청 데이터에 email 추가)
    @PostMapping("/{postId}")
    public ResponseEntity<?> addComment(@PathVariable Long postId, @RequestBody Map<String, String> request) {
        String content = request.get("content");
        String email = request.get("email"); // 요청 데이터에서 email 가져오기

        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("댓글 내용이 비어있습니다.");
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("이메일이 비어있습니다.");
        }

        Comment comment = commentService.createComment(postId, content, email);
        return ResponseEntity.ok(comment);
    }

    // 댓글 삭제 (본인만)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        commentService.deleteComment(commentId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}