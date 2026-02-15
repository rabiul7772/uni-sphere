import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="rounded-full border-2 border-border bg-muted/30 p-1 flex items-center justify-center transition-all hover:bg-muted/50 hover:border-primary/50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-7 w-7 rounded-full text-foreground hover:bg-background hover:text-primary transition-all shadow-sm"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
