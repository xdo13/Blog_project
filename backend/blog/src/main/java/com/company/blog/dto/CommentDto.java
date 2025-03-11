package com.company.blog.dto;

import com.company.blog.entity.Comment;
import lombok.Getter;

@Getter
public class CommentDto {
    private Long id;
    private String content;
    private String username;
    private Long userId; // ✅ 추가됨

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.username = comment.getUser().getUsername();
        this.userId = comment.getUser().getId(); // ✅ User ID 추가
    }
}
