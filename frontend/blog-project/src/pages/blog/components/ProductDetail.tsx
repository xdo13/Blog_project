import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardMedia, CardContent, CssBaseline, Stack } from '@mui/material';
import AppAppBar from './AppAppBar';
import AppTheme from '../../../shared-theme/AppTheme';
import Footer from './Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: '노트북', price: 1200000, image: 'https://via.placeholder.com/150' },
  { id: 2, name: '스마트폰', price: 800000, image: 'https://via.placeholder.com/150' },
  { id: 3, name: '헤드폰', price: 150000, image: 'https://via.placeholder.com/150' },
  { id: 4, name: '키보드', price: 100000, image: 'https://via.placeholder.com/150' },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <AppTheme>
        <AppAppBar />
        <Container sx={{ py: 4 }}>
          <Typography>제품을 찾을 수 없습니다.</Typography>
          <Button variant="outlined" onClick={() => navigate('/')}>돌아가기</Button>
        </Container>
        <Footer />
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md"></Container>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center"></Typography>
        <Card sx={{ maxWidth: 400, mx: 'auto' }}>
          <CardMedia component="img" height="200" image={product.image} alt={product.name} />
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>가격: {product.price.toLocaleString()}원</Typography>
          </CardContent>
          <Button variant="contained" fullWidth onClick={() => alert('구매 구현 필요')}>
            구매
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/')}>
            돌아가기
          </Button>
        </Card>
      </Container>
      </Stack>
      <Footer />
    </AppTheme>
  );
};

export default ProductDetail;