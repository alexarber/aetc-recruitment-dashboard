import React from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RecruitmentFunnel from '@/components/funnel/RecruitmentFunnel';
import { mockRecruitmentData, calculateKPIs } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

const ExecutiveDashboard: React.FC = () => {
  const kpis = calculateKPIs(mockRecruitmentData);

  const executiveKPIs = [
    {
      title: 'Total Enlisted',
      value: formatNumber(kpis.totalEnlisted),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Personnel successfully enlisted'
    },
    {
      title: 'Cost Per Enlistment',
      value: formatCurrency(Math.round(kpis.costPerEnlistment)),
      change: '-8%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Average cost to enlist one person'
    },
    {
      title: 'Return on Ad Spend',
      value: `${kpis.returnOnAdSpend.toFixed(1)}x`,
      change: '+23%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Revenue generated per dollar spent'
    },
    {
      title: 'Active Campaigns',
      value: '24',
      change: '+3',
      changeType: 'positive' as const,
      icon: Target,
      description: 'Currently running recruitment campaigns'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-muted-foreground">
          High-level recruitment performance and strategic insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {executiveKPIs.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="government-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {kpi.description}
                    </p>
                    <Badge 
                      variant={kpi.changeType === 'positive' ? 'positive' : 'negative'}
                      className="text-xs"
                    >
                      {kpi.change}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Funnel */}
      <RecruitmentFunnel 
        variant="interactive" 
        showInsights={true}
        className="animate-fade-in"
      />

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Performing Channels */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="text-base">Top Channels</CardTitle>
            <CardDescription>Last 30 days performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Paid Search', enlistments: 85, roas: '5.1x', change: '+12%' },
              { name: 'Social Media', enlistments: 72, roas: '3.8x', change: '+8%' },
              { name: 'Display Ads', enlistments: 58, roas: '3.2x', change: '-3%' },
              { name: 'Email Marketing', enlistments: 31, roas: '2.9x', change: '+15%' }
            ].map((channel, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{channel.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {channel.enlistments} enlisted
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="government" className="text-xs">
                    {channel.roas}
                  </Badge>
                  <Badge 
                    variant={channel.change.startsWith('+') ? 'positive' : 'negative'} 
                    className="text-xs"
                  >
                    {channel.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Performance */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="text-base">Geographic Performance</CardTitle>
            <CardDescription>Top recruiting regions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { region: 'Texas', enlistments: 94, rate: '3.2%', trend: 'up' },
              { region: 'California', enlistments: 87, rate: '2.8%', trend: 'up' },
              { region: 'Florida', enlistments: 72, rate: '2.5%', trend: 'stable' },
              { region: 'Georgia', enlistments: 58, rate: '2.1%', trend: 'down' }
            ].map((region, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{region.region}</p>
                  <p className="text-xs text-muted-foreground">
                    {region.enlistments} enlisted • {region.rate} rate
                  </p>
                </div>
                <div className="flex items-center">
                  {region.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {region.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                  {region.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-400 rounded" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;