package com.company.blog.controller;

import com.company.blog.entity.Post;
import com.company.blog.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:5173") // React 연결
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String content = request.get("content");
        String author = request.get("author");

        Post post = postService.createPost(title, content, author);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
}
