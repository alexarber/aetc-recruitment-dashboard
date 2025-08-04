import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { 
  Users, 
  Target, 
  BarChart3,
  Shield,
  Eye,
  Download,
  Filter,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface InstructionsDashboardProps {
  user?: User;
}

const InstructionsDashboard: React.FC<InstructionsDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Instructions</h1>
        <p className="text-muted-foreground">
          Complete guide to using the AETC Recruitment Analytics Dashboard
        </p>
        {user && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Current Role: {user.role.displayName}</Badge>
            <Badge variant="outline">
              {user.role.dataAccess.canViewFinancials ? 'Financial Access' : 'Basic Access'}
            </Badge>
          </div>
        )}
      </div>

      {/* Getting Started */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Getting Started
          </CardTitle>
          <CardDescription>
            Basic navigation and dashboard overview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Use the <strong>sidebar menu</strong> to switch between different dashboard views</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Click the <strong>Filter icon</strong> in the top header to access advanced filtering options</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your current role and permissions are shown in the sidebar user profile section</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Executive Dashboard */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Executive Dashboard
            </CardTitle>
            <CardDescription>
              Strategic overview with key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">What You'll Find:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>KPI Cards:</strong> Total leads, qualified leads, enlistments, and conversion rates</li>
                <li>• <strong>Interactive Funnel:</strong> Click on funnel stages to see detailed breakdown and AI insights</li>
                <li>• <strong>Monthly Trends:</strong> 6-month performance overview with lead and enlistment data</li>
                <li>• <strong>Channel Performance:</strong> Best performing recruitment channels by conversion rate</li>
                <li>• <strong>Geographic Analysis:</strong> Regional recruitment performance breakdown</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How to Use:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use filters to focus on specific services (USAF/USSF), channels, or regions</li>
                <li>• Click funnel stages to expand detailed analytics and recommendations</li>
                <li>• Export comprehensive reports using the "Export PDF" button</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Campaign Performance
            </CardTitle>
            <CardDescription>
              Detailed campaign analytics and ROI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">What You'll Find:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Campaign Cards:</strong> Individual campaign performance with budget, leads, and ROAS</li>
                <li>• <strong>Channel Breakdown:</strong> Performance analysis by recruitment channel</li>
                <li>• <strong>Top Performers:</strong> Best campaigns ranked by return on ad spend</li>
                <li>• <strong>Budget Utilization:</strong> Spending efficiency and cost per lead metrics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How to Use:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Switch between "Overview" and "Detailed" view modes using the top buttons</li>
                <li>• Click campaign cards to expand detailed metrics and AI recommendations</li>
                <li>• Use channel and campaign filters to focus on specific areas</li>
                <li>• Export campaign-specific reports for stakeholder review</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Analytics */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Advanced Analytics
            </CardTitle>
            <CardDescription>
              AI-powered insights and predictive modeling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">What You'll Find:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>AI Insights:</strong> Machine learning recommendations for optimization</li>
                <li>• <strong>Predictive Models:</strong> 6-month forecasting with confidence intervals</li>
                <li>• <strong>Geographic Analysis:</strong> Regional growth predictions and risk assessment</li>
                <li>• <strong>A/B Testing:</strong> Experiment results with statistical significance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How to Use:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use the tab buttons to switch between different analysis types</li>
                <li>• Click "Refresh AI Models" to simulate updated predictions</li>
                <li>• Review AI insights for actionable optimization recommendations</li>
                <li>• Monitor risk factors and seasonal trends for planning purposes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtering System */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Filtering
          </CardTitle>
          <CardDescription>
            How to use the filtering system across all dashboards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Quick Filters:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Service:</strong> Filter by Air Force (USAF) or Space Force (USSF)</li>
              <li>• <strong>Channel:</strong> Focus on specific recruitment channels (paid search, social media, etc.)</li>
              <li>• <strong>Geography:</strong> View performance by region or state</li>
              <li>• <strong>Source:</strong> Analyze organic vs. paid traffic performance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How Filtering Works:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Filters apply to <strong>all dashboard data</strong> in real-time</li>
              <li>• Active filters are shown as badges at the top of each dashboard</li>
              <li>• Click "Clear All" to remove all filters and see complete data</li>
              <li>• Use "Expand" to access detailed campaign and tactic filters</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* User Roles & Permissions */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            User Roles & Permissions
          </CardTitle>
          <CardDescription>
            Understanding different access levels and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Super User</h4>
                  <Badge variant="destructive" className="text-xs">Full Access</Badge>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• View all dashboards and data</li>
                  <li>• Access financial metrics and ROAS</li>
                  <li>• Export all report types</li>
                  <li>• View predictive analytics</li>
                  <li>• No approval required for exports</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Content Creator</h4>
                  <Badge variant="neutral" className="text-xs">Campaign Access</Badge>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• View executive and campaign dashboards</li>
                  <li>• Access financial metrics</li>
                  <li>• Export operational reports</li>
                  <li>• View predictive analytics</li>
                  <li>• Limited geographic scope</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">User</h4>
                  <Badge variant="secondary" className="text-xs">Limited Access</Badge>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• View basic dashboards only</li>
                  <li>• No financial metrics access</li>
                  <li>• Export requires approval</li>
                  <li>• No predictive analytics</li>
                  <li>• 365-day data retention limit</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Viewer</h4>
                  <Badge variant="outline" className="text-xs">Read Only</Badge>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• View dashboards only</li>
                  <li>• No financial metrics</li>
                  <li>• PDF export only (with approval)</li>
                  <li>• No predictive analytics</li>
                  <li>• 90-day data retention limit</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Exports */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            PDF Export System
          </CardTitle>
          <CardDescription>
            How to generate and use government-formatted reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">Available Reports:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Executive Summary:</strong> Strategic overview with KPIs and recommendations</li>
              <li>• <strong>Campaign Performance:</strong> Detailed campaign analysis and ROI breakdown</li>
              <li>• <strong>Custom Filtered:</strong> Reports based on your current filter selections</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Report Features:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• DoD-compliant formatting with classification banners</li>
              <li>• User information and generation timestamp</li>
              <li>• Applied filters summary for transparency</li>
              <li>• Air Force branding and government styling</li>
              <li>• Automatic filename with date stamp</li>
            </ul>
          </div>
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Permission Note:</p>
              <p className="text-yellow-700">Some roles require approval for certain export types. Reports include user identification for audit purposes.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips & Best Practices */}
      <Card className="government-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Tips & Best Practices
          </CardTitle>
          <CardDescription>
            Getting the most out of your dashboard experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Navigation Tips:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Start with Executive Dashboard for overview</li>
                <li>• Use Campaign Performance for detailed analysis</li>
                <li>• Check Advanced Analytics for future planning</li>
                <li>• Apply filters before generating reports</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Data Interpretation:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Green indicators show good performance</li>
                <li>• Red indicators need attention</li>
                <li>• Click elements for detailed breakdowns</li>
                <li>• Review AI insights for optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default InstructionsDashboard;