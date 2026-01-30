import Logo from './Logo';
import Mainnav from './Mainnav';
import Logout from './Logout';

const Sidebar = () => {
  return (
    <aside className="hidden w-[280px] flex-col bg-[#0F172A] lg:flex">
      <Logo />
      <Mainnav />
      <Logout />
    </aside>
  );
};

export default Sidebar;
