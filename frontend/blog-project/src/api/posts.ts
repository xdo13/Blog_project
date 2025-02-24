import axios from 'axios';
import { Post } from '../types/Post';

//api기본 url 설정
const API_URL = '/api/posts';

//모든 게시글 조회
export const getAllPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
};

//새로운 게시글 생성
export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const response = await axios.post<Post>(API_URL, post);
  return response.data;
};
