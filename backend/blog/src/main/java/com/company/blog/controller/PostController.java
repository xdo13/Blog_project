package com.company.blog.controller;

import com.company.blog.entity.Post;
import com.company.blog.repository.PostRepository;
import com.company.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:5173") // React 연결
public class PostController {
    @Autowired
    private final PostService postService;
    private final PostRepository postRepository;

    public PostController(PostService postService, PostRepository postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String content = request.get("content");
        String author = request.get("username");

        Post post = postService.createPost(title, content, author);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // ✅ 게시글 상세 조회 API 추가
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));
        return ResponseEntity.ok(post);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePost(
            @PathVariable Long id,
            @RequestBody Post updatedPost,
            @AuthenticationPrincipal UserDetails userDetails) {

        // 🔹 기존 게시글 조회
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        // 🔹 작성자만 수정 가능하도록 체크
        if (!post.getAuthor().equals(userDetails.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("게시글 수정 권한이 없습니다.");
        }

        // 🔹 게시글 내용 업데이트
        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());

        postRepository.save(post);
        return ResponseEntity.ok(post);
    }
    // ✅ 게시글 삭제 API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName(); // JWT에서 현재 로그인한 유저 가져오기
        postService.deletePost(id);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }



}
