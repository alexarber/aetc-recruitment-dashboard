import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingDown, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Lightbulb,
  Eye,
  EyeOff
} from 'lucide-react';
import { FunnelStage } from '@/types';
import { mockFunnelData } from '@/data/mockData';
import { cn, formatNumber, formatPercentage } from '@/lib/utils';

interface RecruitmentFunnelProps {
  data?: FunnelStage[];
  variant?: 'compact' | 'detailed' | 'interactive';
  showInsights?: boolean;
  className?: string;
}

const RecruitmentFunnel: React.FC<RecruitmentFunnelProps> = ({
  data = mockFunnelData,
  variant: _variant = 'interactive',
  showInsights = true,
  className
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showDropoffDetails, setShowDropoffDetails] = useState(false);

  const maxCount = Math.max(...data.map(stage => stage.count));

  const getStageColor = (conversionRate: number) => {
    if (conversionRate >= 80) return 'bg-green-500';
    if (conversionRate >= 60) return 'bg-blue-500';
    if (conversionRate >= 40) return 'bg-yellow-500';
    if (conversionRate >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };


  return (
    <div className={cn("space-y-6", className)}>
      {/* Funnel Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recruitment Funnel</h3>
          <p className="text-sm text-muted-foreground">
            End-to-end conversion tracking from awareness to enlistment
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDropoffDetails(!showDropoffDetails)}
          >
            {showDropoffDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showDropoffDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
      </div>

      {/* Funnel Visualization */}
      <Card className="government-card">
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-3">
            {data.map((stage, index) => {
              const widthPercentage = (stage.count / maxCount) * 100;
              const isSelected = selectedStage === stage.id;
              const isLastStage = index === data.length - 1;
              
              return (
                <div key={stage.id} className="space-y-2">
                  {/* Stage Bar */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "relative cursor-pointer transition-all duration-300 hover:scale-[1.02] flex-1",
                        isSelected && "ring-2 ring-primary ring-offset-2"
                      )}
                      onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                    >
                      {/* Background Bar */}
                      <div className="w-full h-12 bg-muted rounded-lg overflow-hidden">
                        {/* Filled Bar */}
                        <div
                          className={cn(
                            "h-full transition-all duration-700 ease-out flex items-center justify-between px-4",
                            getStageColor(stage.conversionRate),
                            "hover:brightness-110"
                          )}
                          style={{ 
                            width: `${widthPercentage}%`,
                            minWidth: '120px'
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-white" />
                            <span className="text-white font-medium text-sm truncate">
                              {stage.name}
                            </span>
                          </div>
                          <div className="text-white font-bold ml-4">
                            {formatNumber(stage.count)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stage Metrics - Now responsive */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge 
                        variant={stage.conversionRate >= 50 ? 'positive' : stage.conversionRate >= 25 ? 'neutral' : 'negative'}
                        className="text-xs whitespace-nowrap"
                      >
                        {formatPercentage(stage.conversionRate)} conv.
                      </Badge>
                      {stage.dropOffRate > 50 && (
                        <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Drop-off Arrow */}
                  {!isLastStage && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-xs">
                          {formatPercentage(stage.dropOffRate)} drop-off
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Expanded Stage Details */}
                  {isSelected && (
                    <Card className="mt-2 border-l-4 border-l-primary animate-fade-in">
                      <CardContent className="p-3 sm:p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Stage Metrics */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Performance Metrics</h4>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Count:</span>
                                <span className="font-medium">{formatNumber(stage.count)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Conversion Rate:</span>
                                <span className="font-medium">{formatPercentage(stage.conversionRate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Drop-off Rate:</span>
                                <span className="font-medium text-red-600">{formatPercentage(stage.dropOffRate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Avg. Time to Next:</span>
                                <span className="font-medium">{stage.averageTimeToNext} days</span>
                              </div>
                            </div>
                          </div>

                          {/* Drop-off Reasons */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Top Drop-off Reasons</h4>
                            <div className="space-y-1">
                              {stage.topDropOffReasons.slice(0, 3).map((reason, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                  <span className="text-xs text-muted-foreground">{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI Insights */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm flex items-center">
                              <Lightbulb className="h-3 w-3 mr-1" />
                              AI Recommendations
                            </h4>
                            <div className="space-y-1">
                              {stage.aiInsights.slice(0, 2).map((insight, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                  <span className="text-xs text-muted-foreground">{insight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Funnel Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="government-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Overall Conversion</p>
                <p className="text-2xl font-bold">
                  {formatPercentage((data[data.length - 1].count / data[0].count) * 100)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Biggest Drop-off</p>
                <p className="text-2xl font-bold">
                  {Math.max(...data.map(s => s.dropOffRate)).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Best Stage</p>
                <p className="text-2xl font-bold">
                  {Math.max(...data.map(s => s.conversionRate)).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="government-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Critical Stages</p>
                <p className="text-2xl font-bold">
                  {data.filter(s => s.dropOffRate > 60).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      {showInsights && (
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Lightbulb className="h-4 w-4 mr-2" />
              AI-Powered Optimization Insights
            </CardTitle>
            <CardDescription>
              Machine learning recommendations to improve funnel performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">High-Impact Optimizations</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Optimize Landing Pages</p>
                      <p className="text-xs text-green-600">Potential 15% improvement in consideration stage</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Implement Live Chat</p>
                      <p className="text-xs text-blue-600">Reduce intent stage drop-off by 8%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Predicted Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Additional Enlistments/Month</span>
                    <Badge variant="positive">+47</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Reduction</span>
                    <Badge variant="positive">-$127K</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROI Improvement</span>
                    <Badge variant="positive">+23%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecruitmentFunnel;