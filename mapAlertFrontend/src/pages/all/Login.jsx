import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import pallette from '../../styled-components/pallette.jsx';

function Login() {
    const navigate = useNavigate();

    return (
        <Container 
            maxWidth={false} 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: pallette?.secondary || '#f5f5f5',
                color: pallette?.primary || '#1976d2',
                textAlign: 'center'
            }}
        >
            <Box 
                sx={{
                    p: 5,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    maxWidth: 500
                }}
            >
                <BuildIcon sx={{ fontSize: 80, color: pallette?.primary || '#1976d2' }} />
                <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: pallette?.primary || '#1976d2' }}>
                    En Mantenimiento
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    La página de Iniciar Sesión aún está en obra. ¡Vuelve pronto!
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ 
                        mt: 2, 
                        bgcolor: pallette?.primary, 
                        color: pallette?.secondary,
                        '&:hover': {
                            bgcolor: pallette?.primary,
                            opacity: 0.9
                        }
                    }}
                >
                    Volver al Mapa
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
