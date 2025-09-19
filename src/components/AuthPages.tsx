import React, { useState } from 'react';
import { Leaf, Eye, EyeOff, AlertCircle, Loader, ArrowLeft, MapPin, Phone, Mail, User, Building, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

interface AuthPagesProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

const AuthPages: React.FC<AuthPagesProps> = ({ mode, onNavigate }) => {
  const { t } = useLanguage();
  const { login, signup, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    farmLocation: '',
    crops: '',
    contact_number: '',
    organization: '',
    role: 'farmer' // Default to farmer
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      
      // Check for admin login
      if (formData.email === 'admin@herbtrace.com') {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid admin credentials');
        }
        return;
      }
      
      const success = await login(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password');
      }
    } else {
      // Signup validation
      if (!formData.email || !formData.password || !formData.confirmPassword || 
          !formData.name || !formData.farmLocation || !formData.contact_number || !formData.crops) {
        setError('Please fill in all required fields');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      const success = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        farmLocation: formData.farmLocation,
        crops: formData.crops,
        contact_number: formData.contact_number,
        organization: formData.organization,
        role: formData.role as 'farmer' | 'agent' | 'manufacturer'
      });

      if (!success) {
        setError('Failed to create account. Email may already exist.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('landing')}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-white/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Leaf className="w-10 h-10 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">HerbTrace</h1>
            </div>
            <LanguageSelector />
          </div>
          <p className="text-gray-600 text-lg">
            {mode === 'login' ? 'Welcome back to the future of herb traceability!' : 'Join as a Farmer - Register to start tracking your herbs'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {mode === 'login' ? t('auth.signin') : t('auth.signup')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {mode === 'signup' && (
              <>
                {/* Personal Information Section */}
                <div className="bg-gradient-to-r from-gray-50 to-green-50 p-8 rounded-xl border border-green-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-3 text-green-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                        {t('auth.name')} *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                        placeholder="Enter your full name"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-3">
                        {t('auth.contact')} *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="contact_number"
                          name="contact_number"
                          type="tel"
                          value={formData.contact_number}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                          placeholder="+91 9876543210"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-3">
                      {t('auth.location')} *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                        placeholder="City, State, Country"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-3">
                      {t('auth.organization')}
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                        placeholder="Organization name (optional)"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
                  <label className="block text-2xl font-semibold text-gray-900 mb-6">
                    {t('auth.selectRole')} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role.id)}
                        className={`p-8 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
                          formData.role === role.id
                            ? `border-green-500 ${role.bgColor} shadow-lg`
                            : role.color
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className={formData.role === role.id ? role.textColor : 'text-gray-600'}>
                            {role.icon}
                          </div>
                          <div>
                            <h3 className={`font-semibold text-lg ${formData.role === role.id ? role.textColor : 'text-gray-900'}`}>
                              {role.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Account Credentials Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-green-600" />
                Account Credentials
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    {t('auth.email')} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                    {t('auth.password')} *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12 text-lg"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-3">
                      {t('auth.confirmPassword')} *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12 text-lg"
                        placeholder="Confirm your password"
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-6 rounded-xl border border-red-200">
                <AlertCircle className="w-6 h-6" />
                <span className="text-lg font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-5 px-8 rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-semibold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  <span>{t('common.loading')}</span>
                </>
              ) : (
                <span>{mode === 'login' ? t('auth.signin') : t('auth.createAccount')}</span>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            {mode === 'login' ? (
              <p className="text-gray-600 text-lg">
                {t('auth.noAccount')}{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  disabled={isLoading}
                >
                  {t('auth.signup')}
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-lg">
                {t('auth.haveAccount')}{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  disabled={isLoading}
                >
                  {t('auth.signin')}
                </button>
              </p>
            )}
          </div>

          {mode === 'login' && (
            <div className="mt-6 text-center">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                {t('auth.forgotPassword')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPages;