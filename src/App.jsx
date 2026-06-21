import React, { useState, useEffect, useMemo } from 'react';
import { 
  BrainCircuit, Zap, ShieldCheck, 
  Users, Globe, BadgePoundSterling, CheckCircle2, 
  Play, ChevronDown, MessageSquare, 
  ArrowRight, Star, ArrowUpRight,
  BarChart3, QrCode, Smartphone, TrendingUp, Wrench, Hammer, HardHat, Activity, Smile, Frown,
  Menu, X, Lock, Mail, User, Building, Send
} from 'lucide-react';

const cx = (...classes) => classes.filter(Boolean).join(' ');

// --- Custom Premium Brand Logo ---
const BrandLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 6"/>
    <circle cx="16" cy="19" r="3.5" fill="currentColor"/>
  </svg>
);

// --- Layout & Navigation ---
function NavigationBar({ setView, currentView, toggleMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed w-full top-0 z-[100] px-4 sm:px-6 mt-4 sm:mt-6 transition-all duration-300">
      <nav className={cx(
        "max-w-6xl mx-auto rounded-full transition-all duration-500 flex justify-between items-center px-4 sm:px-6 py-3",
        scrolled ? "pill-nav" : "bg-transparent border border-transparent"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-800 border border-brand-700 rounded-full flex items-center justify-center shadow-md shrink-0">
            <BrandLogo className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-white">EchoLoop</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <button onClick={() => handleScrollTo('platform')} className="text-sm font-medium text-slate-300 hover:text-brand-400 transition-colors">Platform</button>
          <button onClick={() => handleScrollTo('insights')} className="text-sm font-medium text-slate-300 hover:text-brand-400 transition-colors">Insights</button>
          <button onClick={() => handleScrollTo('pricing')} className="text-sm font-medium text-slate-300 hover:text-brand-400 transition-colors">Pricing</button>
          <button onClick={() => setView('demo')} className="text-sm font-medium text-slate-300 hover:text-brand-400 transition-colors">Demo</button>
        </div>
        
        {/* CTAs & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => setView('signup')} 
            className="hidden md:flex bg-brand-400 text-brand-900 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold hover:bg-brand-500 transition-all hover:scale-105 active:scale-95 items-center gap-2 shadow-[0_0_15px_rgba(71,241,156,0.3)] whitespace-nowrap"
          >
            Start Free Trial
          </button>
          
          <button onClick={toggleMenu} className="lg:hidden text-white hover:text-brand-400 transition-colors p-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}

// --- Side Menubar (Drawer) ---
const SideMenu = ({ isOpen, closeMenu, setView, currentView }) => {
  const handleNav = (target) => {
    if (['platform', 'insights', 'pricing'].includes(target)) {
      if (currentView !== 'home') {
        setView('home');
        setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 150);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setView(target);
    }
    closeMenu();
  };

  return (
    <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm" onClick={closeMenu} />
      
      {/* Drawer */}
      <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-brand-800 border-l border-brand-700 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 sm:p-6 flex justify-between items-center border-b border-brand-700">
          <span className="font-bold text-lg text-white">Menu</span>
          <button onClick={closeMenu} className="text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto">
          <button onClick={() => handleNav('home')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Home</button>
          <button onClick={() => handleNav('platform')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Platform</button>
          <button onClick={() => handleNav('insights')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Insights</button>
          <button onClick={() => handleNav('pricing')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Pricing</button>
          <button onClick={() => handleNav('demo')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Watch Demo</button>
          <button onClick={() => handleNav('contact')} className="text-left text-lg font-medium text-slate-300 hover:text-brand-400 transition-colors">Contact Sales</button>
        </div>
        
        <div className="p-5 sm:p-6 border-t border-brand-700 shrink-0">
          <button onClick={() => handleNav('signup')} className="w-full bg-brand-400 text-brand-900 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-brand-500 transition-colors flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// SECTIONS FOR LANDING PAGE
// ==========================================

const LandingHero = ({ setView }) => (
  <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-32 px-4 overflow-hidden border-b border-brand-800">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[500px] opacity-20 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-brand-400 rounded-full mix-blend-screen filter blur-[90px] sm:blur-[128px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-brand-600 rounded-full mix-blend-screen filter blur-[90px] sm:blur-[128px] animate-blob animation-delay-2000"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-800 border border-brand-700 text-brand-400 text-[10px] sm:text-xs font-bold mb-6 sm:mb-8 tracking-wider shadow-sm uppercase whitespace-nowrap">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-brand-400"></span>
        </span>
        The AI Reputation Platform
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white mb-6 sm:mb-8 tracking-tighter leading-[1.15] lg:leading-[1.1] text-balance">
        Turn 5-second voice notes into <br className="hidden md:block" /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-500">
          revenue & Google Reviews.
        </span>
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-medium text-balance px-2 sm:px-0">
        Don't just record feedback. EchoLoop's AI analyzes sentiment, tracks staff performance, flags complaints instantly, and automates your 5-star Google Reviews.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-4 sm:px-0">
        <button onClick={() => setView('signup')} className="w-full sm:w-auto bg-brand-400 text-brand-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-[14px] sm:text-[15px] hover:bg-brand-500 transition-all shadow-[0_8px_20px_rgba(71,241,156,0.2)] flex items-center justify-center gap-2 group">
          Lock in $19/mo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => setView('demo')} className="w-full sm:w-auto flex items-center justify-center bg-brand-800 border border-brand-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-[14px] sm:text-[15px] hover:bg-brand-700 transition-all shadow-sm gap-2">
          <Play className="w-4 h-4 text-brand-400" fill="currentColor" /> See How It Works
        </button>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 gap-y-3 text-[12px] sm:text-[13px] font-medium text-slate-500 px-4">
        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-600" /> ICO Registered</div>
        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-600" /> 100% GDPR Compliant</div>
        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-600" /> US & UK Data Hosting</div>
      </div>
    </div>
  </section>
);

const BuiltForSection = () => (
  <section className="py-8 sm:py-10 bg-brand-900 z-20 relative border-b border-brand-800">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bento-card p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
        <div className="lg:w-1/3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 sm:mb-3">Built for Local Trades</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            We skipped the enterprise bloat. EchoLoop is a surgical intelligence tool built exclusively for the realities of local home services.
          </p>
        </div>
        <div className="lg:w-2/3 flex flex-wrap gap-2 sm:gap-3">
          {[
            { name: 'Plumbing & Heating', icon: <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" /> },
            { name: 'Electrical Contractors', icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" /> },
            { name: 'General Builders', icon: <Hammer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" /> },
            { name: 'Roofing', icon: <HardHat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" /> },
            { name: 'HVAC Specialists', icon: <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" /> }
          ].map((trade) => (
            <div key={trade.name} className="px-3 sm:px-5 py-2 sm:py-2.5 bg-brand-900 text-slate-300 rounded-full font-medium text-[12px] sm:text-[14px] border border-brand-700 flex items-center gap-1.5 sm:gap-2 shadow-sm hover:border-brand-500 transition-colors cursor-default">
              {trade.icon} {trade.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const WorkflowSection = () => (
  <section id="platform" className="py-16 sm:py-24 bg-brand-900 relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 sm:mb-20 text-center max-w-3xl mx-auto">
        <h2 className="text-[11px] sm:text-[12px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-3 sm:mb-4">The Workflow</h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-5 tracking-tight text-white">How EchoLoop drives growth</h3>
        <p className="text-slate-400 text-base sm:text-lg">A seamless loop from job completion to actionable insights.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative">
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-600 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-900 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 border border-brand-700 shadow-xl text-brand-400">
            <QrCode className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">1. Trigger</h4>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2">Job is marked complete in your CRM. Customer instantly gets a text or scans a QR code.</p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-900 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 border border-brand-700 shadow-xl">
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">2. Voice Review</h4>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2">"How was your experience?" Customer taps and records a frictionless 5-second voice note.</p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-900 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 border border-brand-700 shadow-xl">
            <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">3. AI Engine</h4>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2">EchoLoop instantly transcribes speech, scoring sentiment, and detecting staff names or issues.</p>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-400 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-[0_0_30px_rgba(71,241,156,0.3)]">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-brand-900" fill="currentColor" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">4. Take Action</h4>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2">Happy? Auto-prompted to post on Google. Unhappy? Sent directly to your owner dashboard.</p>
        </div>
      </div>
    </div>
  </section>
);

const InsightsDemo = () => (
  <section id="insights" className="py-16 sm:py-24 bg-brand-800 relative overflow-hidden border-y border-brand-700">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-3 sm:mb-4">The Real Value</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight text-white leading-tight">
            Voice recording alone isn't a SaaS. <br className="hidden lg:block"/><span className="text-brand-400">AI Insights are.</span>
          </h3>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            We don't just give you a list of audio files to listen to. Our AI rips the context out of every review, instantly giving you a bird's-eye view of your business health.
          </p>
          
          <div className="space-y-5 sm:space-y-6">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-900 border border-brand-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">Customer Satisfaction Score</h4>
                <p className="text-xs sm:text-sm text-slate-400">Track your daily CSAT out of 100.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-900 border border-brand-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">Top Praised Staff</h4>
                <p className="text-xs sm:text-sm text-slate-400">"James did a great job" automatically credits James on your team leaderboard.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-900 border border-brand-700 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">Common Complaints Tracker</h4>
                <p className="text-xs sm:text-sm text-slate-400">Instantly see if "Mess left behind" or "Pricing" is trending negatively.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bento-card p-3 sm:p-4 bg-brand-900/80 backdrop-blur-xl relative">
          <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-brand-400 text-brand-900 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
            Live AI Output
          </div>
          <div className="bg-brand-800 rounded-xl border border-brand-700 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-brand-700 bg-brand-900 flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="h-1.5 sm:h-2 w-3/4 bg-brand-700 rounded-full mb-1.5 sm:mb-2"></div>
                <div className="h-1.5 sm:h-2 w-1/2 bg-brand-700 rounded-full"></div>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">0:06s</span>
            </div>
            
            <div className="p-4 sm:p-6">
              <p className="text-base sm:text-lg text-white font-medium italic mb-5 sm:mb-6">
                "The boiler fix by James was great, but the callout time was way too long today."
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-brand-900 p-3 sm:p-4 rounded-lg border border-brand-700">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold mb-1">Sentiment</p>
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm sm:text-base">
                    <Frown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Mixed / Negative
                  </div>
                </div>
                <div className="bg-brand-900 p-3 sm:p-4 rounded-lg border border-brand-700">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold mb-1">Category</p>
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm sm:text-base">
                     Callout Time
                  </div>
                </div>
                <div className="bg-brand-900 p-3 sm:p-4 rounded-lg border border-brand-700">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold mb-1">Severity</p>
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-sm sm:text-base">
                     Medium
                  </div>
                </div>
                <div className="bg-brand-900 p-3 sm:p-4 rounded-lg border border-brand-700">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold mb-1">Staff Tagged</p>
                  <div className="flex items-center gap-2 text-brand-400 font-bold text-sm sm:text-base">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> James (Praise)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = ({ setView }) => (
  <section id="pricing" className="py-16 sm:py-24 bg-brand-900 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-[11px] sm:text-[12px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-3 sm:mb-4">Disruptive Pricing</h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight text-white">Choose your growth engine.</h3>
        <p className="text-slate-400 text-base sm:text-lg">We believe reputation tools shouldn't cost hundreds of dollars a month.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
        
        {/* Starter Plan */}
        <div className="bento-card p-6 sm:p-8 bg-brand-900">
          <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
          <p className="text-sm text-slate-400 mb-5 sm:mb-6">Perfect for single trades starting out.</p>
          <div className="mb-5 sm:mb-6 flex items-end">
            <span className="text-4xl font-extrabold text-white">$9</span>
            <span className="text-slate-500 text-sm mb-1 ml-1">/mo</span>
          </div>
          <button onClick={() => setView('signup')} className="w-full py-3 px-4 bg-brand-800 border border-brand-700 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors mb-6 sm:mb-8 text-sm sm:text-base">
            Start Free Trial
          </button>
          <ul className="space-y-3 sm:space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> 100 Voice Feedbacks</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> QR Code Integration</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Basic AI Analytics</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Standard Dashboard</li>
          </ul>
        </div>

        {/* Growth Plan (Highlighted) */}
        <div className="bento-card p-6 sm:p-8 bg-brand-800 border-brand-500 relative transform lg:-translate-y-4 shadow-[0_0_40px_rgba(71,241,156,0.15)] order-first md:order-none md:col-span-2 lg:col-span-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-400 text-brand-900 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap">
            Most Popular
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Growth</h4>
          <p className="text-sm text-slate-400 mb-5 sm:mb-6">The ultimate tool to skyrocket Google Reviews.</p>
          <div className="mb-5 sm:mb-6 flex items-end">
            <span className="text-5xl font-extrabold text-brand-400">$19</span>
            <span className="text-slate-400 text-sm mb-2 ml-1">/mo</span>
          </div>
          <button onClick={() => setView('signup')} className="w-full py-3 px-4 bg-brand-400 text-brand-900 rounded-xl font-bold hover:bg-brand-500 transition-colors mb-6 sm:mb-8 shadow-lg shadow-brand-400/20 text-sm sm:text-base">
            Get Started Now
          </button>
          <ul className="space-y-3 sm:space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" /> <strong>Unlimited</strong> Feedback</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" /> Advanced AI Insights</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" /> WhatsApp / SMS Automation</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" /> Auto Google Review Prompts</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="bento-card p-6 sm:p-8 bg-brand-900">
          <h4 className="text-xl font-bold text-white mb-2">Premium</h4>
          <p className="text-sm text-slate-400 mb-5 sm:mb-6">For multi-branch & franchise operations.</p>
          <div className="mb-5 sm:mb-6 flex items-end">
            <span className="text-4xl font-extrabold text-white">$49</span>
            <span className="text-slate-500 text-sm mb-1 ml-1">/mo</span>
          </div>
          <button onClick={() => setView('contact')} className="w-full py-3 px-4 bg-brand-800 border border-brand-700 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors mb-6 sm:mb-8 text-sm sm:text-base">
            Contact Sales
          </button>
          <ul className="space-y-3 sm:space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Multi-branch Dashboard</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Team Leaderboards</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Custom AI Sentiment Reports</li>
            <li className="flex items-start gap-2.5 sm:gap-3"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0" /> Dedicated Account Manager</li>
          </ul>
        </div>

      </div>
    </div>
  </section>
);


// ==========================================
// NEW PAGE VIEWS (Signup, Contact, Demo, Legal)
// ==========================================

const SignupView = ({ setView }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 bg-brand-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-brand-800 rounded-[2rem] border border-brand-700 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {submitted ? (
          <div className="text-center animate-fade-in-up py-8 sm:py-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-900 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 border border-brand-700">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Account Created!</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              Check your email to verify your account and start your 14-day free trial.
            </p>
            <button onClick={() => setView('home')} className="bg-brand-800 border border-brand-700 text-white px-6 py-3 rounded-xl hover:bg-brand-700 transition-all font-bold text-sm sm:text-base">
              Return Home
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <BrandLogo className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">Start your trial</h2>
              <p className="text-slate-400 text-xs sm:text-sm">No credit card required. 14 days free.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input type="text" required placeholder="John Doe" className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-sm sm:text-base" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input type="email" required placeholder="john@company.com" className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-sm sm:text-base" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input type="password" required placeholder="••••••••" className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-sm sm:text-base" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-brand-400 text-brand-900 font-extrabold py-3.5 sm:py-4 rounded-xl hover:bg-brand-500 transition-colors mt-4 sm:mt-6 shadow-[0_0_20px_rgba(71,241,156,0.2)] text-sm sm:text-base">
                Create Account
              </button>
              
              <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-3 sm:mt-4">
                By signing up, you agree to our <span onClick={() => setView('terms')} className="text-brand-400 cursor-pointer hover:underline">Terms</span> and <span onClick={() => setView('privacy')} className="text-brand-400 cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const ContactView = ({ setView }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 bg-brand-900 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-brand-800 rounded-[2rem] border border-brand-700 p-6 sm:p-8 md:p-12 shadow-2xl">
        {submitted ? (
          <div className="text-center animate-fade-in-up py-8 sm:py-10">
            <div className="w-14 h-14 sm:w-16 h-16 bg-brand-900 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 border border-brand-700">
              <Send className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Message Sent!</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              Our enterprise team will get back to you within 24 hours to schedule a consultation.
            </p>
            <button onClick={() => setView('home')} className="bg-brand-800 border border-brand-700 text-white px-6 py-3 rounded-xl hover:bg-brand-700 transition-all font-bold text-sm sm:text-base">
              Return Home
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">Contact Sales</h2>
              <p className="text-slate-400 text-base sm:text-lg px-2">Tell us about your business, and we'll design a custom enterprise solution.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">First Name</label>
                  <input type="text" required placeholder="John" className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 outline-none transition-all text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Last Name</label>
                  <input type="text" required placeholder="Doe" className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 outline-none transition-all text-sm sm:text-base" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Work Email</label>
                  <input type="email" required placeholder="john@company.com" className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 outline-none transition-all text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">Company Size</label>
                  <select required className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white focus:border-brand-500 focus:ring-1 outline-none transition-all appearance-none text-sm sm:text-base">
                    <option value="" disabled selected>Select size</option>
                    <option value="1-5">1-5 Locations</option>
                    <option value="6-20">6-20 Locations</option>
                    <option value="21+">21+ Locations</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">How can we help?</label>
                <textarea required rows="4" placeholder="Tell us about your current challenges..." className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border border-brand-700 bg-brand-900 text-white placeholder:text-slate-600 focus:border-brand-500 focus:ring-1 outline-none transition-all text-sm sm:text-base"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-brand-400 text-brand-900 font-extrabold py-3.5 sm:py-4 rounded-xl hover:bg-brand-500 transition-colors shadow-[0_0_20px_rgba(71,241,156,0.2)] text-sm sm:text-base mt-2">
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const DemoView = ({ setView }) => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 bg-brand-900 flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-[10px] sm:text-[12px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-3 sm:mb-4">Product Demo</h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-5 tracking-tight text-white">See EchoLoop in action.</h3>
        <p className="text-slate-400 text-sm sm:text-lg px-2">Watch how our AI transforms a 5-second voice note into actionable insights.</p>
      </div>
      
      <div className="w-full max-w-4xl aspect-video bg-brand-800 rounded-2xl sm:rounded-[2rem] border border-brand-700 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-brand-900/40 group-hover:bg-brand-900/20 transition-colors z-10"></div>
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-brand-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(71,241,156,0.4)] z-20 group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-brand-900 ml-1" fill="currentColor" />
        </div>
        <p className="mt-4 sm:mt-6 text-white font-bold tracking-wide z-20 text-sm sm:text-base">Play 2-Minute Demo</p>
      </div>
      
      <button onClick={() => setView('home')} className="mt-10 sm:mt-12 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm sm:text-base">
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
      </button>
    </div>
  );
};

const LegalView = ({ title, setView }) => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 bg-brand-900">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setView('home')} className="mb-6 sm:mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm sm:text-base">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-8">{title}</h1>
        <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-4 sm:space-y-6 leading-relaxed text-sm sm:text-base">
          <p>Last updated: June 21, 2026</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">1. Introduction</h2>
          <p>This is a placeholder page for the {title}. In a production environment, this page would contain the full legal text regarding your data processing, privacy commitments, and terms of use for the EchoLoop SaaS platform.</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">2. Data Processing & GDPR</h2>
          <p>EchoLoop strictly adheres to the guidelines set forth by the UK GDPR. All customer data, voice recordings, and AI transcripts are processed and stored securely within AWS servers located exclusively in London, United Kingdom.</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">3. Contact Us</h2>
          <p>If you have any questions regarding these terms, please contact our legal department via the <span onClick={() => setView('contact')} className="text-brand-400 cursor-pointer hover:underline">Contact Sales</span> page.</p>
        </div>
      </div>
    </div>
  );
};

// --- Footer Component ---
const FooterBlock = ({ setView }) => (
  <footer className="bg-brand-900 py-10 sm:py-12 border-t border-brand-800">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6">
      
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-brand-800 border border-brand-700 rounded-md flex items-center justify-center">
          <BrandLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-400" />
        </div>
        <span className="font-bold text-white text-base sm:text-lg">EchoLoop</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-slate-500 font-medium">
        <span>© 2026 EchoLoop</span>
        <span className="hidden sm:inline">•</span>
        <span>Built for the US & UK 🇬🇧</span>
      </div>
      
      <div className="flex gap-4 sm:gap-5 text-[12px] sm:text-[13px] font-medium text-slate-500">
        <button onClick={() => setView('privacy')} className="hover:text-brand-400 transition-colors">Privacy</button>
        <button onClick={() => setView('terms')} className="hover:text-brand-400 transition-colors">Terms</button>
        <button onClick={() => setView('contact')} className="hover:text-brand-400 transition-colors">Contact</button>
      </div>
      
    </div>
  </footer>
);

export default function App() {
  const [currentView, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-brand-900 selection:bg-brand-400 selection:text-brand-900">
      
      {/* Global Navigation */}
      <NavigationBar 
        setView={setView} 
        currentView={currentView} 
        toggleMenu={() => setIsMenuOpen(true)} 
      />
      
      <SideMenu 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)} 
        setView={setView}
        currentView={currentView}
      />

      {/* View Router */}
      {currentView === 'home' && (
        <>
          <LandingHero setView={setView} />
          <BuiltForSection />
          <WorkflowSection />
          <InsightsDemo />
          <PricingSection setView={setView} />
        </>
      )}

      {currentView === 'signup' && <SignupView setView={setView} />}
      {currentView === 'contact' && <ContactView setView={setView} />}
      {currentView === 'demo' && <DemoView setView={setView} />}
      {currentView === 'privacy' && <LegalView title="Privacy Policy" setView={setView} />}
      {currentView === 'terms' && <LegalView title="Terms of Service" setView={setView} />}

      {/* Global Footer */}
      <FooterBlock setView={setView} />
      
    </div>
  );
}