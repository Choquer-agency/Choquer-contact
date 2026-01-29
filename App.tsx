import React, { useState, useCallback } from 'react';
import { Sidebar, MobileHeader } from './Sidebar';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps';
import { FormData, StepId, AiSummary } from './types';
import { STEPS } from './constants';
import { generateSummary } from './ClaudeService';
import { useLeadTracker } from './LeadTracker';

const initialFormData: FormData = {
  fullName: '',
  email: '',
  companyName: '',
  companyUrl: '',
  phone: '',
  lookingFor: [],
  currentWebsite: '',
  teamSituation: '',
  trafficReality: '',
  hopingFor: [],
  anythingElse: '',
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [summary, setSummary] = useState<AiSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lead tracking - captures form data at every step
  const { saveFormData, submitLead } = useLeadTracker({
    initialFormData,
    onRestoreSession: useCallback((restoredData: FormData, restoredStep: StepId) => {
      // Restore session for returning users
      setFormData(restoredData);
      setCurrentStep(restoredStep);
    }, []),
  });

  const updateData = (data: Partial<FormData>) => {
    setFormData((prev) => {
      const newData = { ...prev, ...data };
      // Save to lead tracker on every change
      saveFormData(newData, currentStep);
      return newData;
    });
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      const nextStep = (currentStep + 1) as StepId;
      setCurrentStep(nextStep);
      // Save progress when moving to next step
      saveFormData(formData, nextStep);
    } else if (currentStep === 4) {
      // Moving to summary - generate AI response first, then submit lead with summary
      setIsLoading(true);
      setCurrentStep(5);
      
      // Minimum loading time for UX
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      
      let generatedSummary: AiSummary;
      
      try {
        const [result] = await Promise.all([
          generateSummary(formData),
          minLoadingTime
        ]);
        generatedSummary = result;
        setSummary(result);
      } catch (error) {
        console.error('Error generating summary:', error);
        await minLoadingTime;
        generatedSummary = {
          situationAnalysis: "Most companies in your position are dealing with fragmented digital presence, which usually points to misalignment between business growth and web infrastructure.",
          mistake: "What we often see at this stage is teams getting stuck in the tension between wanting quick results and needing foundational work, even when they know what they want to improve.",
          nextStep: "If that resonates, the next step isn't a tactical fix — it's clarity around an integrated strategy, so everything works together."
        };
        setSummary(generatedSummary);
      } finally {
        setIsLoading(false);
      }
      
      // Submit lead as completed with the AI summary included
      submitLead('completed', generatedSummary);
    }
  };

  const currentStepConfig = STEPS[currentStep];

  const renderStep = () => {
    const stepProps = {
      formData,
      updateData,
      onNext: handleNext,
      isActive: true,
    };

    switch (currentStep) {
      case 0:
        return <Step1 {...stepProps} />;
      case 1:
        return <Step2 {...stepProps} />;
      case 2:
        return <Step3 {...stepProps} />;
      case 3:
        return <Step4 {...stepProps} />;
      case 4:
        return <Step5 {...stepProps} />;
      case 5:
        return (
          <div className="animate-fade-in-up h-full flex-1 flex flex-col justify-center min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-xl md:text-2xl font-medium text-gray-900 mb-2">Analyzing your plan...</p>
                <p className="text-gray-500">This will only take a moment</p>
              </div>
            ) : summary ? (
              <div className="space-y-4 md:space-y-6">
                <p className="text-xl md:text-[32px] font-medium text-gray-900 leading-snug">
                  Based on what you shared...
                </p>
                
                <p className="text-xl md:text-[32px] font-medium text-gray-900 leading-snug">
                  {summary.situationAnalysis}
                </p>
                
                <p className="text-xl md:text-[32px] font-medium text-gray-900 leading-snug">
                  {summary.mistake}
                </p>
                
                <p className="text-xl md:text-[32px] font-medium text-gray-900 leading-snug">
                  {summary.nextStep}
                </p>

                <div className="pt-4">
                  <a 
                    href="https://cal.com/brycechoquer/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-between overflow-clip transition-all duration-200
                      py-[0.375rem] pr-[0.5rem] pl-[1.25rem] gap-[1.25rem] rounded
                      bg-brand-orange text-white cursor-pointer"
                  >
                    {/* Expanding background on hover */}
                    <div className="absolute right-[0.5rem] w-0 h-[2.375rem] bg-orange-600 rounded transition-all duration-300 ease-out group-hover:w-[calc(100%-0.75rem)] group-hover:right-[0.375rem]" />
                    
                    <span className="relative z-[2] font-medium transition-transform duration-500 group-hover:translate-x-1">Schedule A Call w/ Bryce</span>
                    
                    <div className="relative z-[2] flex items-center justify-center w-[2.75rem] h-[2.375rem] bg-black text-white rounded transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        );
      default:
        return null;
    }
  };

  const isPerspectiveStep = currentStep === 5;

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col md:flex-row md:h-screen overflow-x-hidden">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden p-3">
        <MobileHeader currentStep={currentStep} />
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block md:w-[35%] lg:w-[30%] xl:w-[28%] p-3 md:p-4 flex-shrink-0 h-screen">
        <Sidebar currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden px-4 pb-4 md:py-4 md:pr-4 md:pl-0 safe-area-bottom safe-area-left safe-area-right">
        <div className={`flex-1 bg-[#F8F8F8] rounded-2xl md:rounded-3xl p-5 md:p-10 lg:p-12 ${isPerspectiveStep ? 'flex flex-col' : 'overflow-y-auto custom-scrollbar'}`}>
          <div className={isPerspectiveStep ? 'flex-1 flex flex-col max-w-4xl' : 'max-w-2xl'}>
            {/* Header - hidden on perspective step */}
            {!isPerspectiveStep && (
              <>
                <div className="mb-5 md:mb-6">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-2 md:mb-3 leading-tight">
                    Let's understand where you are and where you want to go.
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
                    This short walkthrough helps us understand your business, your challenges, and what success looks like for you. So our first conversation is focused, relevant, and useful.
                  </p>
                </div>

                {/* Step Number and Title */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-3 md:space-x-4">
                    <span className="font-pixel text-brand-orange text-[30px] md:text-[50px] lg:text-[56px]">
                      {currentStepConfig.number}
                    </span>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-900">
                      {currentStepConfig.title}
                    </h2>
                  </div>
                </div>
              </>
            )}

            {/* Dynamic Step Content */}
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
