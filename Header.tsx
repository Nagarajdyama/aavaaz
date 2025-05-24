
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Home, FileText, Plus, Bell, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="mr-2 h-4 w-4" /> },
    ...(isAuthenticated
      ? [
          { to: '/dashboard', label: 'Dashboard', icon: <FileText className="mr-2 h-4 w-4" /> },
          { to: '/complaints', label: 'Complaints', icon: <Bell className="mr-2 h-4 w-4" /> },
          { to: '/new-complaint', label: 'New Complaint', icon: <Plus className="mr-2 h-4 w-4" /> },
        ]
      : []),
    { to: '/about', label: 'About', icon: null },
    { to: '/contact', label: 'Contact', icon: null },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-aavaaz-navy dark:text-white">Aavaaz</span>
            <span className="ml-1 text-xs text-aavaaz-grey dark:text-gray-400 font-medium">Voice matters</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.to)
                    ? 'text-aavaaz-navy dark:text-white font-medium bg-blue-50 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-aavaaz-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu / Login Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-10 hover:bg-transparent">
                    <div className="flex items-center space-x-2">
                      <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium dark:text-white">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                      </div>
                      <Avatar className="h-9 w-9">
                        {currentUser.avatarUrl ? (
                          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                        ) : (
                          <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <Avatar className="h-4 w-4 mr-2">
                        <AvatarFallback className="text-xs">{getInitials(currentUser.name)}</AvatarFallback>
                      </Avatar>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/complaints" className="flex items-center cursor-pointer">
                      <Bell className="mr-2 h-4 w-4" />
                      My Complaints
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/new-complaint" className="flex items-center cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      New Complaint
                    </Link>
                  </DropdownMenuItem>
                  {currentUser.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center cursor-pointer">
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4V2"></path>
                          <path d="M12 20v2"></path>
                          <path d="m4.93 4.93-.7-.7"></path>
                          <path d="m19.07 19.07 .7.7"></path>
                          <path d="M2 12h2"></path>
                          <path d="M20 12h2"></path>
                          <path d="m6.34 17.66-1.41 1.41"></path>
                          <path d="m19.07 4.93 .7-.7"></path>
                          <circle cx="12" cy="12" r="4"></circle>
                        </svg>
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')} variant="default" className="bg-aavaaz-navy hover:bg-aavaaz-navy/90 dark:bg-blue-600 dark:hover:bg-blue-700">
                Login
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center py-2 ${
                  isActive(item.to)
                    ? 'text-aavaaz-navy dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-aavaaz-navy dark:hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            {isAuthenticated && currentUser && (
              <>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <Button onClick={handleLogout} variant="ghost" className="w-full justify-start p-2 h-auto">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
