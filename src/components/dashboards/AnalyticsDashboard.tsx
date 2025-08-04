import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterDimensions, User } from '@/types';
import { 
  BarChart3, 
  TrendingUp, 
  Brain,
  MapPin,
  Users, 
  Target,
  Calendar,
  AlertTriangle,
  Eye,
  RefreshCw,
  Lightbulb,
  Loader2
} from 'lucide-react';

interface AnalyticsDashboardProps {
  filters: FilterDimensions;
  user?: User;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<'predictive' | 'geographic' | 'cohort'>('predictive');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock predictive data
  const predictiveData = {
    nextMonthForecast: {
      leads: 5847,
      enlistments: 421,
      confidence: 87.3,
      trend: 'increasing'
    },
    seasonalTrends: [
      { month: 'Apr', predicted: 5847, actual: null, confidence: 87 },
      { month: 'May', predicted: 6123, actual: null, confidence: 84 },
      { month: 'Jun', predicted: 5234, actual: null, confidence: 82 },
      { month: 'Jul', predicted: 4876, actual: null, confidence: 79 },
      { month: 'Aug', predicted: 6456, actual: null, confidence: 85 },
      { month: 'Sep', predicted: 6789, actual: null, confidence: 88 }
    ],
    riskFactors: [
      { factor: 'Budget allocation shift', impact: 'High', probability: 72 },
      { factor: 'Seasonal decline in summer', impact: 'Medium', probability: 89 },
      { factor: 'Competitor campaign launch', impact: 'Medium', probability: 45 }
    ]
  };

  // Mock geographic performance data
  const geographicData = [
    { region: 'Southeast', current: 1089, predicted: 1245, growth: 14.3, risk: 'low' },
    { region: 'Southwest', current: 831, predicted: 892, growth: 7.3, risk: 'medium' },
    { region: 'Midwest', current: 647, predicted: 734, growth: 13.4, risk: 'low' },
    { region: 'West', current: 456, predicted: 423, growth: -7.2, risk: 'high' },
    { region: 'Northeast', current: 224, predicted: 267, growth: 19.2, risk: 'low' }
  ];

  // Mock A/B testing results
  const abTestResults = [
    {
      test: 'Landing Page Redesign',
      variant: 'Version B',
      improvement: 23.4,
      significance: 98.7,
      status: 'winner'
    },
    {
      test: 'Email Subject Lines',
      variant: 'Personalized',
      improvement: 15.8,
      significance: 94.2,
      status: 'winner'
    },
    {
      test: 'Social Media Creative',
      variant: 'Video Format',
      improvement: -3.2,
      significance: 67.4,
      status: 'inconclusive'
    }
  ];

  // Mock AI insights
  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Optimal Budget Reallocation',
      description: 'Machine learning models suggest reallocating 15% of display budget to paid search could increase overall ROAS by 28%.',
      confidence: 91.2,
      impact: 'high'
    },
    {
      type: 'prediction',
      title: 'Seasonal Performance Forecast',
      description: 'Historical patterns indicate 23% increase in conversion rates during Q4, recommend preparing campaign scaling strategy.',
      confidence: 87.6,
      impact: 'medium'
    },
    {
      type: 'alert',
      title: 'Geographic Performance Anomaly',
      description: 'West region showing unusual 12% decline in lead quality. Recommend immediate campaign review and audience adjustment.',
      confidence: 94.8,
      impact: 'high'
    }
  ];

  const handleRefreshAnalytics = async () => {
    setIsRefreshing(true);
    // Simulate AI model refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            AI-powered insights and predictive analytics for recruitment optimization
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRefreshAnalytics}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh AI Models'}</span>
          </Button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <Card className="government-card border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Machine learning analysis of recruitment data with actionable recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getImpactColor(insight.impact)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {insight.type === 'opportunity' && <TrendingUp className="h-4 w-4" />}
                    {insight.type === 'prediction' && <Eye className="h-4 w-4" />}
                    {insight.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm mb-2">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'neutral' : 'positive'} className="text-xs capitalize">
                    {insight.impact} Impact
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Selector */}
      <div className="flex items-center space-x-2 border-b">
        <Button
          variant={selectedAnalysis === 'predictive' ? 'default' : 'ghost'}
          onClick={() => setSelectedAnalysis('predictive')}
          className="flex items-center space-x-2"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Predictive Models</span>
        </Button>
        <Button
          variant={selectedAnalysis === 'geographic' ? 'default' : 'ghost'}
          onClick={() => setSelectedAnalysis('geographic')}
          className="flex items-center space-x-2"
        >
          <MapPin className="h-4 w-4" />
          <span>Geographic Analysis</span>
        </Button>
        <Button
          variant={selectedAnalysis === 'cohort' ? 'default' : 'ghost'}
          onClick={() => setSelectedAnalysis('cohort')}
          className="flex items-center space-x-2"
        >
          <Users className="h-4 w-4" />
          <span>A/B Testing</span>
        </Button>
      </div>

      {/* Predictive Analytics */}
      {selectedAnalysis === 'predictive' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecast Summary */}
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Next Month Forecast
              </CardTitle>
              <CardDescription>
                AI-powered predictions based on historical data and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">
                      {predictiveData.nextMonthForecast.leads.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Predicted Leads</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">
                      {predictiveData.nextMonthForecast.enlistments}
                    </p>
                    <p className="text-sm text-muted-foreground">Predicted Enlistments</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Model Confidence</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-white/20 rounded-full">
                      <div 
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: `${predictiveData.nextMonthForecast.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {predictiveData.nextMonthForecast.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Risk Analysis
              </CardTitle>
              <CardDescription>
                Potential factors that could impact forecast accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {predictiveData.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{risk.factor}</p>
                      <p className="text-xs text-muted-foreground">{risk.impact} Impact</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{risk.probability}%</p>
                      <p className="text-xs text-muted-foreground">Probability</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 6-Month Trend Forecast */}
          <Card className="government-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                6-Month Prediction Trend
              </CardTitle>
              <CardDescription>
                Forecasted performance with confidence intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveData.seasonalTrends.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-center">
                        <p className="font-medium">{month.month}</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Predicted Leads</p>
                          <p className="font-semibold">{month.predicted.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="font-semibold">{month.confidence}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full"
                        style={{ width: `${month.confidence}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Geographic Analysis */}
      {selectedAnalysis === 'geographic' && (
        <div className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Regional Performance Predictions
              </CardTitle>
              <CardDescription>
                Geographic analysis with growth forecasts and risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {geographicData.map((region) => (
                  <div key={region.region} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{region.region}</h3>
                      <div className={`w-3 h-3 rounded-full ${getRiskColor(region.risk)}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <span className="font-medium">{region.current}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Predicted</span>
                        <span className="font-medium">{region.predicted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Growth</span>
                        <span className={`font-medium ${region.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {region.growth >= 0 ? '+' : ''}{region.growth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle className="text-base">Top Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData
                    .filter(r => r.growth > 10)
                    .sort((a, b) => b.growth - a.growth)
                    .map(region => (
                      <div key={region.region} className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded">
                        <span className="font-medium text-foreground">{region.region}</span>
                        <Badge variant="positive">+{region.growth.toFixed(1)}%</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="government-card">
              <CardHeader>
                <CardTitle className="text-base">Risk Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData
                    .filter(r => r.risk === 'high' || r.growth < 0)
                    .map(region => (
                      <div key={region.region} className="flex items-center justify-between p-2 bg-red-500/10 border border-red-500/20 rounded">
                        <span className="font-medium text-foreground">{region.region}</span>
                        <Badge variant="destructive">
                          {region.growth < 0 ? `${region.growth.toFixed(1)}%` : 'High Risk'}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* A/B Testing Results */}
      {selectedAnalysis === 'cohort' && (
        <div className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                A/B Testing Results
              </CardTitle>
              <CardDescription>
                Current and completed experiments with statistical significance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {abTestResults.map((test, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{test.test}</h3>
                      <Badge 
                        variant={test.status === 'winner' ? 'positive' : 'neutral'}
                        className="capitalize"
                      >
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Winning Variant</p>
                        <p className="font-medium">{test.variant}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Improvement</p>
                        <p className={`font-medium ${test.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {test.improvement >= 0 ? '+' : ''}{test.improvement}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Significance</p>
                        <p className="font-medium">{test.significance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testing Recommendations */}
          <Card className="government-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Recommended Tests
              </CardTitle>
              <CardDescription>
                AI-suggested experiments for optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { test: 'Mobile-optimized funnel', impact: 'High', effort: 'Medium' },
                  { test: 'Personalized messaging', impact: 'Medium', effort: 'Low' },
                  { test: 'Video testimonials', impact: 'Medium', effort: 'High' },
                  { test: 'Simplified application form', impact: 'High', effort: 'Low' }
                ].map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{rec.test}</p>
                      <p className="text-sm text-muted-foreground">
                        Impact: {rec.impact} • Effort: {rec.effort}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Start Test
                    </Button>
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

export default AnalyticsDashboard;