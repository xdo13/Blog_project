package com.company.blog.service;

import com.company.blog.entity.Comment;
import com.company.blog.entity.Post;
import com.company.blog.entity.User;
import com.company.blog.repository.CommentRepository;
import com.company.blog.repository.PostRepository;
import com.company.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    @Transactional
    public Comment createComment(Long postId, String content, String email){
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .build();
        return commentRepository.save(comment);
    }
    //특정 게시물의 모든 댓글 조회
    public List<Comment> getCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        return commentRepository.findByPost(post);
    }
    //댓글 삭제 (본인만)
    @Transactional
    public void deleteComment(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()->new IllegalArgumentException("댓글을 찾을 수 없습니다"));
        if (!comment.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }
        commentRepository.delete(comment);
    }
}
