import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/tailwind.css"
import { ThemeProvider } from '@material-tailwind/react'
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ThemeProvider>
    </StrictMode>
)
  