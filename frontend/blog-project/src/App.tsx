import { Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsPage />} />
    </Routes>
  );
};

export default App;
