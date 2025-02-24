import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/posts';
import { Post } from '../types/Post';

//게시글 목록을 표시하는 페이지 컴포넌트
const PostsPage = () => {
  //게시글 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);

  //컴포넌트 마운트시 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();  //API 호출을 통해 게시글 데이터 호출
        setPosts(data);
      } catch (error) {
        console.error("API 호출 중 에러 발생", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>블로그 글 목록 🚀</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{post.author} | {new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
