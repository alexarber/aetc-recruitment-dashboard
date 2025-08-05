import { RecruitmentData, FunnelStage, User, UserRole } from '@/types';

// Mock Recruitment Data
export const mockRecruitmentData: RecruitmentData[] = [
  // Paid Search - High Performance
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `paid-search-${i}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    enterprise: 'AETC',
    service: Math.random() > 0.7 ? 'USSF' : 'USAF' as 'USAF' | 'USSF',
    campaign: `Search Campaign ${Math.floor(i / 10) + 1}`,
    channel: 'paid_search' as const,
    tactic: ['Generic Keywords', 'Branded Keywords', 'Competitor Keywords'][Math.floor(Math.random() * 3)],
    geography: {
      region: ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'West'][Math.floor(Math.random() * 5)],
      state: ['TX', 'CA', 'FL', 'NY', 'GA', 'NC', 'OH', 'PA'][Math.floor(Math.random() * 8)],
      city: ['Houston', 'Los Angeles', 'Miami', 'New York', 'Atlanta'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    metrics: {
      impressions: Math.floor(Math.random() * 10000) + 5000,
      reach: Math.floor(Math.random() * 8000) + 3000,
      clicks: Math.floor(Math.random() * 500) + 100,
      leads: Math.floor(Math.random() * 50) + 10,
      applications: Math.floor(Math.random() * 20) + 2,
      qualified: Math.floor(Math.random() * 15) + 1,
      enlisted: Math.floor(Math.random() * 8) + 1,
      cost: Math.floor(Math.random() * 5000) + 1000,
      landingPageViews: Math.floor(Math.random() * 400) + 80,
      landingPageConversions: Math.floor(Math.random() * 30) + 5
    }
  })),

  // Social Media - Medium Performance
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `social-${i}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    enterprise: 'AETC',
    service: Math.random() > 0.6 ? 'USSF' : 'USAF' as 'USAF' | 'USSF',
    campaign: `Social Campaign ${Math.floor(i / 8) + 1}`,
    channel: 'social_media' as const,
    tactic: ['Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads'][Math.floor(Math.random() * 4)],
    geography: {
      region: ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'West'][Math.floor(Math.random() * 5)],
      state: ['TX', 'CA', 'FL', 'NY', 'GA', 'NC', 'OH', 'PA'][Math.floor(Math.random() * 8)],
      city: ['Houston', 'Los Angeles', 'Miami', 'New York', 'Atlanta'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    metrics: {
      impressions: Math.floor(Math.random() * 25000) + 10000,
      reach: Math.floor(Math.random() * 15000) + 5000,
      clicks: Math.floor(Math.random() * 300) + 50,
      leads: Math.floor(Math.random() * 30) + 5,
      applications: Math.floor(Math.random() * 12) + 1,
      qualified: Math.floor(Math.random() * 8) + 1,
      enlisted: Math.floor(Math.random() * 5) + 1,
      cost: Math.floor(Math.random() * 3000) + 500,
      landingPageViews: Math.floor(Math.random() * 250) + 40,
      landingPageConversions: Math.floor(Math.random() * 20) + 3
    }
  })),

  // Email Marketing
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `email-${i}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    enterprise: 'AETC',
    service: Math.random() > 0.5 ? 'USSF' : 'USAF' as 'USAF' | 'USSF',
    campaign: `Email Campaign ${Math.floor(i / 4) + 1}`,
    channel: 'email' as const,
    tactic: ['Newsletter', 'Recruitment Series', 'Event Invitation', 'Follow-up'][Math.floor(Math.random() * 4)],
    geography: {
      region: ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'West'][Math.floor(Math.random() * 5)],
      state: ['TX', 'CA', 'FL', 'NY', 'GA', 'NC', 'OH', 'PA'][Math.floor(Math.random() * 8)],
      city: ['Houston', 'Los Angeles', 'Miami', 'New York', 'Atlanta'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    metrics: {
      impressions: Math.floor(Math.random() * 5000) + 1000,
      reach: Math.floor(Math.random() * 4000) + 800,
      clicks: Math.floor(Math.random() * 200) + 20,
      leads: Math.floor(Math.random() * 25) + 3,
      applications: Math.floor(Math.random() * 10) + 1,
      qualified: Math.floor(Math.random() * 6) + 1,
      enlisted: Math.floor(Math.random() * 4) + 1,
      cost: Math.floor(Math.random() * 800) + 200,
      emailOpens: Math.floor(Math.random() * 1500) + 300,
      emailClicks: Math.floor(Math.random() * 150) + 20,
      landingPageViews: Math.floor(Math.random() * 120) + 15,
      landingPageConversions: Math.floor(Math.random() * 15) + 2
    }
  })),

  // Organic Traffic
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `organic-${i}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    enterprise: 'AETC',
    service: Math.random() > 0.5 ? 'USSF' : 'USAF' as 'USAF' | 'USSF',
    campaign: 'Organic Traffic',
    channel: 'organic' as const,
    tactic: ['SEO', 'Content Marketing', 'Blog Posts'][Math.floor(Math.random() * 3)],
    geography: {
      region: ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'West'][Math.floor(Math.random() * 5)],
      state: ['TX', 'CA', 'FL', 'NY', 'GA', 'NC', 'OH', 'PA'][Math.floor(Math.random() * 8)],
      city: ['Houston', 'Los Angeles', 'Miami', 'New York', 'Atlanta'][Math.floor(Math.random() * 5)],
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`
    },
    metrics: {
      impressions: Math.floor(Math.random() * 15000) + 5000,
      reach: Math.floor(Math.random() * 10000) + 3000,
      clicks: Math.floor(Math.random() * 400) + 80,
      leads: Math.floor(Math.random() * 35) + 8,
      applications: Math.floor(Math.random() * 15) + 3,
      qualified: Math.floor(Math.random() * 10) + 2,
      enlisted: Math.floor(Math.random() * 6) + 1,
      cost: 0, // Organic has no direct cost
      landingPageViews: Math.floor(Math.random() * 320) + 60,
      landingPageConversions: Math.floor(Math.random() * 25) + 5
    }
  }))
];

// Mock Funnel Data
export const mockFunnelData: FunnelStage[] = [
  {
    id: 'awareness',
    name: 'Awareness (Impressions)',
    count: 1000000,
    conversionRate: 15.0,
    dropOffRate: 85.0,
    averageTimeToNext: 0,
    topDropOffReasons: ['Low interest in military', 'Wrong demographic targeting', 'Ad fatigue'],
    aiInsights: ['Increase video content for 18-24 age group', 'Test military lifestyle messaging', 'Optimize for mobile viewing']
  },
  {
    id: 'interest',
    name: 'Interest (Clicks)',
    count: 150000,
    conversionRate: 30.0,
    dropOffRate: 70.0,
    averageTimeToNext: 1,
    topDropOffReasons: ['Landing page mismatch', 'Slow page load time', 'Poor mobile experience'],
    aiInsights: ['A/B test landing page headlines', 'Reduce page load time by 40%', 'Add mobile-optimized forms'],
    previousStageId: 'awareness'
  },
  {
    id: 'consideration',
    name: 'Consideration (Landing Page)',
    count: 45000,
    conversionRate: 33.3,
    dropOffRate: 66.7,
    averageTimeToNext: 3,
    topDropOffReasons: ['Information overload', 'Unclear call-to-action', 'Missing veteran testimonials'],
    aiInsights: ['Add success stories from recent graduates', 'Simplify form to 3 fields only', 'Include benefits calculator'],
    previousStageId: 'interest'
  },
  {
    id: 'intent',
    name: 'Intent (Lead Capture)',
    count: 15000,
    conversionRate: 53.3,
    dropOffRate: 46.7,
    averageTimeToNext: 7,
    topDropOffReasons: ['Privacy concerns about personal data', 'Too many form fields required', 'No immediate follow-up'],
    aiInsights: ['Implement live chat support', 'Send immediate confirmation email', 'Reduce form to name and email only'],
    previousStageId: 'consideration'
  },
  {
    id: 'application',
    name: 'Application Started',
    count: 8000,
    conversionRate: 50.0,
    dropOffRate: 50.0,
    averageTimeToNext: 14,
    topDropOffReasons: ['Complex application process', 'Required document gathering', 'Changed mind about military'],
    aiInsights: ['Break application into 5 smaller steps', 'Add progress indicators', 'Provide document checklist upfront'],
    previousStageId: 'intent'
  },
  {
    id: 'completed',
    name: 'Application Completed',
    count: 4000,
    conversionRate: 80.0,
    dropOffRate: 20.0,
    averageTimeToNext: 21,
    topDropOffReasons: ['Background check concerns', 'Medical qualification issues', 'Family pressure against military'],
    aiInsights: ['Improve pre-qualification screening', 'Add family support resources', 'Provide clear timeline expectations'],
    previousStageId: 'application'
  },
  {
    id: 'qualified',
    name: 'Qualified/MEPS Scheduled',
    count: 3200,
    conversionRate: 87.5,
    dropOffRate: 12.5,
    averageTimeToNext: 30,
    topDropOffReasons: ['MEPS scheduling conflicts', 'Pre-enlistment anxiety', 'Competing job offers'],
    aiInsights: ['Offer flexible MEPS scheduling', 'Implement peer mentor program', 'Provide pre-MEPS preparation materials'],
    previousStageId: 'completed'
  },
  {
    id: 'enlisted',
    name: 'Successfully Enlisted',
    count: 2800,
    conversionRate: 100,
    dropOffRate: 0,
    averageTimeToNext: 0,
    topDropOffReasons: [],
    aiInsights: ['Track long-term retention metrics', 'Survey for satisfaction feedback', 'Identify referral opportunities'],
    previousStageId: 'qualified'
  }
];

// Mock User Roles
export const mockUserRoles: UserRole[] = [
  {
    id: 'super_user',
    name: 'super_user',
    displayName: 'Super User',
    description: 'Full administrative access and control',
    permissions: [
      {
        resource: 'dashboard',
        actions: ['read', 'export', 'share'],
        conditions: { dataLevel: 'summary' }
      },
      {
        resource: 'reports',
        actions: ['read', 'export'],
        conditions: { timeRange: 'unlimited' }
      }
    ],
    dataAccess: {
      level: 'super_user',
      canViewPII: true,
      canViewFinancials: true,
      canViewPredictive: true,
      dataRetention: 1095,
      geographicScope: ['all']
    },
    reportAccess: {
      templates: ['executive_summary', 'strategic_overview', 'roi_analysis'],
      customReports: true,
      scheduledReports: true,
      shareReports: true
    },
    exportPermissions: {
      formats: ['pdf', 'pptx', 'excel'],
      dataClassification: ['unclassified', 'cui'],
      approvalRequired: false,
      watermarking: true
    }
  },
  {
    id: 'content_creator',
    name: 'content_creator',
    displayName: 'Content Creator',
    description: 'Content creators and campaign managers',
    permissions: [
      {
        resource: 'dashboard',
        actions: ['read', 'write', 'export'],
        conditions: { dataLevel: 'detailed' }
      },
      {
        resource: 'analytics',
        actions: ['read', 'write'],
        conditions: { timeRange: 'last_365_days' }
      }
    ],
    dataAccess: {
      level: 'content_creator',
      canViewPII: false,
      canViewFinancials: true,
      canViewPredictive: true,
      dataRetention: 730,
      geographicScope: ['assigned_regions']
    },
    reportAccess: {
      templates: ['campaign_performance', 'funnel_analysis', 'roi_breakdown'],
      customReports: true,
      scheduledReports: true,
      shareReports: true
    },
    exportPermissions: {
      formats: ['pdf', 'excel', 'csv'],
      dataClassification: ['unclassified'],
      approvalRequired: false,
      watermarking: true
    }
  },
  {
    id: 'user',
    name: 'user',
    displayName: 'User',
    description: 'Standard user with limited access',
    permissions: [
      {
        resource: 'dashboard',
        actions: ['read', 'write', 'export'],
        conditions: { dataLevel: 'raw' }
      },
      {
        resource: 'analytics',
        actions: ['read', 'write'],
        conditions: { timeRange: 'unlimited' }
      },
      {
        resource: 'ai_insights',
        actions: ['read', 'write']
      }
    ],
    dataAccess: {
      level: 'user',
      canViewPII: false,
      canViewFinancials: false,
      canViewPredictive: false,
      dataRetention: 365,
      geographicScope: ['assigned_regions']
    },
    reportAccess: {
      templates: ['all'],
      customReports: true,
      scheduledReports: true,
      shareReports: true
    },
    exportPermissions: {
      formats: ['pdf', 'csv'],
      dataClassification: ['unclassified'],
      approvalRequired: true,
      watermarking: true
    }
  },
  {
    id: 'viewer',
    name: 'user',
    displayName: 'Viewer',
    description: 'Read-only access for basic users',
    permissions: [
      {
        resource: 'dashboard',
        actions: ['read'],
        conditions: { dataLevel: 'summary', timeRange: 'last_90_days' }
      }
    ],
    dataAccess: {
      level: 'user',
      canViewPII: false,
      canViewFinancials: false,
      canViewPredictive: false,
      dataRetention: 90,
      geographicScope: ['assigned_regions']
    },
    reportAccess: {
      templates: ['summary_report'],
      customReports: false,
      scheduledReports: false,
      shareReports: false
    },
    exportPermissions: {
      formats: ['pdf'],
      dataClassification: ['unclassified'],
      approvalRequired: false,
      watermarking: true
    }
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'super-001',
    email: 'admin@aetc.mil',
    name: 'General Sarah Mitchell',
    role: mockUserRoles[0],
    permissions: mockUserRoles[0].permissions,
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isActive: true
  },
  {
    id: 'creator-001',
    email: 'creator@aetc.mil',
    name: 'Colonel Michael Rodriguez',
    role: mockUserRoles[1],
    permissions: mockUserRoles[1].permissions,
    lastLogin: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isActive: true
  },
  {
    id: 'user-001',
    email: 'user@aetc.mil',
    name: 'Dr. Emily Chen',
    role: mockUserRoles[2],
    permissions: mockUserRoles[2].permissions,
    lastLogin: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isActive: true
  },
  {
    id: 'viewer-001',
    email: 'viewer@aetc.mil',
    name: 'Captain James Wilson',
    role: mockUserRoles[3],
    permissions: mockUserRoles[3].permissions,
    lastLogin: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isActive: true
  }
];

// Mock KPI Calculations
export const calculateKPIs = (data: RecruitmentData[]) => {
  const totalImpressions = data.reduce((sum, item) => sum + item.metrics.impressions, 0);
  const totalClicks = data.reduce((sum, item) => sum + item.metrics.clicks, 0);
  const totalLeads = data.reduce((sum, item) => sum + item.metrics.leads, 0);
  const totalEnlisted = data.reduce((sum, item) => sum + item.metrics.enlisted, 0);
  const totalCost = data.reduce((sum, item) => sum + item.metrics.cost, 0);
  const totalLandingPageViews = data.reduce((sum, item) => sum + (item.metrics.landingPageViews || 0), 0);
  const totalLandingPageConversions = data.reduce((sum, item) => sum + (item.metrics.landingPageConversions || 0), 0);
  const totalEmailOpens = data.reduce((sum, item) => sum + (item.metrics.emailOpens || 0), 0);
  const totalEmailClicks = data.reduce((sum, item) => sum + (item.metrics.emailClicks || 0), 0);

  return {
    totalImpressions,
    totalClicks,
    totalLeads,
    totalEnlisted,
    totalCost,
    clickThroughRate: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    conversionRate: totalClicks > 0 ? (totalLeads / totalClicks) * 100 : 0,
    costPerClick: totalClicks > 0 ? totalCost / totalClicks : 0,
    costPerLead: totalLeads > 0 ? totalCost / totalLeads : 0,
    costPerEnlistment: totalEnlisted > 0 ? totalCost / totalEnlisted : 0,
    returnOnAdSpend: totalCost > 0 ? (totalEnlisted * 50000) / totalCost : 0, // Assuming $50k value per enlistment
    landingPageConversionRate: totalLandingPageViews > 0 ? (totalLandingPageConversions / totalLandingPageViews) * 100 : 0,
    emailOpenRate: data.filter(d => d.channel === 'email').length > 0 ? (totalEmailOpens / data.filter(d => d.channel === 'email').reduce((sum, item) => sum + item.metrics.impressions, 0)) * 100 : 0,
    emailClickRate: totalEmailOpens > 0 ? (totalEmailClicks / totalEmailOpens) * 100 : 0
  };
};