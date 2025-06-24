import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Upload Center', path: '/upload' },
  { name: 'Item Master', path: '/items' },
  { name: 'Goods Receipt', path: '/receipt' },
  { name: 'Inventory Data', path: '/inventory' },
  { name: 'Alerts', path: '/alerts' },
  { name: 'Admin Settings', path: '/admin' },
  { name: 'AI Chat', path: '/ai-chat' },
];

export default function Layout() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-brand-lightBlue">
      <aside className="w-64 bg-brand-navy border-r flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-brand-lightBlue">
          <img src="/src/assets/ftai-logo.png" alt="FTAI Aviation" className="h-10" />
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded font-semibold transition-colors duration-200
                    ${location.pathname === item.path
                      ? 'bg-brand-orange text-white'
                      : 'text-white hover:bg-brand-blue hover:text-white'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-brand-lightBlue">
          <button
            onClick={handleLogout}
            className="w-full bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-brand-yellow font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
} 