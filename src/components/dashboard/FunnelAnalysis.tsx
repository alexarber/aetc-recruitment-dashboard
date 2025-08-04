import React from 'react';
import RecruitmentFunnel from '@/components/funnel/RecruitmentFunnel';

const FunnelAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Funnel Analysis</h1>
        <p className="text-muted-foreground">
          Deep-dive recruitment funnel performance and optimization insights
        </p>
      </div>

      <RecruitmentFunnel 
        variant="detailed" 
        showInsights={true}
        className="animate-fade-in"
      />
    </div>
  );
};

export default FunnelAnalysis;