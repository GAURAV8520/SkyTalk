import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryclient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <QueryClientProvider client={queryclient}>
              <App />
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
