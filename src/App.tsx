import { useEffect, useState, useRef, forwardRef } from 'react';
import {
  TrendingUp,
  Brain,
  Zap,
  BarChart3,
  LineChart,
  Globe,
  Building2,
  ShoppingCart,
  CheckCircle2,
} from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    models: false,
    forecast: false,
    useCases: false,
  });

  const modelsRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const check = (ref: React.RefObject<HTMLDivElement>, key: keyof typeof isVisible) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const visible = rect.top < window.innerHeight * 0.8;
          if (visible && !isVisible[key]) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      };

      check(modelsRef, 'models');
      check(forecastRef, 'forecast');
      check(useCasesRef, 'useCases');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-light tracking-tight">Insightra</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-light">
            <a href="#models" className="hover:text-blue-600">Models</a>
            <a href="#forecast" className="hover:text-blue-600">Engine</a>
            <a href="#cases" className="hover:text-blue-600">Use Cases</a>
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav>

      <HeroSection scrollY={scrollY} />
      <AIModelsSection isVisible={isVisible.models} ref={modelsRef} />
      <ForecastEngineSection isVisible={isVisible.forecast} ref={forecastRef} />
      <UseCasesSection isVisible={isVisible.useCases} ref={useCasesRef} />
      <CTASection />

      <footer className="py-12 border-t border-slate-200/50 bg-white/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-light">Insightra</span>
          </div>
          <p className="text-sm text-slate-600 font-light">
            Visualizing tomorrow, today.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------
   HERO SECTION
-------------------------------------------------------- */

const HeroSection = ({ scrollY }: { scrollY: number }) => {
  const [numbers, setNumbers] = useState([0, 0, 0]);

  useEffect(() => {
    const items = [
      { index: 0, target: 94.7, speed: 50 },
      { index: 1, target: 2.3, speed: 60 },
      { index: 2, target: 89, speed: 45 },
    ];

    items.forEach(({ index, target, speed }) => {
      let current = 0;
      const inc = target / (2000 / speed);
      const int = setInterval(() => {
        current += inc;
        if (current >= target) {
          current = target;
          clearInterval(int);
        }
        setNumbers(prev => {
          const n = [...prev];
          n[index] = current;
          return n;
        });
      }, speed);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <DataWaves scrollY={scrollY} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="px-4 py-2 bg-blue-100/50 rounded-full inline-block border text-sm mb-8">
          Next-Generation Predictive Intelligence
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
          Predict Tomorrow
        </h1>

        <p className="text-xl md:text-2xl font-light text-slate-600 mb-12 max-w-3xl mx-auto">
          Transform data into foresight with AI-powered predictions
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Start Predicting
          </button>
          <button className="px-8 py-4 bg-white/70 backdrop-blur-md rounded-full border">
            View Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <MetricCard value={numbers[0]} suffix="%" label="Accuracy" />
          <MetricCard value={numbers[1]} suffix="s" label="Response Time" />
          <MetricCard value={numbers[2]} suffix="%" label="Client Success" />
        </div>
      </div>
    </section>
  );
};

const DataWaves = ({ scrollY }: { scrollY: number }) => {
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <path
        d={`M0,${300 + Math.sin(scrollY * 0.002) * 50}
            Q250,${250 + Math.sin(scrollY * 0.003) * 60}
            500,${300 + Math.sin(scrollY * 0.002 + 1) * 50}
            T1000,${300 + Math.sin(scrollY * 0.002) * 50}
            T1500,${300 + Math.sin(scrollY * 0.002) * 50}
            T2000,${300 + Math.sin(scrollY * 0.002) * 50}`}
        stroke="url(#wave-gradient-1)"
        strokeWidth="2"
        fill="none"
      />

      <path
        d={`M0,${400 + Math.sin(scrollY * 0.003 + 0.5) * 40}
            Q250,${450 + Math.sin(scrollY * 0.004) * 50}
            500,${400 + Math.sin(scrollY * 0.003 + 1.5) * 40}
            T1000,${400 + Math.sin(scrollY * 0.003 + 0.5) * 40}
            T1500,${400 + Math.sin(scrollY * 0.003 + 0.5) * 40}
            T2000,${400 + Math.sin(scrollY * 0.003 + 0.5) * 40}`}
        stroke="url(#wave-gradient-2)"
        strokeWidth="2"
        fill="none"
      />

      <path
        d={`M0,${500 + Math.sin(scrollY * 0.0025) * 30}
            Q250,${550 + Math.sin(scrollY * 0.0035) * 40}
            500,${500 + Math.sin(scrollY * 0.0025 + 1) * 30}
            T1000,${500 + Math.sin(scrollY * 0.0025) * 30}
            T1500,${500 + Math.sin(scrollY * 0.0025) * 30}
            T2000,${500 + Math.sin(scrollY * 0.0025) * 30}`}
        stroke="url(#wave-gradient-1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

const MetricCard = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => (
  <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border shadow-xl">
    <div className="text-3xl font-light text-blue-600 mb-1">
      {value.toFixed(1)}
      {suffix}
    </div>
    <div className="text-sm font-light text-slate-600">{label}</div>
  </div>
);

/* -------------------------------------------------------
   MODELS SECTION (FIXED WITH forwardRef)
-------------------------------------------------------- */

const AIModelsSection = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    const models = [
      {
        icon: Brain,
        name: 'Neural Forecasting',
        description: 'Deep learning models that adapt to complex patterns in real-time',
        metric: '98.2% accuracy',
      },
      {
        icon: LineChart,
        name: 'Time Series Engine',
        description: 'Advanced temporal analysis for trend detection and seasonality',
        metric: '10M+ predictions/day',
      },
      {
        icon: Zap,
        name: 'Rapid Inference',
        description: 'Lightning-fast predictions with millisecond response times',
        metric: '2.1s average',
      },
    ];

    return (
      <section id="models" ref={ref} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-slate-900">
              AI Models
            </h2>
            <p className="text-xl font-light text-slate-600 max-w-2xl mx-auto">
              Powered by state-of-the-art machine learning architectures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <div
                key={model.name}
                className={`backdrop-blur-md bg-white/70 rounded-3xl p-8 border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <model.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-light mb-3 text-slate-900">{model.name}</h3>
                <p className="text-slate-600 font-light mb-4">{model.description}</p>
                <div className="text-sm text-blue-600 font-light">{model.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

/* -------------------------------------------------------
   FORECAST SECTION (FIXED WITH forwardRef)
-------------------------------------------------------- */

const ForecastEngineSection = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    return (
      <section id="forecast" ref={ref} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-slate-900">
                Forecast Engine
              </h2>
              <p className="text-xl font-light text-slate-600 mb-8">
                Our proprietary engine processes millions of data points for unprecedented accuracy
              </p>

              <div className="space-y-4">
                {[
                  'Multi-dimensional pattern recognition',
                  'Adaptive learning algorithms',
                  'Real-time data ingestion',
                  'Automated anomaly detection',
                ].map((feature, index) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`backdrop-blur-md bg-white/70 rounded-3xl p-8 border shadow-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <AnimatedChart isVisible={isVisible} />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

/* -------------------------------------------------------
   CHART
-------------------------------------------------------- */

const AnimatedChart = ({ isVisible }: { isVisible: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const int = setInterval(() => {
      current += 1;
      if (current > 100) {
        current = 100;
        clearInterval(int);
      }
      setProgress(current);
    }, 20);

    return () => clearInterval(int);
  }, [isVisible]);

  const points = [
    { x: 0, y: 30 },
    { x: 20, y: 45 },
    { x: 40, y: 38 },
    { x: 60, y: 65 },
    { x: 80, y: 58 },
    { x: 100, y: 75 },
  ];

  const fullPath = points
    .map((p, i) => {
      const x = (p.x / 100) * 300;
      const y = 150 - (p.y / 100) * 120;
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(' ');

  const progPath = points
    .filter(p => p.x <= progress)
    .map((p, i) => {
      const x = (p.x / 100) * 300;
      const y = 150 - (p.y / 100) * 120;
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">Revenue Forecast</span>
        <span className="text-sm text-blue-600">Next 6 Months</span>
      </div>

      <svg viewBox="0 0 300 150" className="w-full">
        <defs>
          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={fullPath} stroke="#e2e8f0" strokeWidth="2" fill="none" />

        <path
          d={progPath}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path d={`${progPath} L${(progress / 100) * 300},150 L0,150 Z`} fill="url(#chart-gradient)" />

        {points
          .filter(p => p.x <= progress)
          .map((p, i) => (
            <circle
              key={i}
              cx={(p.x / 100) * 300}
              cy={150 - (p.y / 100) * 120}
              r="4"
              fill="#3b82f6"
              className="animate-pulse"
            />
          ))}
      </svg>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <div className="text-2xl text-slate-900">+42%</div>
          <div className="text-xs text-slate-600">Growth</div>
        </div>
        <div>
          <div className="text-2xl text-slate-900">$2.4M</div>
          <div className="text-xs text-slate-600">Predicted</div>
        </div>
        <div>
          <div className="text-2xl text-slate-900">96%</div>
          <div className="text-xs text-slate-600">Confidence</div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   USE CASES SECTION (FIXED WITH forwardRef)
-------------------------------------------------------- */

const UseCasesSection = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    const cases = [
      {
        icon: Building2,
        title: 'Enterprise Operations',
        description: 'Optimize supply chain, workforce planning, and resource allocation',
      },
      {
        icon: BarChart3,
        title: 'Financial Services',
        description: 'Market prediction, risk assessment, and portfolio optimization',
      },
      {
        icon: ShoppingCart,
        title: 'Retail & E-commerce',
        description: 'Demand forecasting, inventory management, pricing strategies',
      },
      {
        icon: Globe,
        title: 'Global Markets',
        description: 'International trends, currency movements, and trade patterns',
      },
    ];

    return (
      <section
        id="cases"
        ref={ref}
        className="py-32 relative bg-gradient-to-br from-slate-900 to-blue-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl text-white font-extralight">Use Cases</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Trusted by elite organizations across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((c, index) => (
              <div
                key={c.title}
                className={`backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <c.icon className="w-12 h-12 text-blue-300 mb-4" />
                <h3 className="text-2xl text-white font-light mb-3">{c.title}</h3>
                <p className="text-blue-100 font-light">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

/* -------------------------------------------------------
   CTA SECTION
-------------------------------------------------------- */

const CTASection = () => (
  <section className="py-32 relative">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="backdrop-blur-md bg-white/70 rounded-[3rem] p-16 border shadow-2xl">
        <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-slate-900">
          Ready to see the future?
        </h2>
        <p className="text-xl font-light text-slate-600 mb-10 max-w-2xl mx-auto">
          Join the world's most forward-thinking companies
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Start Free Trial
          </button>
          <button className="px-10 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800">
            Schedule Demo
          </button>
        </div>

        <p className="text-sm font-light text-slate-500 mt-8">
          No credit card required · Enterprise-grade security
        </p>
      </div>
    </div>
  </section>
);

export default App;
