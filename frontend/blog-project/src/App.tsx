import { Routes, Route } from 'react-router-dom';
import CreatePostPage from './pages/CreatePostPage';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import PostList from './pages/PostList';


const App = () => (
  <Routes>
    <Route path="blog">
      <Route index  element={<Blog />}/>
      <Route path="post" element={<PostList />} />
      <Route path="create" element={<CreatePostPage />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  </Routes>
);

export default App;
