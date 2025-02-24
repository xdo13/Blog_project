package com.company.blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//블로그 게시글을 나타내는 엔티티 클래스
@Entity
@Getter
@NoArgsConstructor  //파라미터가 없는 기본 생성자를 자동으로 생성
@AllArgsConstructor // 모든 필드를 매개변수로 가지는 생성자를 자동으로 생성
@Builder // 객체 생성시 빌더 패턴을 지원
public class Post {
    @Id // 엔티티의 기본 키를 나타냄
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //데이터 베이스가 자동으로 ID값을 저장하도록 설정
    private Long id;

    private String title;

    @Lob // 내용이 길 경우를 대비하여 Large Object 처리
    private String content;

    private String author;

    private LocalDateTime createdAt;


    //service에서 빨간줄 떠서 추가함
    public void setCreatedAt(LocalDateTime now) {
    }
}
