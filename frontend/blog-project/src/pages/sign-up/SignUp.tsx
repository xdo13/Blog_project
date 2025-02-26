import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동을 위한 Hook 추가
import { signUp } from '../../api/auth'; // ✅ API 연동 추가

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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 Hook

  // 입력값 검증 상태 관리
  const [form, setForm] = React.useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = React.useState({ username: '', email: '', password: '' });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // 입력 시 오류 메시지 초기화
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 유효성 검사
    let newErrors = { username: '', email: '', password: '' };
    let isValid = true;

    if (!form.username) {
      newErrors.username = '이름을 입력하세요.';
      isValid = false;
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '올바른 이메일을 입력하세요.';
      isValid = false;
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      await signUp(form);
      alert('회원가입 성공!');
      navigate('/template/signin'); // ✅ 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입 실패: ' + error.response?.data || '서버 오류');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="username">이름</FormLabel>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                placeholder="홍길동"
                value={form.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
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
                placeholder="••••••"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="무언가 체크할 수도 있으니 남겨둔 체크박스"
            />
            <Button type="submit" fullWidth variant="contained">
              회원가입
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>또는</Typography>
          </Divider>
          <Typography sx={{ textAlign: 'center' }}>
            이미 계정이 있나요?{' '}
            <Link href="/template/signin" variant="body2">
              로그인
            </Link>
            <br></br>
            <Link href="/template/blog" variant="body2">
              홈으로
            </Link>
          </Typography>
        </Card>
      </Stack>
    </AppTheme>
  );
}
