import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import AppTheme from '../../shared-theme/AppTheme';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import AppAppBar from '../blog/components/AppAppBar';
import Footer from '../blog/components/Footer';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({ email: '', password: '' });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 유효성 검사
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!form.email) {
      newErrors.email = '이메일을 입력하세요.';
      isValid = false;
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      const response = await login(form);
      const token = response.data.token; // JWT 토큰 추출
      console.log(token);
      alert("로그인 성공!");
      localStorage.setItem("jwtToken", token);

      navigate('/blog'); // ✅ 로그인 후 홈 페이지로 이동
    } catch (error) {
      alert('로그인 실패: ' + (error.response?.data || '아이디 혹은 비밀번호가 틀렸습니다.'));
    }
  };

  return (
    <AppTheme {...props}>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">아이디</FormLabel>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                placeholder="아이디 입력"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <TextField
                name="password"
                required
                fullWidth
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              로그인
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>또는</Typography>
          </Divider>
          <Typography sx={{ textAlign: 'center' }}>
            회원이 아니신가요?{' '}
            <Link href="/signup" variant="body2">
              회원가입하기
            </Link>
            <br></br>
            <Link href="/blog" variant="body2">
              홈으로
            </Link>
          </Typography>
        </Card>
      </Stack>
      <Footer />
    </AppTheme>
  );
}
