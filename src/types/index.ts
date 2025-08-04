// Core Data Types
export interface RecruitmentData {
  id: string;
  timestamp: Date;
  enterprise: string;
  service: 'USAF' | 'USSF';
  campaign: string;
  channel: 'paid_search' | 'social_media' | 'display' | 'organic' | 'direct' | 'email' | 'events';
  tactic: string;
  geography: {
    region: string;
    state: string;
    city: string;
    zipCode: string;
  };
  metrics: {
    impressions: number;
    reach: number;
    clicks: number;
    leads: number;
    applications: number;
    qualified: number;
    enlisted: number;
    cost: number;
    emailOpens?: number;
    emailClicks?: number;
    landingPageViews?: number;
    landingPageConversions?: number;
  };
}

// Funnel Stage Definition
export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  conversionRate: number;
  dropOffRate: number;
  averageTimeToNext: number; // days
  topDropOffReasons: string[];
  aiInsights: string[];
  previousStageId?: string;
}

// KPI Definitions
export interface KPIDefinition {
  id: string;
  name: string;
  category: 'awareness' | 'engagement' | 'conversion' | 'financial' | 'quality';
  calculation: (data: RecruitmentData[], filters: FilterDimensions) => number;
  format: 'percentage' | 'currency' | 'number' | 'ratio';
  target?: number;
  description: string;
  dependencies?: string[];
}

export interface KPIValue {
  id: string;
  value: number;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: number[]; // Historical values for sparkline
}

// Filtering System
export interface FilterDimensions {
  enterprise: string[];
  service: ('USAF' | 'USSF')[];
  campaign: string[];
  channel: ('paid_search' | 'social_media' | 'display' | 'organic' | 'direct' | 'email' | 'events')[];
  tactic: string[];
  geography: {
    region: string[];
    state: string[];
    city: string[];
  };
  dateRange: {
    start: Date;
    end: Date;
  };
  source: ('organic' | 'paid' | 'direct' | 'referral' | 'email' | 'events')[];
  performanceFilters?: {
    minConversionRate?: number;
    minROAS?: number;
    maxCostPerLead?: number;
  };
}

// User Management & Permissions
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin: Date;
  isActive: boolean;
}

export interface UserRole {
  id: string;
  name: 'super_user' | 'content_creator' | 'user';
  displayName: string;
  description: string;
  permissions: Permission[];
  dataAccess: DataAccessLevel;
  reportAccess: ReportAccessLevel;
  exportPermissions: ExportPermissions;
}

export interface Permission {
  resource: 'dashboard' | 'analytics' | 'reports' | 'admin' | 'ai_insights';
  actions: ('read' | 'write' | 'delete' | 'export' | 'share')[];
  conditions?: {
    timeRange?: string;
    dataLevel?: 'summary' | 'detailed' | 'raw';
    geographic?: string[];
    campaigns?: string[];
  };
}

export interface DataAccessLevel {
  level: 'super_user' | 'content_creator' | 'user';
  canViewPII: boolean;
  canViewFinancials: boolean;
  canViewPredictive: boolean;
  dataRetention: number; // days
  geographicScope: string[];
}

// Export & Reporting
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'operational' | 'tactical' | 'custom';
  layout: 'portrait' | 'landscape';
  maxPages: number;
  sections: ReportSection[];
  styling: ReportStyling;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'kpi_grid' | 'chart' | 'table' | 'funnel' | 'text' | 'insights';
  data: any;
  position: { x: number; y: number; width: number; height: number };
  styling?: ComponentStyling;
}

export interface ExportConfiguration {
  template: ReportTemplate;
  format: 'pdf' | 'excel' | 'pptx' | 'csv' | 'json';
  classification: 'unclassified' | 'cui' | 'secret';
  watermark: WatermarkConfig;
  filters: FilterDimensions;
  timeRange: DateRange;
  branding: BrandingConfig;
}

export interface ExportPermissions {
  formats: ('pdf' | 'excel' | 'pptx' | 'csv' | 'json')[];
  dataClassification: ('unclassified' | 'cui' | 'secret')[];
  approvalRequired: boolean;
  watermarking: boolean;
  maxFileSize?: string;
}

export interface ReportAccessLevel {
  templates: string[];
  customReports: boolean;
  scheduledReports: boolean;
  shareReports: boolean;
}

// AI/ML Types
export interface PredictiveModel {
  id: string;
  name: string;
  type: 'forecasting' | 'anomaly_detection' | 'optimization' | 'classification';
  accuracy: number;
  lastTrained: Date;
  version: string;
  features: string[];
}

export interface Prediction {
  id: string;
  modelId: string;
  timestamp: Date;
  prediction: number | string | boolean;
  confidence: number;
  explanation?: string;
  metadata?: Record<string, any>;
}

export interface AnomalyDetection {
  id: string;
  timestamp: Date;
  metric: string;
  value: number;
  expectedValue: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendations: string[];
}

// Chart & Visualization Types
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'funnel' | 'sankey';
  title: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  responsive: boolean;
  interactive: boolean;
  exportable: boolean;
}

// Utility Types
export interface DateRange {
  start: Date;
  end: Date;
  label?: string;
}

export interface WatermarkConfig {
  enabled: boolean;
  text: string;
  position: 'center' | 'bottom-right' | 'bottom-center';
  opacity: number;
}

export interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  classification: string;
}

export interface ComponentStyling {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
}

export interface ReportStyling {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: {
    title: number;
    heading: number;
    body: number;
    caption: number;
  };
  spacing: {
    section: number;
    paragraph: number;
    line: number;
  };
  branding: BrandingConfig;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Dashboard State Types
export interface DashboardState {
  filters: FilterDimensions;
  selectedKPIs: string[];
  dateRange: DateRange;
  refreshInterval: number;
  user: User;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  defaultView: 'executive' | 'campaign' | 'funnel' | 'custom';
  defaultDateRange: string;
  favoriteKPIs: string[];
  notifications: {
    email: boolean;
    inApp: boolean;
    frequency: 'realtime' | 'daily' | 'weekly';
  };
}