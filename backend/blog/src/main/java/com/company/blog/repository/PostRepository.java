package com.company.blog.repository;

import com.company.blog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    //추가 쿼리 메서드 작성 가능
}
