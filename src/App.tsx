import React, { useState, useEffect } from 'react';
import { Check, Menu, X } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  highlight?: string;
}

type BillingCycle = 'monthly' | 'yearly';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [scrollY, setScrollY] = useState<number>(0);
  const [activeFeature, setActiveFeature] = useState<number>(0);

  // Animated background particles
  const [particles, setParticles] = useState<Array<{ x: number; y: number; rotation: number; element: string }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = [
      { x: 10, y: 20, rotation: 15, element: 'E=mc²' },
      { x: 25, y: 40, rotation: -10, element: '✈️' },
      { x: 80, y: 32, rotation: 5, element: '📄' },
      { x: 50, y: 50, rotation: 20, element: '⚛️' },
      { x: 70, y: 60, rotation: -15, element: '🦕' },
    ];
    setParticles(newParticles);

    // Scroll handler
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Rotate featured items
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Free',
      price: 0,
      period: 'month',
      features: [
        'Limited journals and chats',
        'Limited image and video generations',
        'Limited notes transcriptions',
        'Limited flashcard and practice generations',
        'Knowledge base integrations'
      ]
    },
    {
      name: 'Explorer',
      price: billingCycle === 'yearly' ? 12.50 : 15,
      period: 'month',
      popular: true,
      highlight: '🎓 Students with their education email get an extra 20% off all plans!',
      features: [
        'Unlimited journals & chats',
        'Unlimited image generation',
        '3 video generations / day',
        '5 notes transcriptions / day',
        '5 flashcard generations / day',
        '5 AI grading sessions / week',
        '30 day version history',
        'Google Drive export',
        'Access to Video Vault'
      ]
    },
    {
      name: 'Scholar',
      price: billingCycle === 'yearly' ? 20.83 : 25,
      period: 'month',
      highlight: '🎓 Students with their education email get an extra 20% off all plans!',
      features: [
        'Access to the real-time, proactive AI tutor',
        'Unlimited image and video generations',
        'Unlimited notes transcriptions',
        'Unlimited flashcards and practice problems',
        'Unlimited AI grading',
        'Unlimited version history'
      ]
    }
  ];

  const features = [
    {
      title: 'Visual learning, instantly',
      description: 'Generate video lessons, graphs, and images directly in your notes to boost your understanding',
      icon: '📊',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Turn any audio or video into structured notes',
      description: 'Record live lectures and meetings, or upload YouTube videos to automatically generate organized notes in your journal',
      icon: '🎥',
      color: 'from-orange-400 to-pink-500'
    },
    {
      title: 'Reference your resources',
      description: 'Integrate your Drive and Notion resources and the web as knowledge bases',
      icon: '📚',
      color: 'from-green-400 to-teal-500'
    }
  ];

  const universities = [
    { name: 'UCLA', color: 'text-blue-600' },
    { name: 'Michigan', color: 'text-yellow-500' },
    { name: 'Georgia Tech', color: 'text-gray-600' },
    { name: 'MIT', color: 'text-red-700' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-white/80 backdrop-blur-sm'
      } border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
              <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-xl font-semibold">A-plus</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-teal-600 transition">Blog</a>
              <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition">Pricing</a>
              <a href="#mission" className="text-gray-600 hover:text-teal-600 transition">Our Mission</a>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-600 hover:text-teal-600 transition py-2">Blog</a>
              <a href="#pricing" className="block text-gray-600 hover:text-teal-600 transition py-2">Pricing</a>
              <a href="#mission" className="block text-gray-600 hover:text-teal-600 transition py-2">Our Mission</a>
              <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Animated Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-teal-50/30 to-white"></div>
        
        {/* Animated Floating Particles */}
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `rotate(${particle.rotation}deg)`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + index}s`
            }}
          >
            {particle.element}
          </div>
        ))}
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm mb-8 animate-in fade-in slide-in-from-top duration-500">
            <span className="font-semibold">Y</span> Backed by Y Combinator
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
            AI-driven exam prep and personalized feedback app.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-900">
            Make learning feel effortless with AI that works alongside you. No switching apps, no losing focus.
          </p>
          
          <button className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 animate-in fade-in slide-in-from-bottom duration-1000">
            Start learning for free
          </button>
        </div>
      </section>

      {/* Animated Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-gray-600 text-lg mb-12">Loved by students at</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {universities.map((uni, index) => (
              <div
                key={uni.name}
                className={`text-3xl md:text-4xl font-bold ${uni.color} cursor-pointer hover:scale-110 transition transform`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {uni.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Everything you need, <span className="border-b-4 border-teal-400">right where you work.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-2 ring-teal-400 scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <h3 className="text-2xl font-bold text-teal-600 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className={`bg-gradient-to-br ${feature.color} h-64 rounded-xl flex items-center justify-center relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                  <div className="text-center relative z-10 transform group-hover:scale-110 transition">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <div className="text-sm text-white font-semibold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      {feature.title.split(',')[0]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Learn more, <span className="border-b-4 border-teal-400">spend less.</span>
          </h2>
          
          <div className="flex justify-center mb-12 mt-8">
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg transition ${
                  billingCycle === 'yearly' ? 'bg-teal-100 text-teal-700 font-semibold' : ''
                }`}
              >
                Yearly
                {billingCycle === 'yearly' && (
                  <span className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded">Save 17%</span>
                )}
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? 'border-2 border-teal-600 shadow-lg scale-105'
                    : 'border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  ${plan.price.toFixed(2)}{' '}
                  <span className="text-lg text-gray-500 font-normal">USD/{plan.period}</span>
                </div>
                {plan.highlight && (
                  <div className="bg-teal-50 text-teal-700 text-sm p-2 rounded mb-6">
                    {plan.highlight}
                  </div>
                )}
                {index === 2 && (
                  <div className="text-lg font-semibold mb-4">Everything in Explorer +</div>
                )}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start group">
                      <Check className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0 group-hover:scale-125 transition" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  {plan.name === 'Free' ? 'Get Started Free' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-8 relative z-10">
            Learning that works for you. Not the other way around.
          </h2>
          <button className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-lg hover:shadow-2xl transform hover:scale-105 relative z-10">
            Try for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="text-xl font-semibold">A-Plus</span>
              </div>
              <p className="text-gray-500 text-sm">© 2025 A-Plus, San Francisco, CA</p>
              <div className="flex space-x-4 mt-4">
                {['discord', 'twitter', 'youtube', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-teal-600 transition transform hover:scale-110"
                  >
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Contact Us</a>
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Careers</a>
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Blog</a>
                <a href="#mission" className="block text-gray-600 hover:text-teal-600 transition">Our Mission</a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Terms of Service</a>
                <a href="#" className="block text-gray-600 hover:text-teal-600 transition">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;