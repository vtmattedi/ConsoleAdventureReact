
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppShell from './Components/AppShell/AppShell';
import { ThemeProvider } from './MattediWorks/hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <div className='bgDiv'>
        <AppShell />
      </div>
    </ThemeProvider>
  );
}

export default App;
