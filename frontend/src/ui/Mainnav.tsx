import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { navItems } from '@/constants';

const Mainnav = () => {
  return (
    <nav className="flex flex-col gap-2 px-4">
      {navItems.map(item => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200',
              isActive
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Mainnav;
