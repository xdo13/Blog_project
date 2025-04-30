import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, CssBaseline, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppAppBar from './AppAppBar';
import AppTheme from '../../../shared-theme/AppTheme';
import Footer from './Footer';


// 임시 물품 데이터 (실제로는 API나 DB에서 가져올 수 있음)
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

const Store: React.FC = () => {
  const navigate = useNavigate();

  // 구매 버튼 클릭 시 동작 (예: 상세 페이지로 이동)
  const handlePurchase = (productId: number) => {
    navigate(`/product/${productId}`); // 상품 상세 페이지로 이동
  };

  return (
    <AppTheme>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md">
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        상점
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  가격: {product.price.toLocaleString()}원
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handlePurchase(product.id)}
                >
                  구매하기
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Container>
    </Stack>
    <Footer />
    </AppTheme>
  );
};

export default Store;