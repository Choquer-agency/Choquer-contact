export interface FormData {
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
  }
  
  export type StepId = 0 | 1 | 2 | 3 | 4 | 5; // 5 is the summary/result view
  
  export interface SelectOption {
    label: string;
    value: string;
  }
  
  export interface StepConfig {
    id: StepId;
    label: string;
    number: string; // "01", "02" etc
    title: string;
  }
  
  export interface AiSummary {
    situationAnalysis: string;
    mistake: string;
    nextStep: string;
  }
