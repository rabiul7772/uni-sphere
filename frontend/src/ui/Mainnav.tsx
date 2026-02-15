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
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-sidebar-accent text-foreground shadow-md ring-1 ring-border/50'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
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
