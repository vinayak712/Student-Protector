import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_Id=import.meta.env.CLIENT_ID;
createRoot(document.getElementById('root')).render(
  <StrictMode>
<GoogleOAuthProvider clientId={CLIENT_Id}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
