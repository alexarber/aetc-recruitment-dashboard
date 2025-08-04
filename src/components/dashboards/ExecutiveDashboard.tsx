import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RecruitmentFunnel from '@/components/funnel/RecruitmentFunnel';
import { FilterDimensions, User } from '@/types';
import { exportExecutivePDF } from '@/utils/pdfExport';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  Award,
  Activity,
  MapPin,
  Download,
  Loader2
} from 'lucide-react';

interface ExecutiveDashboardProps {
  filters: FilterDimensions;
  user?: User;
}

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ filters, user }) => {
  const [isExporting, setIsExporting] = useState(false);
  // Apply filters to adjust data display
  const getFilteredMultiplier = () => {
    let multiplier = 1;
    
    // Service filter impact
    if (filters.service.length > 0) {
      if (filters.service.includes('USSF')) multiplier *= 0.3; // Space Force is smaller
      if (filters.service.includes('USAF')) multiplier *= 0.85; // Air Force is larger
    }
    
    // Channel filter impact
    if (filters.channel.length > 0) {
      const channelMultipliers: Record<string, number> = {
        'paid_search': 0.4,
        'social_media': 0.25,
        'display': 0.2,
        'organic': 0.15,
        'direct': 0.1,
        'email': 0.08,
        'events': 0.05
      };
      multiplier = filters.channel.reduce((acc, channel) => 
        acc + (channelMultipliers[channel] || 0.1), 0
      );
    }
    
    // Region filter impact
    if (filters.geography.region.length > 0) {
      const regionMultipliers: Record<string, number> = {
        'Southeast': 0.35,
        'Southwest': 0.25,
        'Midwest': 0.2,
        'West': 0.15,
        'Northeast': 0.05
      };
      multiplier = filters.geography.region.reduce((acc, region) => 
        acc + (regionMultipliers[region] || 0.1), 0
      );
    }
    
    return Math.max(0.05, Math.min(1, multiplier)); // Keep between 5% and 100%
  };

  const filterMultiplier = getFilteredMultiplier();
  
  // Mock KPI data adjusted by filters
  const baseKpiData = {
    totalLeads: 45892,
    qualifiedLeads: 28445,
    enlistments: 3247,
    conversionRate: 7.1,
    costPerLead: 127,
    roas: 4.2,
    averageTimeToEnlist: 42,
    topPerformingChannel: 'Paid Search'
  };

  const kpiData = {
    totalLeads: Math.round(baseKpiData.totalLeads * filterMultiplier),
    qualifiedLeads: Math.round(baseKpiData.qualifiedLeads * filterMultiplier),
    enlistments: Math.round(baseKpiData.enlistments * filterMultiplier),
    conversionRate: baseKpiData.conversionRate + (filterMultiplier - 1) * 2, // Slightly adjust conversion rate
    costPerLead: Math.round(baseKpiData.costPerLead * (2 - filterMultiplier)), // Inverse relationship
    roas: Math.round((baseKpiData.roas * filterMultiplier + 2) * 10) / 10,
    averageTimeToEnlist: baseKpiData.averageTimeToEnlist,
    topPerformingChannel: filters.channel.length > 0 ? 
      filters.channel[0].replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
      'Paid Search'
  };

  const baseMonthlyTrends = [
    { month: 'October', leads: 4200, enlistments: 298, conversionRate: 7.1 },
    { month: 'November', leads: 4856, enlistments: 334, conversionRate: 6.9 },
    { month: 'December', leads: 3967, enlistments: 285, conversionRate: 7.2 },
    { month: 'January', leads: 5234, enlistments: 378, conversionRate: 7.2 },
    { month: 'February', leads: 4789, enlistments: 347, conversionRate: 7.2 },
    { month: 'March', leads: 5089, enlistments: 365, conversionRate: 7.2 }
  ];

  const monthlyTrends = baseMonthlyTrends.map(month => ({
    ...month,
    leads: Math.round(month.leads * filterMultiplier),
    enlistments: Math.round(month.enlistments * filterMultiplier),
    conversionRate: Math.round((month.conversionRate + (filterMultiplier - 1) * 2) * 10) / 10
  }));

  const handleExportPDF = async () => {
    if (!user) return;
    
    setIsExporting(true);
    try {
      await exportExecutivePDF(user, filters, {
        totalLeads: kpiData.totalLeads,
        qualifiedLeads: kpiData.qualifiedLeads,
        enlistments: kpiData.enlistments,
        conversionRate: kpiData.conversionRate,
        costPerLead: kpiData.costPerLead,
        roas: kpiData.roas
      });
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
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            Strategic overview of AETC recruitment performance and key metrics
          </p>
        </div>
        
        {user && (
          <Button
            onClick={handleExportPDF}
            disabled={isExporting}
            variant="outline"
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

      {/* Filter Summary */}
      {(filters.service.length > 0 || filters.channel.length > 0 || filters.geography.region.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center p-4 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">Active Filters:</span>
          {filters.service.map(service => (
            <Badge key={service} variant="secondary" className="text-xs">
              Service: {service}
            </Badge>
          ))}
          {filters.channel.map(channel => (
            <Badge key={channel} variant="secondary" className="text-xs">
              Channel: {channel.replace('_', ' ')}
            </Badge>
          ))}
          {filters.geography.region.map(region => (
            <Badge key={region} variant="secondary" className="text-xs">
              Region: {region}
            </Badge>
          ))}
        </div>
      )}

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{kpiData.totalLeads.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualified Leads</p>
                <p className="text-2xl font-bold">{kpiData.qualifiedLeads.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="positive" className="text-xs">
                    {((kpiData.qualifiedLeads / kpiData.totalLeads) * 100).toFixed(1)}% qual. rate
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enlistments</p>
                <p className="text-2xl font-bold">{kpiData.enlistments.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="positive" className="text-xs">
                    {kpiData.conversionRate}% conversion
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost per Lead</p>
                <p className="text-2xl font-bold">${kpiData.costPerLead}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="positive" className="text-xs">
                    {kpiData.roas}x ROAS
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Trend */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Monthly Performance Trends
          </CardTitle>
          <CardDescription>
            6-month recruitment performance overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyTrends.map((month) => (
              <div key={month.month} className="space-y-2 p-4 border rounded-lg">
                <div className="text-center">
                  <h4 className="font-semibold text-sm text-foreground">{month.month}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Leads</span>
                    <span className="font-medium text-foreground">{month.leads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Enlistments</span>
                    <span className="font-medium text-foreground">{month.enlistments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conv. Rate</span>
                    <span className="font-medium text-foreground">{month.conversionRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recruitment Funnel */}
      <RecruitmentFunnel />

      {/* Channel Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Top Performing Channels
            </CardTitle>
            <CardDescription>
              Best channels by conversion rate and volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { channel: 'Paid Search', leads: 12843, enlistments: 1156, rate: 9.0, cost: 89, key: 'paid_search' },
                { channel: 'Social Media', leads: 8734, enlistments: 524, rate: 6.0, cost: 145, key: 'social_media' },
                { channel: 'Display Ads', leads: 6721, enlistments: 403, rate: 6.0, cost: 167, key: 'display' },
                { channel: 'Organic', leads: 5432, enlistments: 379, rate: 7.0, cost: 23, key: 'organic' },
                { channel: 'Email', leads: 3245, enlistments: 227, rate: 7.0, cost: 45, key: 'email' }
              ]
              .filter(channel => filters.channel.length === 0 || filters.channel.includes(channel.key as any))
              .map((channel, index) => {
                const channelMultiplier = filters.channel.length > 0 ? 1 : filterMultiplier;
                const adjustedChannel = {
                  ...channel,
                  leads: Math.round(channel.leads * channelMultiplier),
                  enlistments: Math.round(channel.enlistments * channelMultiplier),
                  cost: Math.round(channel.cost * (2 - channelMultiplier))
                };
                return (
                <div key={adjustedChannel.channel} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-8 bg-primary rounded" style={{ 
                      backgroundColor: `hsl(${200 + index * 30}, 70%, 50%)` 
                    }} />
                    <div>
                      <p className="font-medium">{adjustedChannel.channel}</p>
                      <p className="text-sm text-muted-foreground">
                        {adjustedChannel.leads.toLocaleString()} leads • {adjustedChannel.enlistments} enlistments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="positive" className="mb-1">
                      {adjustedChannel.rate}% conv.
                    </Badge>
                    <p className="text-sm text-muted-foreground">${adjustedChannel.cost} CPL</p>
                  </div>
                </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Geographic Performance
            </CardTitle>
            <CardDescription>
              Recruitment performance by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: 'Southeast', leads: 14523, enlistments: 1089, rate: 7.5 },
                { region: 'Southwest', leads: 11867, enlistments: 831, rate: 7.0 },
                { region: 'Midwest', leads: 9234, enlistments: 647, rate: 7.0 },
                { region: 'West', leads: 7123, enlistments: 456, rate: 6.4 },
                { region: 'Northeast', leads: 3145, enlistments: 224, rate: 7.1 }
              ]
              .filter(region => filters.geography.region.length === 0 || filters.geography.region.includes(region.region))
              .map((region) => {
                const regionMultiplier = filters.geography.region.length > 0 ? 1 : filterMultiplier;
                const adjustedRegion = {
                  ...region,
                  leads: Math.round(region.leads * regionMultiplier),
                  enlistments: Math.round(region.enlistments * regionMultiplier)
                };
                return (
                <div key={adjustedRegion.region} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{adjustedRegion.region}</p>
                    <p className="text-sm text-muted-foreground">
                      {adjustedRegion.leads.toLocaleString()} leads • {adjustedRegion.enlistments} enlistments
                    </p>
                  </div>
                  <Badge variant="positive">
                    {adjustedRegion.rate}%
                  </Badge>
                </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default ExecutiveDashboard;