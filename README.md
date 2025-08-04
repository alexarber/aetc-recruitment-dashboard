# AETC Recruitment Analytics Dashboard

[![CI/CD Pipeline](https://github.com/your-username/aetc-recruitment-dashboard/workflows/CI/badge.svg)](https://github.com/your-username/aetc-recruitment-dashboard/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14-blue.svg)](https://mui.com/)

## 🎯 Overview

Enterprise-grade analytics dashboard for Air Education and Training Command (AETC) recruitment optimization with AI-powered insights and comprehensive funnel analysis. Built for government stakeholders requiring professional, secure, and actionable recruitment intelligence.

## 🚀 Key Features

### 📊 **Advanced Analytics Dashboard**
- **Real-time KPI Monitoring**: Track conversion rates, ROAS, cost-per-enlistment, and funnel performance
- **Multi-Channel Attribution**: Analyze performance across paid search, social media, display ads, organic, and direct channels
- **Geographic Intelligence**: Regional performance mapping with demographic insights
- **Predictive Analytics**: AI-powered forecasting and trend analysis

### 🔍 **Interactive Funnel Analysis** 
- **Visual Conversion Tracking**: Streamlined funnel visualization from awareness to enlistment
- **Drop-off Analysis**: Identify bottlenecks and optimization opportunities at each stage
- **Comparative Performance**: Side-by-side channel and campaign analysis
- **Real-time Insights**: AI-generated recommendations for funnel optimization

### 🛡️ **Enterprise Security & Compliance**
- **Role-Based Access Control**: Executive, Manager, Analyst, and Viewer permission levels
- **DoD IL4 Ready Architecture**: Designed for government security requirements
- **Audit Logging**: Comprehensive activity tracking for compliance
- **Data Classification**: Automated handling of sensitive recruitment data

### 📋 **Professional Reporting**
- **Executive Summaries**: One-page strategic overviews for leadership
- **Campaign Analysis**: Detailed performance reports with actionable insights
- **PDF Export**: Government-branded reports with classification markings
- **Scheduled Reports**: Automated delivery of key metrics

### 🤖 **AI-Powered Intelligence**
- **Predictive Modeling**: 30/60/90-day recruitment forecasting
- **Anomaly Detection**: Automatic identification of performance outliers
- **Optimization Recommendations**: Data-driven suggestions for campaign improvement
- **A/B Testing Analysis**: Statistical significance testing for campaign variants

## 🛠 Technology Stack

### **Frontend Architecture**
- **React 18** + **TypeScript** for type-safe, modern UI development
- **Material-UI v5** for professional, government-appropriate interface design
- **Recharts** + **D3.js** for advanced data visualizations
- **Zustand** for efficient state management

### **AI/ML Capabilities**
- **TensorFlow.js** for client-side machine learning
- **Time Series Forecasting** with ARIMA and Prophet models
- **Statistical Analysis** for A/B testing and significance testing
- **Anomaly Detection** using isolation forest algorithms

### **Export & Integration**
- **jsPDF** + **html2canvas** for professional PDF generation
- **RESTful APIs** for data integration
- **CSV/Excel Export** for data analysis
- **Webhook Support** for real-time notifications

### **DevOps & Deployment**
- **Vite** for fast development and optimized builds
- **ESLint** + **Prettier** for code quality
- **Jest** + **React Testing Library** for comprehensive testing
- **GitHub Actions** for CI/CD automation

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/aetc-recruitment-dashboard.git
cd aetc-recruitment-dashboard

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

### Demo Credentials
- **Executive**: `admin@aetc.mil` / `executive123`
- **Campaign Manager**: `manager@aetc.mil` / `manager123`
- **Data Analyst**: `analyst@aetc.mil` / `analyst123`
- **Viewer**: `viewer@aetc.mil` / `viewer123`

## 🚢 Deployment

### MVP Deployment (Railway/Vercel)
```bash
# Deploy to Railway
railway login
railway link
railway deploy

# Deploy to Vercel
vercel login
vercel --prod
```

### Production Deployment (DoD Compliance)
- **AWS GovCloud** or **Azure Government** for IL4 certification
- **Container orchestration** with Kubernetes
- **Load balancing** and auto-scaling capabilities
- **Continuous monitoring** and security scanning

## 📁 Project Structure

```
aetc-recruitment-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard layout and cards
│   │   ├── funnel/         # Funnel visualization components  
│   │   ├── filters/        # Multi-dimensional filtering
│   │   └── reports/        # Export and reporting
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and data services
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   └── data/               # Mock data for demonstration
├── docs/                   # Technical documentation
├── tests/                  # Test suites
└── .github/                # CI/CD workflows
```

## 🔐 Security & Compliance

### Government Standards
- **FISMA Compliance**: Security controls for federal information systems
- **DoD IL4 Ready**: Architecture designed for Impact Level 4 certification
- **NIST Framework**: Cybersecurity framework implementation
- **Privacy Controls**: PII handling and data retention policies

### Security Features
- **Zero Trust Architecture**: Verify every request and user
- **Encrypted Communications**: TLS 1.3 for all data transmission
- **Role-Based Access**: Granular permissions and data access controls
- **Audit Trails**: Comprehensive logging for compliance and forensics

## 📊 Performance Metrics

### Key Performance Indicators
- **Dashboard Load Time**: < 2 seconds
- **API Response Time**: < 200ms average
- **Export Generation**: < 5 seconds for PDF reports
- **Uptime SLA**: 99.9% availability target

### Scalability Targets
- **Concurrent Users**: 1,000+ simultaneous users
- **Data Processing**: 1M+ records per analysis
- **Export Volume**: 10,000+ reports per month
- **Storage Capacity**: Multi-terabyte data lake support

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Consistent code formatting and best practices
- **Testing**: Minimum 80% code coverage required
- **Documentation**: Comprehensive inline and README documentation

## 📞 Support & Contact

### Technical Support
- **Documentation**: [Technical Architecture Guide](./docs/ARCHITECTURE.md)
- **API Reference**: [API Documentation](./docs/api/)
- **Deployment Guide**: [Deployment Instructions](./docs/deployment/)

### Government Inquiries
- **Security Questions**: [Security Documentation](./docs/security/)
- **Compliance Information**: [Compliance Guide](./SECURITY.md)
- **Integration Support**: Technical team available for consultation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built for the United States Air Force and Space Force recruitment mission** 🇺🇸

*Demonstrating advanced systems thinking and technical excellence for government stakeholders*