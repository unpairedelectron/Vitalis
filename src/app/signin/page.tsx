'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/contexts/ToastContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  ExclamationCircleIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useUser();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate email and password are provided
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      // Validate email format
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      let userData;
      let isValidLogin = false;

      // Check if user signed up previously
      const registeredUser = localStorage.getItem('vitalis_registered_user');
      if (registeredUser) {
        const parsedUser = JSON.parse(registeredUser);
        if (parsedUser.email === formData.email) {
          // For registered users, validate the exact password they used during signup
          if (parsedUser.password === formData.password) {
            userData = {
              id: parsedUser.id,
              email: parsedUser.email,
              name: parsedUser.name,
              firstName: parsedUser.firstName,
              lastName: parsedUser.lastName
            };
            isValidLogin = true;
          } else {
            setError('Invalid password. Please use the password you created during signup.');
            return;
          }
        }
      }

      // Demo accounts with specific credentials
      const demoAccounts = [
        { email: 'demo@vitalis.ai', password: 'demo123', name: 'Demo User', firstName: 'Demo' },
        { email: 'admin@vitalis.ai', password: 'admin123', name: 'Admin User', firstName: 'Admin' },
        { email: 'test@vitalis.ai', password: 'test123', name: 'Test User', firstName: 'Test' },
        { email: 'guest@vitalis.ai', password: 'guest123', name: 'Guest User', firstName: 'Guest' }
      ];

      // Check demo accounts
      const demoAccount = demoAccounts.find(account => 
        account.email === formData.email && account.password === formData.password
      );

      if (demoAccount) {
        userData = {
          id: 'demo-user-' + Date.now(),
          email: demoAccount.email,
          name: demoAccount.name,
          firstName: demoAccount.firstName,
        };
        isValidLogin = true;
      }

      // If no valid login found
      if (!isValidLogin) {
        setError('Invalid email or password. Try demo@vitalis.ai with password: demo123');
        return;
      }

      // Generate a demo token and login
      const token = 'demo-token-' + Date.now();
      login(token, userData!);
      showSuccess(`Welcome back${userData!.firstName ? ', ' + userData!.firstName : ''}! Redirecting to dashboard...`);
      router.push('/dashboard');
      
    } catch (err) {
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = {
        id: 'demo-user-001',
        email: 'demo@vitalis.ai',
        name: 'Demo User',
        firstName: 'Demo'
      };

      const token = 'demo-token-' + Date.now();
      login(token, userData);
      showSuccess('Demo login successful! Redirecting to dashboard...');
      router.push('/dashboard');
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(`${provider} login will be available soon. Use demo login for now.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HeartIconSolid className="h-10 w-10 text-red-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Vitalis
              </h1>
            </div>
          </Link>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-blue-200">
            Sign in to your health command center
          </p>
        </div>

        {/* Demo Login Banner */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ShieldCheckIcon className="h-5 w-5 text-blue-400 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-200 mb-2 font-medium">
                Demo Credentials Available:
              </p>
              <div className="text-xs text-blue-300 space-y-1">
                <div>📧 demo@vitalis.ai | 🔑 demo123</div>
                <div>📧 admin@vitalis.ai | 🔑 admin123</div>
                <div>📧 test@vitalis.ai | 🔑 test123</div>
                <div className="text-yellow-300 mt-2">
                  Or register with any email and use a 6+ character password
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <form className="mt-8 space-y-6 bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl p-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/30 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-black/50 border border-blue-500/30 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:z-10 sm:text-sm transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none relative block w-full pl-10 pr-10 py-3 bg-black/50 border border-blue-500/30 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:z-10 sm:text-sm transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-blue-400 hover:text-blue-300" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-blue-400 hover:text-blue-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-blue-500/30 bg-black/50 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Demo Login Button */}
          <div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-blue-500/30 text-sm font-medium rounded-lg text-blue-200 bg-black/30 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Loading...' : 'Demo Login (No Registration)'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-500/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-blue-300">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-full inline-flex justify-center py-3 px-4 border border-blue-500/30 rounded-lg shadow-sm bg-black/30 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="w-full inline-flex justify-center py-3 px-4 border border-blue-500/30 rounded-lg shadow-sm bg-black/30 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="ml-2">Apple</span>
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-blue-200">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
