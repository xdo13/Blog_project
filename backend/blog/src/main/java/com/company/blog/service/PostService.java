package com.company.blog.service;

import com.company.blog.entity.Post;
import com.company.blog.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
//게시글 관련 서비스
@Service  //스프링의 서비스 계층 빈으로 등록
@RequiredArgsConstructor  //final 필드의 생성자를 자동으로 생성
public class PostService {

    private final PostRepository postRepository;

    //전체 글 조회
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    //한개의 글 조회
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 글이 존재하지 않습니다"));
    }

    // 글 작성
    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    //글 삭제
    public void deletePost(Long id){
        postRepository.deleteById(id);
    }
}
