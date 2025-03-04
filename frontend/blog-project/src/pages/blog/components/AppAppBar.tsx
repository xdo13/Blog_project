import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../../api/auth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  // ✅ 로그인된 사용자 확인
  React.useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // ✅ 로그아웃 실행
  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    setUser(null);
    navigate('/blog');
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClick = () => {
    navigate("/blog"); // 원하는 경로로 설정
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <IconButton onClick={handleClick}>
           <Sitemark />
          </IconButton>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">Blog</Button>
              <Button variant="text" color="info" size="small">React</Button>
              <Button variant="text" color="info" size="small">Spring Boot</Button>
              <Button variant="text" color="info" size="small">JAVA</Button>
              <Button variant="text" color="info" size="small">MySQL</Button>
              <Button variant="text" color="info" size="small">AWS</Button>
            </Box>
          </Box>
          
          {/* ✅ 로그인 여부에 따라 버튼 변경 */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {user ? (
              <>
                <Button color="primary" variant="contained" size="small" onClick={() => navigate('/post/create')}>
                  ✍ 게시글 작성
                </Button>
                <Button color="error" variant="outlined" size="small" onClick={handleLogout}>
                  🚪 로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button color="primary" variant="text" size="small" onClick={() => navigate('/signin')}>
                  로그인
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={() => navigate('/signup')}>
                  회원가입
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>

          {/* ✅ 모바일 메뉴 */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {user ? (
                  <>
                    <MenuItem onClick={() => navigate('/post/new')}>✍ 게시글 작성</MenuItem>
                    <MenuItem onClick={handleLogout}>🚪 로그아웃</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => navigate('/signin')}>로그인</MenuItem>
                    <MenuItem onClick={() => navigate('/signup')}>회원가입</MenuItem>
                  </>
                )}
                <Divider sx={{ my: 3 }} />
                <MenuItem>Blog</MenuItem>
                <MenuItem>React</MenuItem>
                <MenuItem>Spring Boot</MenuItem>
                <MenuItem>JAVA</MenuItem>
                <MenuItem>MySQL</MenuItem>
                <MenuItem>AWS</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
