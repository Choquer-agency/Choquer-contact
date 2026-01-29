import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Mobile detection hook
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    // Set initial value
    setIsMobile(mq.matches);
    
    // Listen for changes
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
};

// Types
interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  companyUrl: string;
  phone: string;
  lookingFor: string[];
  currentWebsite: string;
  teamSituation: string;
  trafficReality: string;
  hopingFor: string[];
  anythingElse: string;
  _honeypot?: string;
  _step2StartTime?: number;
  _step2Duration?: number;
}

type StepId = 0 | 1 | 2 | 3 | 4 | 5;

interface AiSummary {
  situationAnalysis: string;
  mistake: string;
  nextStep: string;
}

interface StepConfig {
  id: StepId;
  number: string;
  title: string;
  label: string;
}

// Constants
const STEPS: StepConfig[] = [
  { id: 0, label: "Nice To Meet You", number: "01", title: "Nice To Meet You" },
  { id: 1, label: "What Are You Looking For", number: "02", title: "What kind of help are you looking for?" },
  { id: 2, label: "Where are you right now?", number: "03", title: "What does your current situation look like?" },
  { id: 3, label: "What are you hoping this leads to?", number: "04", title: "What are you hoping this turns into?" },
  { id: 4, label: "Anything we should know?", number: "05", title: "Anything Else We Should Know?" },
  { id: 5, label: "Our Perspective", number: "06", title: "Our Perspective" },
];

const LOOKING_FOR_OPTIONS = [
  "Website rebuild / new site",
  "SEO & growth",
  "CRO / optimization",
  "AI & automation",
  "Ongoing marketing partnership"
];

const CURRENT_WEBSITE_OPTIONS = [
  "We don't have a website yet",
  "We have a website, but it's outdated",
  "We have a website, but it's not converting",
  "We recently launched or redesigned our website",
  "Our website is old, but we've outgrown it",
  "I'm not sure; it just doesn't feel right"
];

const TEAM_SITUATION_OPTIONS = [
  "Founder-led (we do most things ourselves)",
  "Small internal team, wearing multiple hats",
  "Dedicated marketing role or team",
  "Working with freelancers or agencies",
  "A mix of internal team + external partners",
  "I'm not sure — it's a bit messy right now"
];

const TRAFFIC_REALITY_OPTIONS = [
  "We're getting very little traffic",
  "Traffic is steady, but leads are inconsistent",
  "We get traffic, but it's not the right audience",
  "Traffic and leads are growing, but not fast enough",
  "We're growing, but we don't fully trust the data",
  "I'm not sure — we haven't looked closely"
];

const HOPING_FOR_OPTIONS = [
  "More qualified inbound leads",
  "A foundation we can build on long-term",
  "Higher conversion rates",
  "Easier internal management",
  ""I'm not sure — I want guidance""
];

// API Configuration
const API_BASE_URL = 'https://choquer-contact-production.up.railway.app';

// UI Components
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  type?: string;
}> = ({ label, value, onChange, required = false, type = "text" }) => (
  <div style={{ marginBottom: '8px' }}>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`${label}${required ? '*' : ''}`}
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        outline: 'none',
        color: '#1F2937',
        fontSize: '16px',
        boxSizing: 'border-box',
      }}
    />
  </div>
);

const SelectDropdown: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  isMobile?: boolean;
}> = ({ label, value, onChange, options, isMobile = false }) => (
  <div style={{ 
    marginBottom: '12px', 
    display: 'flex', 
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    gap: isMobile ? '4px' : '24px'
  }}>
    <label style={{ 
      color: '#1F2937', 
      fontWeight: 500, 
      fontSize: isMobile ? '16px' : '18px',
      width: isMobile ? 'auto' : '176px',
      flexShrink: 0,
      marginBottom: isMobile ? '4px' : '0'
    }}>{label}</label>
    <div style={{ flex: 1 }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          outline: 'none',
          color: '#1F2937',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled>Select One</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

const CheckboxButton: React.FC<{
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}> = ({ label, isSelected, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      width: '100%',
      textAlign: 'left',
      padding: '12px 20px',
      borderRadius: '12px',
      border: isSelected ? '1px solid #F97316' : '1px solid #E5E7EB',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      cursor: 'pointer',
    }}
  >
    <span style={{ fontSize: '16px', color: isSelected ? '#1F2937' : '#6B7280', fontWeight: isSelected ? 500 : 400 }}>{label}</span>
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isSelected ? '#F97316' : '#F3F4F6',
    }}>
      {isSelected && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="white">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  </button>
);

const NextButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      marginTop: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: disabled ? '#FCD5B5' : '#F97316',
      color: 'white',
      padding: '12px 28px',
      borderRadius: '8px',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <span style={{ fontWeight: 500, fontSize: '16px' }}>Next</span>
    <div style={{ backgroundColor: 'black', padding: '6px', borderRadius: '4px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </button>
);

// Step Components
interface StepProps {
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  isMobile?: boolean;
}

const Step1: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const isValid = formData.fullName && formData.email && formData.companyName && formData.companyUrl;
  return (
    <div className="animate-fade-in-up">
      <InputField label="Your Full Name" value={formData.fullName} onChange={(val) => updateData({ fullName: val })} required />
      <InputField label="Email Address" value={formData.email} onChange={(val) => updateData({ email: val })} type="email" required />
      <InputField label="Company Name" value={formData.companyName} onChange={(val) => updateData({ companyName: val })} required />
      <InputField label="Company URL" value={formData.companyUrl} onChange={(val) => updateData({ companyUrl: val })} required />
      <InputField label="Phone Number" value={formData.phone} onChange={(val) => updateData({ phone: val })} />
      <input name="company_fax" value={formData._honeypot || ''} onChange={(e) => updateData({ _honeypot: e.target.value })} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
      <NextButton onClick={onNext} disabled={!isValid} />
    </div>
  );
};

const Step2: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const startTimeRef = useRef<number>(Date.now());
  useEffect(() => { startTimeRef.current = Date.now(); updateData({ _step2StartTime: startTimeRef.current }); }, []);
  const toggleSelection = (option: string) => {
    const current = formData.lookingFor;
    const newSelection = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    updateData({ lookingFor: newSelection });
  };
  const handleNext = () => { updateData({ _step2Duration: Date.now() - startTimeRef.current }); onNext(); };
  return (
    <div className="animate-fade-in-up">
      {LOOKING_FOR_OPTIONS.map((opt) => (<CheckboxButton key={opt} label={opt} isSelected={formData.lookingFor.includes(opt)} onToggle={() => toggleSelection(opt)} />))}
      <NextButton onClick={handleNext} disabled={formData.lookingFor.length === 0} />
    </div>
  );
};

const Step3: React.FC<StepProps> = ({ formData, updateData, onNext, isMobile }) => {
  const isValid = formData.currentWebsite && formData.teamSituation && formData.trafficReality;
  return (
    <div className="animate-fade-in-up">
      <SelectDropdown label="Current website:" options={CURRENT_WEBSITE_OPTIONS} value={formData.currentWebsite} onChange={(val) => updateData({ currentWebsite: val })} isMobile={isMobile} />
      <SelectDropdown label="Team situation:" options={TEAM_SITUATION_OPTIONS} value={formData.teamSituation} onChange={(val) => updateData({ teamSituation: val })} isMobile={isMobile} />
      <SelectDropdown label="Traffic reality:" options={TRAFFIC_REALITY_OPTIONS} value={formData.trafficReality} onChange={(val) => updateData({ trafficReality: val })} isMobile={isMobile} />
      <NextButton onClick={onNext} disabled={!isValid} />
    </div>
  );
};

const Step4: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const toggleSelection = (option: string) => {
    const current = formData.hopingFor;
    const newSelection = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    updateData({ hopingFor: newSelection });
  };
  return (
    <div className="animate-fade-in-up">
      {HOPING_FOR_OPTIONS.map((opt) => (<CheckboxButton key={opt} label={opt} isSelected={formData.hopingFor.includes(opt)} onToggle={() => toggleSelection(opt)} />))}
      <NextButton onClick={onNext} disabled={formData.hopingFor.length === 0} />
    </div>
  );
};

const Step5: React.FC<StepProps> = ({ formData, updateData, onNext }) => (
  <div className="animate-fade-in-up" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <textarea
      style={{ width: '100%', backgroundColor: 'white', padding: '12px 20px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', color: '#1F2937', fontSize: '16px', minHeight: '140px', resize: 'none', boxSizing: 'border-box' }}
      placeholder="Anything about your business, goals, or concerns you think would be helpful context?"
      value={formData.anythingElse}
      onChange={(e) => updateData({ anythingElse: e.target.value })}
    />
    <NextButton onClick={onNext} />
  </div>
);

// Mobile Header Component
const MobileHeader: React.FC<{ currentStep: StepId }> = ({ currentStep }) => {
  const [showVideo, setShowVideo] = useState(false);
  const currentStepConfig = STEPS[currentStep];

  const isCompleted = currentStep > 0;
  const isPerspective = currentStep === 5;
  const showOrangeCheck = isCompleted || isPerspective;

  return (
    <div style={{ 
      backgroundColor: '#1C1C1C', 
      color: 'white', 
      width: '100%', 
      padding: '20px', 
      borderRadius: '16px',
      boxSizing: 'border-box'
    }}>
      {/* Step Indicator + Title + Checkbox Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        {/* Left: Step number indicator */}
        <span style={{ fontSize: '18px', fontWeight: 700, flexShrink: 0, marginRight: '12px', fontFamily: "'PP Neue Bit', monospace" }}>
          <span style={{ color: '#F97316' }}>{currentStepConfig.number}</span>
          <span style={{ color: '#6B7280', margin: '0 4px' }}>/</span>
          <span style={{ color: '#6B7280' }}>06</span>
        </span>
        
        {/* Middle: Step label */}
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentStepConfig.label}
        </span>
        
        {/* Right: Checkbox indicator */}
        {showOrangeCheck ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '20px', 
            height: '20px', 
            borderRadius: '50%', 
            backgroundColor: '#F97316', 
            flexShrink: 0, 
            marginLeft: '12px' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #4B5563', flexShrink: 0, marginLeft: '12px' }} />
        )}
      </div>

      {/* Watch Video Button */}
      <button 
        onClick={() => setShowVideo(!showVideo)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: '#9CA3AF', 
          fontSize: '14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <svg width="20" height="14" viewBox="0 0 128 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M69.7317 0C69.7317 0 69.8417 0.08 69.8617 0.1L76.8617 0.15L81.1317 0.22L96.4017 0.78C100.902 0.95 108.442 1.56 112.762 2.4C119.092 3.63 124.022 8.48 125.412 14.77C127.022 22.04 127.372 29.52 127.692 36.94L127.742 38.17L127.772 41.57L127.872 41.76V47.85L127.732 51.54L127.692 52.76C127.432 59.84 126.942 67.84 125.412 74.73C123.972 81.23 118.812 86.11 112.252 87.21C110.012 87.59 107.842 87.94 105.552 88.08L92.6017 88.9L69.8417 89.47H58.0217C49.6617 89.47 41.3917 89.37 33.0617 88.79L21.4817 87.99C19.4317 87.85 17.5217 87.52 15.5317 87.18C8.97172 86.06 3.84172 81.14 2.43172 74.64C1.86172 72.02 1.44172 69.44 1.14172 66.74C0.581719 61.63 0.221719 56.59 0.121719 51.45L0.0417187 47.79C0.00171875 45.76 0.00171875 43.74 0.0417187 41.7L0.121719 38.04C0.231719 32.9 0.581719 27.86 1.15172 22.75C1.45172 20.04 1.87172 17.47 2.44172 14.85C3.84172 8.4 8.92172 3.48 15.4417 2.34C17.4317 1.99 19.3517 1.66 21.3917 1.52L32.6817 0.73L46.7317 0.22L50.9917 0.15C53.4017 0.11 55.7917 0.25 58.1417 0L69.7317 0ZM84.3717 44.75L51.1317 25.58V63.94L84.3717 44.76V44.75Z"/>
        </svg>
        <span>Watch intro video</span>
      </button>

      {/* Expandable Video Section */}
      {showVideo && (
        <div style={{ marginTop: '16px', width: '100%', aspectRatio: '16/9', backgroundColor: '#111', borderRadius: '12px', overflow: 'hidden' }}>
          <video 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            controls
            autoPlay
            playsInline
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

// Sidebar Component (Desktop)
const Sidebar: React.FC<{ currentStep: StepId }> = ({ currentStep }) => (
  <div style={{ backgroundColor: '#1C1C1C', color: 'white', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '40px', borderRadius: '24px', overflow: 'hidden', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isPerspective = step.id === 5;
        const showCheck = isCompleted || (isPerspective && isActive);
        return (
          <React.Fragment key={step.id}>
            {step.id === 5 && <div style={{ borderTop: '1px solid #374151', margin: '16px 0' }} />}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '16px', fontWeight: 500, color: isPerspective && isActive ? '#F97316' : isActive ? 'white' : isCompleted ? '#D1D5DB' : '#4B5563' }}>{step.label}</span>
              {showCheck ? (
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              ) : (
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `1px solid ${isActive ? 'rgba(249,115,22,0.5)' : '#374151'}` }} />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

// Main Component
const initialFormData: FormData = {
  fullName: '', email: '', companyName: '', companyUrl: '', phone: '',
  lookingFor: [], currentWebsite: '', teamSituation: '', trafficReality: '',
  hopingFor: [], anythingElse: '',
};

const ChoquerContact: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [summary, setSummary] = useState<AiSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile(768);

  const updateData = (data: Partial<FormData>) => setFormData((prev) => ({ ...prev, ...data }));

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as StepId);
    } else if (currentStep === 4) {
      setIsLoading(true);
      setCurrentStep(5);
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const [result] = await Promise.all([
          fetch(`${API_BASE_URL}/api/generate-summary`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).then(res => res.json()),
          minLoadingTime
        ]);
        setSummary(result);
      } catch (error) {
        console.error('Error generating summary:', error);
        await minLoadingTime;
        setSummary({ situationAnalysis: "Most companies in your position are dealing with fragmented digital presence.", mistake: "Teams often get stuck between wanting quick results and needing foundational work.", nextStep: "The next step is clarity around an integrated strategy." });
      } finally { setIsLoading(false); }
    }
  };

  const currentStepConfig = STEPS[currentStep];
  const isPerspectiveStep = currentStep === 5;

  const renderStep = () => {
    const stepProps = { formData, updateData, onNext: handleNext, isMobile };
    switch (currentStep) {
      case 0: return <Step1 {...stepProps} />;
      case 1: return <Step2 {...stepProps} />;
      case 2: return <Step3 {...stepProps} />;
      case 3: return <Step4 {...stepProps} />;
      case 4: return <Step5 {...stepProps} />;
      case 5: return (
        <div className="animate-fade-in-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div style={{ width: '64px', height: '64px', border: '4px solid #F97316', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '24px' }}></div>
              <p style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 500, color: '#1F2937', marginBottom: '8px' }}>Analyzing your plan...</p>
              <p style={{ color: '#6B7280' }}>This will only take a moment</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : summary ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
              <p style={{ fontSize: isMobile ? '20px' : '32px', fontWeight: 500, color: '#1F2937', lineHeight: 1.3 }}>Based on what you shared...</p>
              <p style={{ fontSize: isMobile ? '20px' : '32px', fontWeight: 500, color: '#1F2937', lineHeight: 1.3 }}>{summary.situationAnalysis}</p>
              <p style={{ fontSize: isMobile ? '20px' : '32px', fontWeight: 500, color: '#1F2937', lineHeight: 1.3 }}>{summary.mistake}</p>
              <p style={{ fontSize: isMobile ? '20px' : '32px', fontWeight: 500, color: '#1F2937', lineHeight: 1.3 }}>{summary.nextStep}</p>
              <div style={{ paddingTop: '16px' }}>
                <a href="https://cal.com/brycechoquer/discovery" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#F97316', color: 'white', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none' }}>
                  <span style={{ fontWeight: 500 }}>Schedule A Call w/ Bryce</span>
                  <div style={{ backgroundColor: 'black', padding: '4px', borderRadius: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row', 
      fontFamily: "'PP Neue Montreal', sans-serif",
      overflow: isMobile ? 'auto' : 'hidden'
    }}>
      {/* Mobile Header - Only on mobile */}
      {isMobile && (
        <div style={{ padding: '12px', flexShrink: 0 }}>
          <MobileHeader currentStep={currentStep} />
        </div>
      )}

      {/* Desktop Sidebar - Only on desktop */}
      {!isMobile && (
        <div style={{ width: '30%', padding: '16px', flexShrink: 0, height: '100vh', boxSizing: 'border-box' }}>
          <Sidebar currentStep={currentStep} />
        </div>
      )}

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        padding: isMobile ? '0 12px 12px 12px' : '16px 16px 16px 0', 
        boxSizing: 'border-box',
        minHeight: isMobile ? 'auto' : undefined
      }}>
        <div 
          className="custom-scrollbar" 
          style={{ 
            flex: 1, 
            backgroundColor: '#F8F8F8', 
            borderRadius: isMobile ? '16px' : '24px', 
            padding: isMobile ? '20px' : '48px', 
            overflow: 'auto' 
          }}
        >
          <div style={{ maxWidth: isPerspectiveStep ? '896px' : '672px' }}>
            {!isPerspectiveStep && (
              <>
                <div style={{ marginBottom: isMobile ? '20px' : '24px' }}>
                  <h1 style={{ 
                    fontSize: isMobile ? '24px' : '48px', 
                    fontWeight: 500, 
                    color: '#1F2937', 
                    marginBottom: isMobile ? '8px' : '12px', 
                    lineHeight: 1.1 
                  }}>
                    Let's understand where you are and where you want to go.
                  </h1>
                  <p style={{ 
                    color: '#6B7280', 
                    fontSize: isMobile ? '14px' : '18px', 
                    lineHeight: 1.6 
                  }}>
                    This short walkthrough helps us understand your business, your challenges, and what success looks like for you.
                  </p>
                </div>
                <div style={{ 
                  marginBottom: '16px', 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: isMobile ? '12px' : '16px' 
                }}>
                  <span style={{ 
                    color: '#F97316', 
                    fontSize: isMobile ? '32px' : '58px', 
                    fontWeight: 700,
                    fontFamily: "'PP Neue Bit', monospace"
                  }}>
                    {currentStepConfig.number}
                  </span>
                  <h2 style={{ 
                    fontSize: isMobile ? '20px' : '36px', 
                    fontWeight: 500, 
                    color: '#1F2937' 
                  }}>
                    {currentStepConfig.title}
                  </h2>
                </div>
              </>
            )}
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoquerContact;
