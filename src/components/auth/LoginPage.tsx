import React, { useState } from 'react';
import { Shield, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock users for demo
  const mockUsers: Record<string, User> = {
    'admin@aetc.mil': {
      id: '1',
      email: 'admin@aetc.mil',
      name: 'Super Admin Officer',
      role: {
        id: 'super-1',
        name: 'super_user',
        displayName: 'Super User',
        description: 'Full administrative access',
        permissions: [],
        dataAccess: {
          level: 'super_user',
          canViewPII: true,
          canViewFinancials: true,
          canViewPredictive: true,
          dataRetention: 365,
          geographicScope: ['all']
        },
        reportAccess: {
          templates: ['all'],
          customReports: true,
          scheduledReports: true,
          shareReports: true
        },
        exportPermissions: {
          formats: ['pdf', 'excel', 'pptx'],
          dataClassification: ['unclassified', 'cui'],
          approvalRequired: false,
          watermarking: true
        }
      },
      permissions: [],
      lastLogin: new Date(),
      isActive: true
    },
    'creator@aetc.mil': {
      id: '2',
      email: 'creator@aetc.mil',
      name: 'Content Creator',
      role: {
        id: 'creator-1',
        name: 'content_creator',
        displayName: 'Content Creator',
        description: 'Content creation and campaign management access',
        permissions: [],
        dataAccess: {
          level: 'content_creator',
          canViewPII: false,
          canViewFinancials: true,
          canViewPredictive: true,
          dataRetention: 180,
          geographicScope: ['all']
        },
        reportAccess: {
          templates: ['executive', 'operational'],
          customReports: true,
          scheduledReports: true,
          shareReports: false
        },
        exportPermissions: {
          formats: ['pdf', 'excel'],
          dataClassification: ['unclassified'],
          approvalRequired: false,
          watermarking: true
        }
      },
      permissions: [],
      lastLogin: new Date(),
      isActive: true
    },
    'user@aetc.mil': {
      id: '3',
      email: 'user@aetc.mil',
      name: 'Standard User',
      role: {
        id: 'user-1',
        name: 'user',
        displayName: 'User',
        description: 'Standard user access',
        permissions: [],
        dataAccess: {
          level: 'user',
          canViewPII: false,
          canViewFinancials: false,
          canViewPredictive: false,
          dataRetention: 90,
          geographicScope: ['all']
        },
        reportAccess: {
          templates: ['operational', 'tactical'],
          customReports: false,
          scheduledReports: false,
          shareReports: false
        },
        exportPermissions: {
          formats: ['excel', 'csv'],
          dataClassification: ['unclassified'],
          approvalRequired: true,
          watermarking: true
        }
      },
      permissions: [],
      lastLogin: new Date(),
      isActive: true
    },
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate login delay
    setTimeout(() => {
      const user = mockUsers[email];
      if (user && password) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please use a demo account.');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
    setIsLoading(true);
    
    // Auto-login after setting credentials
    setTimeout(() => {
      const user = mockUsers[demoEmail];
      if (user) {
        onLogin(user);
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      {/* Classification Banner */}
      <div className="classification-banner classification-unclassified classification-top">
        UNCLASSIFIED
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-gray-800/95 shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-white">
              AETC Analytics
            </CardTitle>
            <CardDescription className="text-gray-300">
              Air Education and Training Command
              <br />
              Recruitment Dashboard System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@aetc.mil"
                required
                disabled={isLoading}
                className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="government"
              size="lg"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-300">Demo Accounts</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-300">
              Click to login with demo accounts:
            </p>

            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('admin@aetc.mil', 'admin123')}
                disabled={isLoading}
                className="text-xs bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
              >
                Super Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('creator@aetc.mil', 'creator123')}
                disabled={isLoading}
                className="text-xs bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
              >
                Content Creator
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('user@aetc.mil', 'user123')}
                disabled={isLoading}
                className="text-xs bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
              >
                User
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-400">
              Department of the Air Force
              <br />
              Authorized Personnel Only
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Classification Banner */}
      <div className="classification-banner classification-unclassified classification-bottom">
        UNCLASSIFIED
      </div>
    </div>
  );
};

export default LoginPage;