import { Routes, Route, Navigate } from 'react-router-dom';
import CreatePostPage from './pages/CreatePostPage';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostEditPage from './pages/PostEditPage';
import ScrollToTop from './components/scrollToTop';
import Store from './pages/blog/components/store';
import ProductDetail from './pages/blog/components/productDetail';


const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route index element={<Navigate to={'/blog'} />} />
      <Route path="blog" element={<Blog />} />
      <Route path="store" element={<Store />} />
      <Route path="product/:id" element={<ProductDetail />} /> {/* ✅ 제품 상세 페이지 추가 */}
      <Route path="post">
        <Route index element={<PostList />} />
        <Route path="create" element={<CreatePostPage />} />
        <Route path=":postId" element={<PostDetail />} />
        <Route path="edit/:postId" element={<PostEditPage />} />
      </Route>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </>
);

export default App;