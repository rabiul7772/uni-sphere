import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Mainnav from './Mainnav';
import Logo from './Logo';
import Logout from './Logout';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[350px] p-0 flex flex-col h-full overflow-hidden"
      >
        <SheetHeader className="p-4 border-b border-border flex flex-row items-center justify-between shrink-0">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
          <ThemeToggle />
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-2">
            <Mainnav />
          </div>
        </div>
        <div className="shrink-0">
          <Logout />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
