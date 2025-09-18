import React from 'react';
import { Leaf, MapPin, Shield, Award, Clock, ArrowRight, Users, Package, FlaskConical, Factory, CheckCircle, Star, Globe, Scan } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: t('features.geotagged.title'),
      description: t('features.geotagged.desc')
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: t('features.blockchain.title'),
      description: t('features.blockchain.desc')
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: t('features.quality.title'),
      description: t('features.quality.desc')
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: t('features.realtime.title'),
      description: t('features.realtime.desc')
    }
  ];

  const stats = [
    { number: "10,000+", label: "Herbs Tracked" },
    { number: "500+", label: "Farmers Connected" },
    { number: "99.9%", label: "Traceability Accuracy" },
    { number: "24/7", label: "System Availability" }
  ];

  const roles = [
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: t('role.farmer'),
      description: t('role.farmer.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FlaskConical className="w-12 h-12 text-blue-600" />,
      title: t('role.lab'),
      description: t('role.lab.desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Factory className="w-12 h-12 text-purple-600" />,
      title: t('role.processor'),
      description: t('role.processor.desc'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Ayurvedic Practitioner",
      content: "HerbTrace has revolutionized how we verify the authenticity of our medicinal herbs. The blockchain technology ensures complete transparency.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Organic Farmer",
      content: "As a farmer, I love how easy it is to record my herb collections with GPS coordinates. It has increased the value of my produce significantly.",
      rating: 5
    },
    {
      name: "Lab Director, BioTest Labs",
      role: "Quality Testing Laboratory",
      content: "The integration with our testing processes is seamless. We can now provide digital certificates that are tamper-proof.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">HerbTrace</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                {t('nav.features')}
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
                {t('nav.about')}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
                {t('nav.contact')}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('nav.signup')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              {t('hero.cta.secondary')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our ecosystem as a stakeholder in the Ayurvedic supply chain
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('signup')}>
                <div className={`bg-gradient-to-br ${role.color} p-8 rounded-xl text-white hover:scale-105 transition-transform`}>
                  <div className="mb-6">{role.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {role.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    {role.description}
                  </p>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm">Join as {role.title.split('/')[0]}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by professionals across the Ayurvedic industry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-green-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Ayurvedic Supply Chain?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of professionals who trust HerbTrace for complete transparency and authenticity verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('demo')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Scan className="w-5 h-5" />
              <span>Try Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold">HerbTrace</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing Ayurvedic herb traceability with blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;