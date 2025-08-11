import { ThemeProvider } from './ThemeContext';
import Header from './Header';

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <Header showThemeToggle={true} />
    </ThemeProvider>
  );
};

export default AppWrapper;