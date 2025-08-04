import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterDimensions, User } from '@/types';
import { exportCampaignPDF } from '@/utils/pdfExport';
import { 
  Target, 
  TrendingUp, 
  DollarSign,
  Users, 
  BarChart3,
  PieChart,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Loader2
} from 'lucide-react';

interface CampaignDashboardProps {
  filters: FilterDimensions;
  user?: User;
}

interface CampaignData {
  id: string;
  name: string;
  channel: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  leads: number;
  enlistments: number;
  ctr: number;
  cpl: number;
  roas: number;
  conversionRate: number;
  startDate: string;
  endDate: string;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ filters, user }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [isExporting, setIsExporting] = useState(false);

  // Mock campaign data
  const baseCampaignData: CampaignData[] = [
    {
      id: 'camp-001',
      name: 'Air Force Career Explorer - Search',
      channel: 'paid_search',
      status: 'active',
      budget: 125000,
      spent: 89450,
      impressions: 2450000,
      clicks: 24500,
      leads: 1225,
      enlistments: 87,
      ctr: 1.0,
      cpl: 73,
      roas: 4.2,
      conversionRate: 7.1,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: 'camp-002',
      name: 'Space Force Social - Gen Z',
      channel: 'social_media',
      status: 'active',
      budget: 85000,
      spent: 67200,
      impressions: 1890000,
      clicks: 18900,
      leads: 756,
      enlistments: 45,
      ctr: 1.0,
      cpl: 89,
      roas: 3.1,
      conversionRate: 6.0,
      startDate: '2024-02-01',
      endDate: '2024-04-30'
    },
    {
      id: 'camp-003',
      name: 'Technical Career Display',
      channel: 'display',
      status: 'active',
      budget: 65000,
      spent: 54300,
      impressions: 3200000,
      clicks: 16000,
      leads: 480,
      enlistments: 29,
      ctr: 0.5,
      cpl: 113,
      roas: 2.8,
      conversionRate: 6.0,
      startDate: '2024-01-15',
      endDate: '2024-04-15'
    },
    {
      id: 'camp-004',
      name: 'Officer Recruitment Email',
      channel: 'email',
      status: 'completed',
      budget: 25000,
      spent: 24800,
      impressions: 450000,
      clicks: 13500,
      leads: 405,
      enlistments: 32,
      ctr: 3.0,
      cpl: 61,
      roas: 5.2,
      conversionRate: 7.9,
      startDate: '2024-01-01',
      endDate: '2024-02-28'
    },
    {
      id: 'camp-005',
      name: 'Recruiting Event Series',
      channel: 'events',
      status: 'active',
      budget: 95000,
      spent: 71250,
      impressions: 125000,
      clicks: 3750,
      leads: 1125,
      enlistments: 90,
      ctr: 3.0,
      cpl: 63,
      roas: 6.1,
      conversionRate: 8.0,
      startDate: '2024-02-15',
      endDate: '2024-05-15'
    }
  ];

  // Apply filters to campaign data
  const getFilteredCampaigns = () => {
    return baseCampaignData.filter(campaign => {
      if (filters.channel.length > 0 && !filters.channel.includes(campaign.channel as any)) {
        return false;
      }
      if (filters.campaign.length > 0 && !filters.campaign.includes(campaign.name)) {
        return false;
      }
      return true;
    });
  };

  const campaigns = getFilteredCampaigns();

  // Calculate aggregate metrics
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalEnlistments = campaigns.reduce((sum, c) => sum + c.enlistments, 0);
  const averageROAS = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;
  const averageCPL = campaigns.reduce((sum, c) => sum + c.cpl, 0) / campaigns.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'positive' as const;
      case 'paused': return 'neutral' as const;
      case 'completed': return 'secondary' as const;
      default: return 'secondary' as const;
    }
  };

  const getPerformanceColor = (value: number, metric: 'roas' | 'cpl' | 'ctr') => {
    switch (metric) {
      case 'roas':
        if (value >= 4) return 'text-green-600';
        if (value >= 3) return 'text-blue-600';
        if (value >= 2) return 'text-yellow-600';
        return 'text-red-600';
      case 'cpl':
        if (value <= 60) return 'text-green-600';
        if (value <= 80) return 'text-blue-600';
        if (value <= 100) return 'text-yellow-600';
        return 'text-red-600';
      case 'ctr':
        if (value >= 2) return 'text-green-600';
        if (value >= 1.5) return 'text-blue-600';
        if (value >= 1) return 'text-yellow-600';
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleExportPDF = async () => {
    if (!user) return;
    
    setIsExporting(true);
    try {
      await exportCampaignPDF(user, filters, campaigns);
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Performance</h1>
          <p className="text-muted-foreground">
            Deep-dive analytics for recruitment campaigns across all channels
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setViewMode('overview')}
            size="sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
            size="sm"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Detailed
          </Button>
          
          {user && (
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Summary */}
      {(filters.channel.length > 0 || filters.campaign.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center p-4 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">Active Filters:</span>
          {filters.channel.map(channel => (
            <Badge key={channel} variant="secondary" className="text-xs">
              Channel: {channel.replace('_', ' ')}
            </Badge>
          ))}
          {filters.campaign.map(campaign => (
            <Badge key={campaign} variant="secondary" className="text-xs">
              Campaign: {campaign}
            </Badge>
          ))}
        </div>
      )}

      {/* Aggregate KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="neutral" className="text-xs">
                    ${totalSpent.toLocaleString()} spent
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enlistments</p>
                <p className="text-2xl font-bold">{totalEnlistments}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="positive" className="text-xs">
                    {((totalEnlistments / totalLeads) * 100).toFixed(1)}% conv.
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg ROAS</p>
                <p className="text-2xl font-bold">{averageROAS.toFixed(1)}x</p>
                <div className="flex items-center mt-1">
                  <Badge variant={averageROAS >= 3 ? 'positive' : 'neutral'} className="text-xs">
                    ${averageCPL.toFixed(0)} CPL
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'overview' ? (
        /* Campaign Overview Table */
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Campaign Performance Overview
            </CardTitle>
            <CardDescription>
              {campaigns.length} campaigns tracked • Click a campaign for detailed analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedCampaign === campaign.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCampaign(
                    selectedCampaign === campaign.id ? null : campaign.id
                  )}
                >
                  {/* Campaign Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span className="capitalize">{campaign.channel.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(campaign.status)} className="capitalize">
                      {campaign.status}
                    </Badge>
                  </div>

                  {/* Campaign Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="font-semibold">${(campaign.budget / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="font-semibold">${(campaign.spent / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Impressions</p>
                      <p className="font-semibold">{(campaign.impressions / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="font-semibold">{(campaign.clicks / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Leads</p>
                      <p className="font-semibold">{campaign.leads}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Enlistments</p>
                      <p className="font-semibold">{campaign.enlistments}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">CTR</p>
                      <p className={`font-semibold ${getPerformanceColor(campaign.ctr, 'ctr')}`}>
                        {campaign.ctr.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">ROAS</p>
                      <p className={`font-semibold ${getPerformanceColor(campaign.roas, 'roas')}`}>
                        {campaign.roas.toFixed(1)}x
                      </p>
                    </div>
                  </div>

                  {/* Expanded Campaign Details */}
                  {selectedCampaign === campaign.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Performance Indicators */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Performance Indicators</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Cost per Lead:</span>
                              <span className={`font-medium ${getPerformanceColor(campaign.cpl, 'cpl')}`}>
                                ${campaign.cpl}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Conversion Rate:</span>
                              <span className="font-medium">{campaign.conversionRate}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Budget Utilization:</span>
                              <span className="font-medium">
                                {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Channel Insights */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Channel Insights</h4>
                          <div className="space-y-1 text-sm">
                            {campaign.channel === 'paid_search' && (
                              <>
                                <p>• High-intent keyword targeting</p>
                                <p>• Strong CTR performance</p>
                                <p>• Optimize for mobile traffic</p>
                              </>
                            )}
                            {campaign.channel === 'social_media' && (
                              <>
                                <p>• Gen Z demographic focus</p>
                                <p>• Video content performing well</p>
                                <p>• Increase engagement tactics</p>
                              </>
                            )}
                            {campaign.channel === 'display' && (
                              <>
                                <p>• Brand awareness focused</p>
                                <p>• Lower CTR, higher reach</p>
                                <p>• Retargeting opportunities</p>
                              </>
                            )}
                            {campaign.channel === 'email' && (
                              <>
                                <p>• High engagement rates</p>
                                <p>• Officer recruitment focus</p>
                                <p>• Personalized messaging</p>
                              </>
                            )}
                            {campaign.channel === 'events' && (
                              <>
                                <p>• Direct personal interaction</p>
                                <p>• High conversion quality</p>
                                <p>• Geographic concentration</p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Optimization Recommendations */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">AI Recommendations</h4>
                          <div className="space-y-1 text-sm">
                            {campaign.roas < 3 && (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                                <span>Improve targeting efficiency</span>
                              </div>
                            )}
                            {campaign.cpl > 100 && (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                <span>Reduce cost per lead</span>
                              </div>
                            )}
                            {campaign.roas >= 4 && (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>Consider budget increase</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Zap className="h-3 w-3 text-blue-500" />
                              <span>A/B testing opportunities</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Detailed Analytics View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Performance Breakdown */}
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Channel Performance
              </CardTitle>
              <CardDescription>
                Budget allocation and performance by channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  campaigns.reduce((acc, campaign) => {
                    const channel = campaign.channel;
                    if (!acc[channel]) {
                      acc[channel] = {
                        budget: 0,
                        spent: 0,
                        leads: 0,
                        enlistments: 0,
                        campaigns: 0
                      };
                    }
                    acc[channel].budget += campaign.budget;
                    acc[channel].spent += campaign.spent;
                    acc[channel].leads += campaign.leads;
                    acc[channel].enlistments += campaign.enlistments;
                    acc[channel].campaigns += 1;
                    return acc;
                  }, {} as Record<string, any>)
                ).map(([channel, data], index) => (
                  <div key={channel} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: `hsl(${200 + index * 50}, 70%, 50%)` }}
                      />
                      <div>
                        <p className="font-medium capitalize">{channel.replace('_', ' ')}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.campaigns} campaigns • {data.leads} leads
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(data.budget / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-muted-foreground">
                        {((data.enlistments / data.leads) * 100).toFixed(1)}% conv.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Campaigns */}
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Top Performers
              </CardTitle>
              <CardDescription>
                Campaigns ranked by ROAS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaigns
                  .sort((a, b) => b.roas - a.roas)
                  .slice(0, 5)
                  .map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {campaign.channel.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="positive" className="mb-1">
                          {campaign.roas.toFixed(1)}x ROAS
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {campaign.enlistments} enlistments
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};

export default CampaignDashboard;