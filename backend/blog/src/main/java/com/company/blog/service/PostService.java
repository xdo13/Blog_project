package com.company.blog.service;

import com.company.blog.entity.Post;
import com.company.blog.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(String title, String content, String author, MultipartFile file) throws IOException {
        Post post = Post.builder()
                .title(title)
                .content(content)
                .author(author)
                .createdAt(LocalDateTime.now()) // ✅ createdAt 명시적 설정
                .build();

        // 파일 처리
        if (file != null && !file.isEmpty()) {
            // 업로드 디렉토리 설정 (프로젝트 루트 기준)
            String uploadDir = "uploads";
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

            // 디렉토리 생성
            try {
                Files.createDirectories(uploadPath);
                System.out.println("디렉토리 생성 성공: " + uploadPath.toString());
            } catch (IOException e) {
                throw new IOException("디렉토리 생성 실패: " + uploadPath, e);
            }

            // 파일 이름 생성 및 저장
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            try {
                Files.copy(file.getInputStream(), filePath);
                System.out.println("파일 저장 성공: " + filePath.toString());
                post.setFilePath(filePath.toString()); // 절대 경로 저장
            } catch (IOException e) {
                throw new IOException("파일 저장 실패: " + filePath, e);
            }
        }

        return postRepository.save(post);
    }

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAllByOrderByIdDesc(pageable);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        postRepository.delete(post);
    }
}