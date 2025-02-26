import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 사용

  return (
    <div className="container">
      <h1>내 블로그에 오신 걸 환영합니다! 🚀</h1>
      <p>이곳에서 다양한 글을 읽고 작성할 수 있습니다.</p>
      
      {/* ✅ 버튼 추가 */}
      <button onClick={() => navigate('/template/blog')} style={styles.button}>
        블로그 보러 가기 📝
      </button>
    </div>
  );
};

// ✅ 버튼 스타일 추가
const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default HomePage;
