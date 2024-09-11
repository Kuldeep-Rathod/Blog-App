import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContext, AuthContextProvider} from './context/authContext.jsx'

// export const server = "http://localhost:8800/api"

export const server = "https://blog-app-six-khaki.vercel.app"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
