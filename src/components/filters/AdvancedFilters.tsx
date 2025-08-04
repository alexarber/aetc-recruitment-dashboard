import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  Calendar, 
  MapPin, 
  Target, 
  Users, 
  DollarSign,
  Zap
} from 'lucide-react';
import { FilterDimensions } from '@/types';
import { cn } from '@/lib/utils';

interface AdvancedFiltersProps {
  filters: FilterDimensions;
  onFiltersChange: (filters: FilterDimensions) => void;
  className?: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for filter options
  const filterOptions = {
    service: ['USAF', 'USSF'],
    enterprise: ['AETC', 'AFRC', 'ANG'],
    campaign: [
      'Search Campaign 1', 'Search Campaign 2', 'Social Campaign 1', 
      'Social Campaign 2', 'Display Campaign 1', 'Email Campaign 1'
    ],
    channel: ['paid_search', 'social_media', 'display', 'organic', 'direct', 'email', 'events'],
    tactic: [
      'Generic Keywords', 'Branded Keywords', 'Competitor Keywords',
      'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads',
      'Banner Ads', 'Video Ads', 'Newsletter', 'Event Invitation'
    ],
    regions: ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'West'],
    states: ['TX', 'CA', 'FL', 'NY', 'GA', 'NC', 'OH', 'PA'],
    source: ['organic', 'paid', 'direct', 'referral', 'email', 'events']
  };

  const handleFilterChange = (key: keyof FilterDimensions, values: any) => {
    onFiltersChange({
      ...filters,
      [key]: values
    });
  };

  const handleSingleFilterToggle = (key: keyof FilterDimensions, value: string) => {
    const currentValues = filters[key] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleFilterChange(key, newValues);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      enterprise: [],
      service: [],
      campaign: [],
      channel: [],
      tactic: [],
      geography: { region: [], state: [], city: [] },
      dateRange: { start: new Date(), end: new Date() },
      source: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    count += filters.enterprise.length;
    count += filters.service.length;
    count += filters.campaign.length;
    count += filters.channel.length;
    count += filters.tactic.length;
    count += filters.geography.region.length;
    count += filters.geography.state.length;
    count += filters.source?.length || 0;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-2">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {/* Service Filter */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Service</span>
          </div>
          <div className="space-y-1">
            {filterOptions.service.map(service => (
              <div key={service} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`service-${service}`}
                  checked={filters.service.includes(service as any)}
                  onChange={() => handleSingleFilterToggle('service', service)}
                  className="w-3 h-3 text-primary"
                />
                <label htmlFor={`service-${service}`} className="text-xs">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Channel Filter */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Channel</span>
          </div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {filterOptions.channel.map(channel => (
              <div key={channel} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`channel-${channel}`}
                  checked={filters.channel.includes(channel as any)}
                  onChange={() => handleSingleFilterToggle('channel', channel)}
                  className="w-3 h-3 text-primary"
                />
                <label htmlFor={`channel-${channel}`} className="text-xs capitalize">
                  {channel.replace('_', ' ')}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Source Filter */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Source</span>
          </div>
          <div className="space-y-1">
            {filterOptions.source.map(source => (
              <div key={source} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`source-${source}`}
                  checked={filters.source?.includes(source as any) || false}
                  onChange={() => handleSingleFilterToggle('source', source)}
                  className="w-3 h-3 text-primary"
                />
                <label htmlFor={`source-${source}`} className="text-xs capitalize">
                  {source}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Geography Filter */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Region</span>
          </div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {filterOptions.regions.map(region => (
              <div key={region} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`region-${region}`}
                  checked={filters.geography.region.includes(region)}
                  onChange={() => {
                    const newRegions = filters.geography.region.includes(region)
                      ? filters.geography.region.filter(r => r !== region)
                      : [...filters.geography.region, region];
                    handleFilterChange('geography', { ...filters.geography, region: newRegions });
                  }}
                  className="w-3 h-3 text-primary"
                />
                <label htmlFor={`region-${region}`} className="text-xs">
                  {region}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Date Range */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Period</span>
          </div>
          <div className="space-y-1">
            {['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'].map(period => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-6 px-2"
                onClick={() => {
                  // Handle date range selection
                  console.log('Selected period:', period);
                }}
              >
                {period}
              </Button>
            ))}
          </div>
        </Card>

        {/* Performance Filters */}
        <Card className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Performance</span>
          </div>
          <div className="space-y-1">
            {['High ROAS (>4x)', 'Low Cost/Lead', 'High Conv. Rate', 'Top Performers'].map(perf => (
              <Button
                key={perf}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-6 px-2"
                onClick={() => {
                  // Handle performance filter
                  console.log('Selected performance filter:', perf);
                }}
              >
                {perf}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card className="government-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-base">Detailed Filters</CardTitle>
            <CardDescription>
              Advanced filtering options for comprehensive analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Campaign Filter */}
            <div>
              <h4 className="font-medium mb-3">Campaigns</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filterOptions.campaign.map(campaign => (
                  <div key={campaign} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`campaign-${campaign}`}
                      checked={filters.campaign.includes(campaign)}
                      onChange={() => handleSingleFilterToggle('campaign', campaign)}
                      className="w-3 h-3 text-primary"
                    />
                    <label htmlFor={`campaign-${campaign}`} className="text-sm">
                      {campaign}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactic Filter */}
            <div>
              <h4 className="font-medium mb-3">Tactics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filterOptions.tactic.map(tactic => (
                  <div key={tactic} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`tactic-${tactic}`}
                      checked={filters.tactic.includes(tactic)}
                      onChange={() => handleSingleFilterToggle('tactic', tactic)}
                      className="w-3 h-3 text-primary"
                    />
                    <label htmlFor={`tactic-${tactic}`} className="text-sm">
                      {tactic}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* State Filter */}
            <div>
              <h4 className="font-medium mb-3">States</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {filterOptions.states.map(state => (
                  <div key={state} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`state-${state}`}
                      checked={filters.geography.state.includes(state)}
                      onChange={() => {
                        const newStates = filters.geography.state.includes(state)
                          ? filters.geography.state.filter(s => s !== state)
                          : [...filters.geography.state, state];
                        handleFilterChange('geography', { ...filters.geography, state: newStates });
                      }}
                      className="w-3 h-3 text-primary"
                    />
                    <label htmlFor={`state-${state}`} className="text-sm">
                      {state}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <Card className="government-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Active Filters ({activeFilterCount})</h4>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.service.map(service => (
                <Badge key={service} variant="secondary" className="text-xs">
                  Service: {service}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleSingleFilterToggle('service', service)}
                  />
                </Badge>
              ))}
              {filters.channel.map(channel => (
                <Badge key={channel} variant="secondary" className="text-xs">
                  Channel: {channel.replace('_', ' ')}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleSingleFilterToggle('channel', channel)}
                  />
                </Badge>
              ))}
              {filters.geography.region.map(region => (
                <Badge key={region} variant="secondary" className="text-xs">
                  Region: {region}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => {
                      const newRegions = filters.geography.region.filter(r => r !== region);
                      handleFilterChange('geography', { ...filters.geography, region: newRegions });
                    }}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedFilters;