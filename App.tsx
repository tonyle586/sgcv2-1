import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Moon, Sun, ChevronRight, Server, Code, Bot, QrCode, Palette, MapPin, Phone, Mail, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import { CONTENT } from './constants';
import { Language, ServiceItem, ProjectItem } from './types';
import AIChatWidget from './components/AIChatWidget';
import YoutubeEmbed from './components/YoutubeEmbed';

// --- Shared Components (Internal to prevent file explosion, but cleanly separated) ---

// 1. Header
const Header: React.FC<{ 
  lang: Language; 
  setLang: (l: Language) => void; 
  theme: 'dark' | 'light'; 
  toggleTheme: () => void; 
}> = ({ lang, setLang, theme, toggleTheme }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const nav = CONTENT[lang].nav;
  const location = useLocation();

  const links = [
    { label: nav.home, path: '/' },
    { label: nav.about, path: '/about' },
    { label: nav.services, path: '/services' },
    { label: nav.portfolio, path: '/portfolio' },
    { label: nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path ? 'text-brand-500 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-brand-500';

  return (
    <header className="fixed w-full top-0 z-40 bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://vncdn.io.vn/img/sgc/logo_sgc_new_ngang.jpg" alt="SGC" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className={`text-sm transition-colors ${isActive(link.path)}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-500"
          >
            <Globe size={16} className="mr-1" />
            {lang.toUpperCase()}
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-600 dark:text-white" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 p-4 shadow-xl">
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-lg font-medium text-gray-800 dark:text-gray-100"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <div className="flex justify-between items-center">
              <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="flex items-center text-gray-600 dark:text-gray-300">
                <Globe size={18} className="mr-2" /> {lang === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
              <button onClick={toggleTheme} className="flex items-center text-gray-600 dark:text-gray-300">
                 {theme === 'dark' ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
                 Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// 2. Footer
const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <footer className="bg-gray-100 dark:bg-dark-card pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-brand-600 mb-4">SGC</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.about.missionDesc.substring(0, 100)}...
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t.nav.services}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>WordPress & Dev</li>
              <li>AI Solutions</li>
              <li>Hosting & Domain</li>
              <li>QR Code</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t.nav.about}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>{t.about.missionTitle}</li>
              <li>{t.portfolio.title}</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t.nav.contact}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start"><MapPin size={16} className="mr-2 mt-1 flex-shrink-0" /> {t.contact.address}</li>
              <li className="flex items-center"><Mail size={16} className="mr-2" /> contact@sgc.tech</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>{t.footer.copyright}</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-500">{t.footer.privacy}</a>
            <a href="#" className="hover:text-brand-500">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://vncdn.io.vn/img/sgc/banner-sgcv2.jpg)' }}
        >
          <div className="absolute inset-0 bg-white/80 dark:bg-black/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-100 text-xs font-bold tracking-wider mb-6 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-brand-500/25">
                {t.hero.ctaPrimary}
              </Link>
              <Link to="/services" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="py-20 bg-white dark:bg-dark-card transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {t.services.items.slice(0, 6).map((item) => (
               <div key={item.id} className="p-8 border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-xl dark:hover:bg-slate-800 transition-all group">
                 <div className="w-12 h-12 bg-brand-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                   {getIcon(item.icon)}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                 <Link to="/services" className="text-brand-600 font-medium inline-flex items-center hover:underline">
                   Details <ArrowRight size={14} className="ml-1" />
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang].about;
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t.title}</h1>
        
        {/* Integrated Youtube Embed */}
        <YoutubeEmbed embedId="fkpZRbCqFWI" />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-brand-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t.missionTitle}</h2>
            <p className="opacity-90 leading-relaxed">{t.missionDesc}</p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.techTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t.techDesc}</p>
            <div className="mt-6 flex gap-4 text-brand-600 dark:text-brand-400">
               <Server size={32} />
               <Bot size={32} />
               <Code size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang].services;
  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-dark-bg min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>
          
          {/* Featured Video for Services */}
          <YoutubeEmbed embedId="_RyMJAsqK1Y" autoplay loop />
        </div>

        <div className="grid gap-8">
          {t.items.map((item, idx) => (
            <div key={item.id} className={`flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="w-16 h-16 bg-brand-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                   {getIcon(item.icon)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{item.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800 rounded-xl overflow-hidden relative group">
                  {/* Placeholder visualization */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold opacity-30 text-4xl">
                    {item.title.split(' ')[0]}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang].portfolio;
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 animate-fade-in">
       <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold text-brand-500 uppercase tracking-wide">{item.category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">{item.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

const Contact: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Error State
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = lang === 'vi' ? 'Vui lòng nhập họ và tên.' : 'Please enter your full name.';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = lang === 'vi' ? 'Vui lòng nhập email doanh nghiệp.' : 'Please enter your business email.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = lang === 'vi' ? 'Định dạng email không hợp lệ.' : 'Invalid email format.';
      isValid = false;
    }

    // Phone Validation (Allows international formats, checks for digits, min length)
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = lang === 'vi' ? 'Số điện thoại không hợp lệ (10-15 số).' : 'Invalid phone number format (10-15 digits).';
      isValid = false;
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = lang === 'vi' ? 'Vui lòng nhập nội dung tư vấn.' : 'Please enter your message.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      window.location.hash = '#/thank-you';
    }
  };

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 animate-fade-in">
       <div className="grid md:grid-cols-2 gap-12 items-start">
         <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-brand-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-600 flex-shrink-0 mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-brand-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-600 flex-shrink-0 mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Hotline</h3>
                  <p className="text-gray-600 dark:text-gray-400">+84 28 1234 5678</p>
                </div>
              </div>
            </div>

             {/* Mock Map */}
             <div className="mt-8 h-64 bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-500">
                [Google Map Integration Area]
             </div>
         </div>

         <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.formName}</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all`} 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.formEmail}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all`} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.formPhone}</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all`} 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.formMessage}</label>
                <textarea 
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg mt-4">
                {t.submit}
              </button>
            </div>
         </form>
       </div>
    </div>
  );
};

const ThankYou: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = CONTENT[lang].thankYou;
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center max-w-lg p-8 bg-white dark:bg-dark-card rounded-2xl shadow-2xl">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{t.message}</p>
        <Link to="/" className="inline-block bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors">
          {t.backHome}
        </Link>
      </div>
    </div>
  );
};

// --- Helper for Dynamic Icons ---
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Server': return <Server size={24} />;
    case 'Code': return <Code size={24} />;
    case 'Bot': return <Bot size={24} />;
    case 'QrCode': return <QrCode size={24} />;
    case 'Palette': return <Palette size={24} />;
    case 'Layers': return <Layers size={24} />;
    default: return <Server size={24} />;
  }
};

// --- Main App Component ---
export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Initial theme setup
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text font-sans transition-colors duration-300">
        <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/services" element={<Services lang={lang} />} />
            <Route path="/portfolio" element={<Portfolio lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/thank-you" element={<ThankYou lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />
        <AIChatWidget lang={lang} />
      </div>
    </Router>
  );
}