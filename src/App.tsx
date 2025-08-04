import React, { useState } from 'react';
import LoginPage from '@/components/auth/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ExecutiveDashboard from '@/components/dashboards/ExecutiveDashboard';
import CampaignDashboard from '@/components/dashboards/CampaignDashboard';
import AnalyticsDashboard from '@/components/dashboards/AnalyticsDashboard';
import InstructionsDashboard from '@/components/dashboards/InstructionsDashboard';
import { User, FilterDimensions } from '@/types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('executive');
  const [filters, setFilters] = useState<FilterDimensions>({
    enterprise: [],
    service: [],
    campaign: [],
    channel: [],
    tactic: [],
    geography: { region: [], state: [], city: [] },
    dateRange: { start: new Date(), end: new Date() },
    source: []
  });

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('executive');
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout 
      user={currentUser} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onLogout={handleLogout}
      filters={filters}
      onFiltersChange={setFilters}
    >
      {activeTab === 'executive' && (
        <ExecutiveDashboard filters={filters} user={currentUser} />
      )}
      {activeTab === 'campaigns' && (
        <CampaignDashboard filters={filters} user={currentUser} />
      )}
      {activeTab === 'analytics' && (
        <AnalyticsDashboard filters={filters} user={currentUser} />
      )}
      {activeTab === 'reports' && (
        <InstructionsDashboard user={currentUser} />
      )}
    </DashboardLayout>
  );
};

export default App;