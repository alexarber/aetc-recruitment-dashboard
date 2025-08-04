import React, { useState } from 'react';
import { 
  Menu, 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  User as UserIcon, 
  LogOut,
  Settings,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, FilterDimensions } from '@/types';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  filters: FilterDimensions;
  onFiltersChange: (filters: FilterDimensions) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  user, 
  activeTab, 
  onTabChange, 
  onLogout, 
  filters, 
  onFiltersChange 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const menuItems = [
    {
      text: 'Executive Dashboard',
      icon: LayoutDashboard,
      id: 'executive',
      roles: ['super_user', 'content_creator', 'user']
    },
    {
      text: 'Campaign Performance',
      icon: Target,
      id: 'campaigns',
      roles: ['super_user', 'content_creator', 'user']
    },
    {
      text: 'Advanced Analytics',
      icon: BarChart3,
      id: 'analytics',
      roles: ['super_user', 'content_creator']
    },
    {
      text: 'Instructions',
      icon: Settings,
      id: 'reports',
      roles: ['super_user', 'content_creator', 'user']
    }
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role.name || '')
  );

  const handleLogout = () => {
    setProfileMenuOpen(false);
    onLogout();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-200 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:inset-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-24 px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AETC</span>
              </div>
              <div className="text-center">
                <h2 className="text-sm font-bold text-white leading-tight">Air Education and Training Command</h2>
                <p className="text-xs text-gray-300 mt-1">Recruitment Analytics Dashboard</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 bg-muted/30 mx-4 mt-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.role.displayName}</p>
              </div>
            </div>
            <Badge variant="government" className="text-xs">
              {user?.role.displayName}
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.text}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 text-gray-300 hover:text-white hover:bg-gray-700",
                    isActive && "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <IconComponent className="mr-3 h-4 w-4" />
                  <span className="text-sm">{item.text}</span>
                </Button>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-card border-b border-border">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">
              {filteredMenuItems.find(item => item.id === activeTab)?.text || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {activeTab !== 'reports' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                title="Toggle Filters"
              >
                <Filter className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <UserIcon className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Filters Panel */}
        {showFilters && activeTab !== 'reports' && (
          <div className="border-b border-border p-4 bg-muted/30">
            <AdvancedFilters 
              filters={filters} 
              onFiltersChange={onFiltersChange}
            />
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 pb-20">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;