package com.company.blog.controller;

import com.company.blog.entity.Comment;
import com.company.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Slf4j
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
    // ✅ 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @RequestBody(required = false) Map<String, String> request,
            @AuthenticationPrincipal UserDetails userDetails) {
        String authenticatedUsername = userDetails.getUsername();
        log.info("댓글 수정 요청 - commentId: {}, authenticated username: {}, request email: {}, content: {}",
                commentId, authenticatedUsername, request != null ? request.get("email") : null, request != null ? request.get("content") : null);
        try {
            String content = request != null ? request.get("content") : null;
            if (content == null || content.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("댓글 내용이 비어있습니다.");
            }
            Comment updatedComment = commentService.updateComment(commentId, content, authenticatedUsername);
            return ResponseEntity.ok(updatedComment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            @RequestBody(required = false) Map<String, String> request,
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("댓글 삭제 요청 - commentId: {}, userDetails email: {}, request email: {}",
                commentId, userDetails.getUsername(), request != null ? request.get("email") : null);
        try {
            String email = request != null ? request.get("email") : userDetails.getUsername();
            commentService.deleteComment(commentId, email);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}