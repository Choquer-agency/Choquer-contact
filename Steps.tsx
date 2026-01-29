import React, { useEffect, useRef } from 'react';
import { FormData } from './types';
import { LOOKING_FOR_OPTIONS, CURRENT_WEBSITE_OPTIONS, TEAM_SITUATION_OPTIONS, TRAFFIC_REALITY_OPTIONS, HOPING_FOR_OPTIONS } from './constants';

interface StepProps {
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  isActive: boolean;
}

// UI Components

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, required = false, type = "text" }) => (
  <div className="mb-2">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`${label}${required ? '*' : ''}`}
      className="w-full bg-white px-5 py-3 rounded border border-gray-200 focus:border-gray-300 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:shadow-md text-base"
    />
  </div>
);

interface SelectDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  openUpward?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ label, value, onChange, options, openUpward = false }) => (
  <div className="mb-3 flex flex-col md:flex-row md:items-center md:gap-6">
    <label className="text-gray-900 font-medium text-base md:text-lg md:w-44 md:flex-shrink-0 mb-1 md:mb-0">{label}</label>
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-white px-5 py-3 rounded border border-gray-200 focus:border-gray-300 focus:ring-0 outline-none text-gray-800 transition-all shadow-sm hover:shadow-md cursor-pointer text-base ${openUpward ? 'dropdown-upward' : ''}`}
        style={openUpward ? { position: 'relative' } : undefined}
      >
        <option value="" disabled>Select One</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
);

interface CheckboxButtonProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({ label, isSelected, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-full text-left px-5 py-3 rounded border mb-2 flex items-center justify-between transition-all duration-200 group
      ${isSelected 
        ? 'bg-white border-brand-orange shadow-md' 
        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
  >
    <span className={`text-base ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{label}</span>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isSelected ? 'bg-brand-orange' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
       {isSelected && (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
         </svg>
       )}
    </div>
  </button>
);

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="group mt-4 relative flex items-center gap-5 bg-brand-orange text-white pl-5 pr-1.5 py-1.5 rounded overflow-hidden transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {/* Expanding background on hover */}
    <div className="absolute right-3 w-0 h-[2.375rem] bg-orange-600 rounded transition-all duration-300 ease-out group-hover:w-[calc(100%-0.75rem)] group-hover:right-[0.375rem]" />
    
    <span className="relative z-10 font-medium text-base transition-transform duration-500 group-hover:translate-x-0.5">Next</span>
    
    {/* Arrow box matching Webflow dimensions */}
    <div className="relative z-10 flex items-center justify-center w-11 h-[2.375rem] bg-black text-white rounded transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </button>
);


// --- Step Implementations ---

export const Step1: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const isValid = formData.fullName && formData.email && formData.companyName && formData.companyUrl;

  return (
    <div className="animate-fade-in-up">
      <InputField label="Your Full Name" value={formData.fullName} onChange={(val) => updateData({ fullName: val })} required />
      <InputField label="Email Address" value={formData.email} onChange={(val) => updateData({ email: val })} type="email" required />
      <InputField label="Company Name" value={formData.companyName} onChange={(val) => updateData({ companyName: val })} required />
      <InputField label="Company URL" value={formData.companyUrl} onChange={(val) => updateData({ companyUrl: val })} required />
      <InputField label="Phone Number" value={formData.phone} onChange={(val) => updateData({ phone: val })} />
      
      {/* Honeypot field - invisible to humans, bots will fill it */}
      <input
        name="company_fax"
        value={formData._honeypot || ''}
        onChange={(e) => updateData({ _honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
      />
      
      <NextButton onClick={onNext} disabled={!isValid} />
    </div>
  );
};

export const Step2: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const startTimeRef = useRef<number>(Date.now());
  
  // Record when Step 2 starts
  useEffect(() => {
    startTimeRef.current = Date.now();
    updateData({ _step2StartTime: startTimeRef.current });
  }, []);

  const toggleSelection = (option: string) => {
    const current = formData.lookingFor;
    const newSelection = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    updateData({ lookingFor: newSelection });
  };

  const handleNext = () => {
    // Calculate duration spent on Step 2
    const duration = Date.now() - startTimeRef.current;
    updateData({ _step2Duration: duration });
    onNext();
  };

  return (
    <div className="animate-fade-in-up">
      {LOOKING_FOR_OPTIONS.map((opt) => (
        <CheckboxButton 
          key={opt} 
          label={opt} 
          isSelected={formData.lookingFor.includes(opt)} 
          onToggle={() => toggleSelection(opt)} 
        />
      ))}
      <NextButton onClick={handleNext} disabled={formData.lookingFor.length === 0} />
    </div>
  );
};

export const Step3: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  const isValid = formData.currentWebsite && formData.teamSituation && formData.trafficReality;

  return (
    <div className="animate-fade-in-up">
      <SelectDropdown 
        label="Current website:" 
        options={CURRENT_WEBSITE_OPTIONS} 
        value={formData.currentWebsite} 
        onChange={(val) => updateData({ currentWebsite: val })} 
      />
      <SelectDropdown 
        label="Team situation:" 
        options={TEAM_SITUATION_OPTIONS} 
        value={formData.teamSituation} 
        onChange={(val) => updateData({ teamSituation: val })} 
      />
      <SelectDropdown 
        label="Traffic reality:" 
        options={TRAFFIC_REALITY_OPTIONS} 
        value={formData.trafficReality} 
        onChange={(val) => updateData({ trafficReality: val })}
        openUpward={true}
      />
      <NextButton onClick={onNext} disabled={!isValid} />
    </div>
  );
};

export const Step4: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
    const toggleSelection = (option: string) => {
    const current = formData.hopingFor;
    const newSelection = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    updateData({ hopingFor: newSelection });
  };

  return (
    <div className="animate-fade-in-up">
      {HOPING_FOR_OPTIONS.map((opt) => (
         <CheckboxButton 
         key={opt} 
         label={opt} 
         isSelected={formData.hopingFor.includes(opt)} 
         onToggle={() => toggleSelection(opt)} 
       />
      ))}
      <NextButton onClick={onNext} disabled={formData.hopingFor.length === 0} />
    </div>
  );
};

export const Step5: React.FC<StepProps> = ({ formData, updateData, onNext }) => {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <textarea
        className="w-full bg-white px-5 py-3 rounded border border-gray-200 focus:border-gray-300 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 transition-all shadow-sm hover:shadow-md text-base min-h-[140px] resize-none"
        placeholder="Anything about your business, goals, or concerns you think would be helpful context?"
        value={formData.anythingElse}
        onChange={(e) => updateData({ anythingElse: e.target.value })}
      />
      <p className="mt-4 text-gray-500 text-sm">Ready to see your personalized analysis? Click next to begin.</p>
      <NextButton onClick={onNext} />
    </div>
  );
};
