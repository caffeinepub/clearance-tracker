import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './pages/MainPage';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <MainPage />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
