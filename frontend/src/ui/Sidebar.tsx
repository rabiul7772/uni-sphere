import Logo from './Logo';
import Mainnav from './Mainnav';
import Logout from './Logout';
import { ThemeToggle } from './ThemeToggle';

const Sidebar = () => {
  return (
    <aside className="hidden w-[280px] flex-col bg-sidebar lg:flex border-r border-sidebar-border h-full">
      <div className="flex items-center justify-between pr-4">
        <Logo />
        <ThemeToggle />
      </div>
      <Mainnav />
      <Logout />
    </aside>
  );
};

export default Sidebar;
