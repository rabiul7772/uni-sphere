import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Logo from './Logo';

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden flex-col lg:flex-row">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <Logo />
        <MobileNav />
      </div>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-card lg:rounded-tl-[32px] lg:my-2 lg:mr-2 shadow-xl border-t lg:border border-border">
        <div className="container mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
