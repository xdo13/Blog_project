</br>


## *개인 블로그 프로젝트*

</br>

[배포사이트로 이동하기](https://bit.ly/4bPXQMU)
</br>


</br>


>React와 SpringBoot를 이용해서 나만의 포트폴리오 블로그를 제작한다. <br>
 블로그에는 MySQL과 연동되어 나의 기술스택을 블로그로 올리고 읽어온다. <br>
  AWS로 블로그를 배포하여 실무능력을 향상시키고자 한다. <br>
 프론트는 S3로 백엔드는 EC2 데이터베이스는 RDS로 배포하였음.


### 📌 기술 스택  <br> <br>

![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white&logoWidth=15) ![Java 17](https://img.shields.io/badge/Java%2017-ED8B00?style=flat-square&logo=openjdk&logoColor=white&logoWidth=15)  ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB&logoWidth=15) ![JPA](https://img.shields.io/badge/JPA-6DB33F?style=flat-square&logo=hibernate&logoColor=white&logoWidth=15)  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white&logoWidth=15)  ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white&logoWidth=15)  ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white&logoWidth=15)  ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white&logoWidth=15)

### 📌 히스토리  <br> <br>

>2.28 JWT 적용 및 회원가입, 로그인 기능 완료 <br>
>3.4 게시판 세부 페이지 구현 완료 <br>
>3.7 무한 스크롤 기능 구현 + css 수정 완료 <br>
>3.10 게시판 댓글 기능 구현 + 버튼 위치 수정 <br>
>3.11 사용자 댓글 수정 및 삭제 기능 구현 + css 수정 <br>
>3.12 홈페이지 아이콘 + 이름 변경 <br>
>3.13 홈페이지 이동신 맨위에서 시작기능 구현 <br>
>3.14 배포완료<br>
>프론트 CI/CD 구축<br>
>Docker/Nginx를 활용한 무중단배포 환경 구축<br>
>4.8 게시물 세부페이지에 이미지 출력 기능 추가<br>
>4.11 백엔드에서 CI/CD 구현 - 자동배포 완료<br>
>4.15 게시글 높이 통일 및 게시글에 이미지 업로드 안해도 올라가게 변경 + jwt토큰 유지시간 변경



### 📌 프로젝트 설명  <br> <br>
![image](https://github.com/user-attachments/assets/28c51cf2-a36f-46d7-a600-831250d8ca37)
>헤더 바에는 이 프로젝트를 하면서 쓴 기술스택을 나열하여 메뉴바처럼 만듦
</br>

![image](https://github.com/user-attachments/assets/e735e21e-9d61-42d7-bb01-36e63b380e9a)
>메인 화면 첫번째는 랜덤이미지를 포함한 견본 게시판이 있습니다.

![image](https://github.com/user-attachments/assets/548e29f4-611f-457f-bdae-c99416f530f0)

>그 아래 화면에는 게시판 작성시 DB에 저장되고 그것을 읽어오는 실기능의 게시판이 있습니다. + 이미지추가(03.28)<br>
>페이스북처럼 스크롤을 내리면 계속 게시글이 나타납니다.

![image](https://github.com/user-attachments/assets/8bb7ac6b-03a8-430a-a7ec-465be397ff21)
>게시판 아래에는 댓글창이 있어 로그인한 사람은 댓글을 입력할 수 있습니다.

![image](https://github.com/user-attachments/assets/8c66a386-62d6-40ef-ad5c-8560d7bc28b8)
>사진과 같이 댓글을 쓴 사람은 댓글을 수정 및 삭제가 가능합니다.




### 📌 JWT 토큰 사용 종류 및 설명  <br> <br>
![image](https://github.com/user-attachments/assets/51dd529a-1348-4f4b-b60c-e3c9fd45f857)

>본 프로젝트에서는 빠른 기능 시험을 위해 LocalStorage를 사용하였지만, 중요한 프로젝트에서는 보안이 높은 Http Cookie이상으로 사용하여야 함.
>따라서 로그아웃시에 로컬스토리지를 비워 정보가 사라지게 기능 구현을 했음.
