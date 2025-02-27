import { Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import Blog from './pages/blog/Blog';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';


const App = () => (
  <Routes>
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/create-post" element={<CreatePostPage />} />
   
    
      <Route path="blog" element={<Blog />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />



  </Routes>
);

export default App;
