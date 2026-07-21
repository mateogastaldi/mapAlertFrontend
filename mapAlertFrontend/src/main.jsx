import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/jetbrains-mono/500.css'
import './index.css'
import App from './App.jsx'
import theme from "./theme/theme.js"
import { AuthProvider } from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <Box
            sx={{
              height: '100vh',
              width: '100vw',
              overflow: 'auto',
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
        </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)