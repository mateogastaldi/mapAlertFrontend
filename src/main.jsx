import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import './index.css'
import App from './App.jsx'
import theme from "./styled-components/theme.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          p: 0,
          m: 0,
          display:'flex',
          flexDirection: 'column',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <App />
      </Box>
    </ThemeProvider>
  </StrictMode>
)