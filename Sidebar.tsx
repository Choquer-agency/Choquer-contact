import React, { useState } from 'react';
import { StepId } from './types';
import { STEPS } from './constants';

interface SidebarProps {
  currentStep: StepId;
}

interface MobileHeaderProps {
  currentStep: StepId;
}

// Mobile Header Component - Compact header for mobile devices
export const MobileHeader: React.FC<MobileHeaderProps> = ({ currentStep }) => {
  const [showVideo, setShowVideo] = useState(false);
  const currentStepConfig = STEPS[currentStep];

  const isCompleted = currentStep > 0;
  const isPerspective = currentStep === 5;
  const showOrangeCheck = isCompleted || isPerspective;

  return (
    <div className="bg-brand-dark text-white w-full p-5 safe-area-top safe-area-left safe-area-right relative rounded-2xl">
      {/* Logo */}
      <div className="mb-6">
        <svg className="h-[18px] w-auto" viewBox="0 0 296 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 29.5203)" fill="#FF9500"/>
          <rect x="18.7579" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 18.7579 27.4626)" fill="#FF9500"/>
          <rect x="17.729" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 17.729 27.4626)" fill="#FF9500"/>
          <rect x="16.7001" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 16.7001 27.4626)" fill="#FF9500"/>
          <rect x="15.6711" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 15.6711 27.4626)" fill="#FF9500"/>
          <rect x="14.6423" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 14.6423 27.4626)" fill="#FF9500"/>
          <rect x="13.6134" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 13.6134 27.4626)" fill="#FF9500"/>
          <rect x="13.6134" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 13.6134 26.4338)" fill="#FF9500"/>
          <rect x="12.5845" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 12.5845 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 11.5555 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 11.5555 25.4053)" fill="#FF9500"/>
          <rect x="10.5266" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 10.5266 25.4053)" fill="#FF9500"/>
          <rect x="10.5266" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 10.5266 24.3765)" fill="#FF9500"/>
          <rect x="9.4978" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 9.4978 24.3765)" fill="#FF9500"/>
          <rect x="8.46887" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 8.46887 24.3765)" fill="#FF9500"/>
          <rect x="8.46887" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 8.46887 23.3479)" fill="#FF9500"/>
          <rect x="7.43994" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 7.43994 23.3479)" fill="#FF9500"/>
          <rect x="7.43994" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 7.43994 22.3191)" fill="#FF9500"/>
          <rect x="7.43994" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 7.43994 21.2903)" fill="#FF9500"/>
          <rect x="6.41101" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 6.41101 21.2903)" fill="#FF9500"/>
          <rect x="5.38208" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 5.38208 21.2903)" fill="#FF9500"/>
          <rect x="5.38208" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 5.38208 22.3191)" fill="#FF9500"/>
          <rect x="5.38208" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 5.38208 23.3479)" fill="#FF9500"/>
          <rect x="6.41101" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 6.41101 22.3191)" fill="#FF9500"/>
          <rect x="6.41101" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 6.41101 23.3479)" fill="#FF9500"/>
          <rect x="6.41101" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 6.41101 24.3765)" fill="#FF9500"/>
          <rect x="7.43994" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 7.43994 24.3765)" fill="#FF9500"/>
          <rect x="7.43994" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 7.43994 25.4053)" fill="#FF9500"/>
          <rect x="8.46887" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 8.46887 25.4053)" fill="#FF9500"/>
          <rect x="9.4978" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 9.4978 25.4053)" fill="#FF9500"/>
          <rect x="9.4978" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 9.4978 26.4338)" fill="#FF9500"/>
          <rect x="10.5266" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 10.5266 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 11.5555 27.4626)" fill="#FF9500"/>
          <rect x="12.5845" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 12.5845 27.4626)" fill="#FF9500"/>
          <rect x="12.5845" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 12.5845 28.4915)" fill="#FF9500"/>
          <rect x="13.6134" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 13.6134 28.4915)" fill="#FF9500"/>
          <rect x="14.6423" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 14.6423 28.4915)" fill="#FF9500"/>
          <rect x="14.6423" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 14.6423 29.5203)" fill="#FF9500"/>
          <rect x="15.6711" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 15.6711 28.4915)" fill="#FF9500"/>
          <rect x="15.6711" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 15.6711 29.5203)" fill="#FF9500"/>
          <rect x="16.7001" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 16.7001 28.4915)" fill="#FF9500"/>
          <rect x="16.7001" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 16.7001 29.5203)" fill="#FF9500"/>
          <rect x="17.729" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 17.729 28.4915)" fill="#FF9500"/>
          <rect x="17.729" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 17.729 29.5203)" fill="#FF9500"/>
          <rect x="18.7579" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 18.7579 28.4915)" fill="#FF9500"/>
          <rect x="18.7579" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 18.7579 29.5203)" fill="#FF9500"/>
          <rect x="5.14453" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="5.14453" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="5.14453" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="6.17346" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="6.17346" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="4.11572" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="4.11572" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="7.20239" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="7.20239" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="8.23132" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="8.23132" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="9.26025" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="9.26025" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="11.318" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="11.318" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="15.4336" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="15.4336" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 0 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 0 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 6.17346 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 6.17346 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 4.11572 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 4.11572 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 7.20239 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 7.20239 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 8.23132 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 8.23132 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 9.26025 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 9.26025 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 11.318 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 11.318 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 15.4336 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 15.4336 8.62695)" fill="#FF9500"/>
          <rect x="24.4149" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="24.4149" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="13.7708" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="13.7708" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="34.704" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="23.386" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="23.386" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="24.4149" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 1.42603)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 1.42603)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 34.704 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.386 7.59839)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.386 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 7.59839)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 7.59839)" fill="#FF9500"/>
          <path d="M283.31 7.01611L288.142 20.7833L293.106 7.01611H295.787L289.035 24.7878C287.679 28.3619 286.752 29.5202 283.873 29.5202H281.986V27.3691H283.31C285.163 27.3691 285.759 27.0051 286.884 23.8942L280.497 7.01611H283.31Z" fill="white"/>
          <path d="M279.684 18.3673C278.824 22.107 276.21 24.2912 272.337 24.2912C267.44 24.2912 264.196 20.5516 264.196 15.455C264.196 10.4247 267.406 6.68506 272.304 6.68506C276.21 6.68506 278.824 8.90238 279.684 12.6089H276.938C276.342 10.16 274.786 8.83619 272.304 8.83619C268.929 8.83619 266.976 11.6161 266.976 15.455C266.976 19.3271 268.962 22.1401 272.337 22.1401C274.952 22.1401 276.342 20.6509 276.938 18.3673H279.684Z" fill="white"/>
          <path d="M247.478 7.016H250.06V9.86211C250.887 8.24049 252.542 6.68506 255.619 6.68506C259.26 6.68506 261.179 8.77 261.179 12.0794V23.8941H258.598V12.5097C258.598 10.1931 257.506 8.83619 254.726 8.83619C252.145 8.83619 250.06 10.8218 250.06 14.0651V23.8941H247.478V7.016Z" fill="white"/>
          <path d="M228.29 15.455C228.29 10.4247 231.434 6.68506 236.398 6.68506C241.528 6.68506 244.606 10.888 244.374 15.9846H231.07C231.202 19.658 233.122 22.1401 236.531 22.1401C239.211 22.1401 240.634 20.5185 241.296 18.5328H244.043C243.083 21.9084 240.436 24.2912 236.531 24.2912C231.533 24.2912 228.29 20.5516 228.29 15.455ZM241.594 13.9327C241.098 10.888 239.31 8.83619 236.398 8.83619C233.453 8.83619 231.633 10.8549 231.169 13.9327H241.594Z" fill="white"/>
          <path d="M217.91 29.9173C213.64 29.9173 211.092 27.733 210.596 24.8869H213.309C213.74 26.6078 215.163 27.8323 217.91 27.8323C221.02 27.8323 222.576 26.2769 222.576 23.0006V20.7501C221.484 22.7027 219.63 23.6955 217.148 23.6955C212.78 23.6955 209.934 20.1213 209.934 15.1572C209.934 10.2592 212.78 6.68506 217.148 6.68506C219.63 6.68506 221.484 7.81027 222.576 9.76283V7.016H225.157V22.471C225.157 27.1704 222.973 29.9173 217.91 29.9173ZM217.678 21.5444C220.855 21.5444 222.642 18.8638 222.642 15.1572C222.642 11.5168 220.855 8.83619 217.678 8.83619C214.501 8.83619 212.714 11.5168 212.714 15.1572C212.714 18.8638 214.501 21.5444 217.678 21.5444Z" fill="white"/>
          <path d="M206.066 23.8942L203.782 17.3746H193.49L191.174 23.8942H188.261L196.866 0.397217H200.506L209.111 23.8942H206.066ZM194.317 14.9587H202.922L198.62 2.78001L194.317 14.9587Z" fill="white"/>
          <path d="M183.076 19.9951V23.8942H179.149V19.9951H183.076Z" fill="white"/>
          <path d="M175.871 7.01611H177.029V10.7889H175.407C172.594 10.7889 171.072 11.881 171.039 15.3228V23.8942H166.869V7.01611H170.94V10.1601C171.568 8.47226 173.157 7.01611 175.871 7.01611Z" fill="white"/>
          <path d="M147.458 15.4548C147.458 10.4245 150.867 6.68481 156.029 6.68481C161.325 6.68481 164.601 10.8216 164.402 16.3814H151.76C151.926 19.4592 153.514 21.3125 156.129 21.3125C158.214 21.3125 159.372 20.088 159.901 18.5326H164.071C163.145 21.8089 160.398 24.291 156.096 24.291C150.933 24.291 147.458 20.5513 147.458 15.4548ZM160.166 13.767C159.769 11.2849 158.346 9.63021 156.029 9.63021C153.713 9.63021 152.257 11.2518 151.893 13.767H160.166Z" fill="white"/>
          <path d="M135.486 24.2913C131.978 24.2913 129.992 22.0409 129.992 18.566V7.01611H134.162V17.6725C134.162 19.7243 135.023 20.9819 137.174 20.9819C139.259 20.9819 140.781 19.2941 140.781 16.6466V7.01611H144.951V23.8942H140.847V21.1805C139.921 22.8352 138.332 24.2913 135.486 24.2913Z" fill="white"/>
          <path d="M122.571 21.2794C121.579 23.1327 119.791 24.291 117.376 24.291C113.073 24.291 110.26 20.5844 110.26 15.4879C110.26 10.3583 113.073 6.68481 117.376 6.68481C119.791 6.68481 121.579 7.87621 122.571 9.6964V7.01576H126.741V29.5199H122.571V21.2794ZM118.699 21.1801C121.248 21.1801 122.671 18.8635 122.671 15.4879C122.671 12.1454 121.248 9.79568 118.699 9.79568C116.151 9.79568 114.728 12.1454 114.728 15.4879C114.728 18.8635 116.151 21.1801 118.699 21.1801Z" fill="white"/>
          <path d="M99.9904 24.291C94.8277 24.291 91.4189 20.5513 91.4189 15.4548C91.4189 10.4245 94.8277 6.68481 99.9904 6.68481C105.153 6.68481 108.562 10.4245 108.562 15.4548C108.562 20.5513 105.153 24.291 99.9904 24.291ZM99.9904 21.2463C102.638 21.2463 104.127 18.8635 104.127 15.4548C104.127 12.0792 102.638 9.72949 99.9904 9.72949C97.3428 9.72949 95.8536 12.0792 95.8536 15.4548C95.8536 18.8635 97.3428 21.2463 99.9904 21.2463Z" fill="white"/>
          <path d="M73.89 0.397217H78.0599V9.76291C78.9534 8.14129 80.6082 6.68513 83.4874 6.68513C87.1277 6.68513 89.0472 8.90246 89.0472 12.3443V23.8942H84.8442V13.2709C84.8442 11.2191 84.0169 9.96147 81.7665 9.96147C79.6153 9.96147 78.0599 11.6493 78.0599 14.2968V23.8942H73.89V0.397217Z" fill="white"/>
          <path d="M61.2166 24.2912C54.2668 24.2912 49.7329 19.294 49.7329 12.1456C49.7329 4.99724 54.2668 0 61.2166 0C66.8758 0 70.5161 3.57419 71.4759 8.1743H66.8096C66.2139 5.65913 64.2613 3.87204 61.2166 3.87204C56.9144 3.87204 54.3992 7.31384 54.3992 12.1456C54.3992 16.9774 56.9144 20.4192 61.2166 20.4192C64.4599 20.4192 66.2139 18.6321 66.8096 16.1169H71.4759C70.5492 20.717 67.0412 24.2912 61.2166 24.2912Z" fill="white"/>
        </svg>
      </div>

      {/* Step Indicator + Title + Checkbox Row */}
      <div className="flex items-center justify-between mb-3">
        {/* Left: Step number indicator */}
        <span className="text-lg font-pixel flex-shrink-0 mr-3">
          <span className="text-brand-orange">{currentStepConfig.number}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-gray-500">06</span>
        </span>
        
        {/* Middle: Step label */}
        <span className="text-white text-sm font-medium truncate flex-1">
          {currentStepConfig.label}
        </span>
        
        {/* Right: Checkbox indicator */}
        {showOrangeCheck ? (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-orange text-white flex-shrink-0 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-gray-600 flex-shrink-0 ml-3" />
        )}
      </div>

      {/* Play Video Button */}
      <button 
        onClick={() => setShowVideo(!showVideo)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
      >
        {/* YouTube-style icon */}
        <svg className="w-5 h-auto" viewBox="0 0 128 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M69.7317 0C69.7317 0 69.8417 0.08 69.8617 0.1L76.8617 0.15L81.1317 0.22L96.4017 0.78C100.902 0.95 108.442 1.56 112.762 2.4C119.092 3.63 124.022 8.48 125.412 14.77C127.022 22.04 127.372 29.52 127.692 36.94L127.742 38.17L127.772 41.57L127.872 41.76V47.85L127.732 51.54L127.692 52.76C127.432 59.84 126.942 67.84 125.412 74.73C123.972 81.23 118.812 86.11 112.252 87.21C110.012 87.59 107.842 87.94 105.552 88.08L92.6017 88.9L69.8417 89.47H58.0217C49.6617 89.47 41.3917 89.37 33.0617 88.79L21.4817 87.99C19.4317 87.85 17.5217 87.52 15.5317 87.18C8.97172 86.06 3.84172 81.14 2.43172 74.64C1.86172 72.02 1.44172 69.44 1.14172 66.74C0.581719 61.63 0.221719 56.59 0.121719 51.45L0.0417187 47.79C0.00171875 45.76 0.00171875 43.74 0.0417187 41.7L0.121719 38.04C0.231719 32.9 0.581719 27.86 1.15172 22.75C1.45172 20.04 1.87172 17.47 2.44172 14.85C3.84172 8.4 8.92172 3.48 15.4417 2.34C17.4317 1.99 19.3517 1.66 21.3917 1.52L32.6817 0.73L46.7317 0.22L50.9917 0.15C53.4017 0.11 55.7917 0.25 58.1417 0L69.7317 0ZM84.3717 44.75L51.1317 25.58V63.94L84.3717 44.76V44.75Z"/>
        </svg>
        <span>Watch intro video</span>
      </button>

      {/* Expandable Video Section */}
      {showVideo && (
        <div className="mt-4 w-full aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
          <video 
            className="w-full h-full object-cover"
            controls
            autoPlay
            poster="https://picsum.photos/id/4/800/600"
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

// Desktop Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  return (
    <div className="bg-brand-dark text-white w-full h-full flex flex-col p-6 md:p-10 relative rounded-2xl md:rounded-3xl overflow-hidden justify-between">
      {/* Logo */}
      <div className="mb-8 flex-shrink-0">
        <svg className="h-[18px] md:h-6 w-auto" viewBox="0 0 296 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 21.2903)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.1337 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 22.3191)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 23.3479)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.1047 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 24.3765)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.0759 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.047 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 25.4053)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.0181 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.9891 26.4338)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.9602 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 27.4626)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.9314 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.9025 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 22.8735 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 21.8446 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 20.8157 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 19.7869 29.5203)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 28.4915)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 18.7579 29.5203)" fill="#FF9500"/>
          <rect x="18.7579" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 18.7579 27.4626)" fill="#FF9500"/>
          <rect x="17.729" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 17.729 27.4626)" fill="#FF9500"/>
          <rect x="16.7001" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 16.7001 27.4626)" fill="#FF9500"/>
          <rect x="15.6711" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 15.6711 27.4626)" fill="#FF9500"/>
          <rect x="14.6423" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 14.6423 27.4626)" fill="#FF9500"/>
          <rect x="13.6134" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 13.6134 27.4626)" fill="#FF9500"/>
          <rect x="13.6134" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 13.6134 26.4338)" fill="#FF9500"/>
          <rect x="12.5845" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 12.5845 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 11.5555 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 11.5555 25.4053)" fill="#FF9500"/>
          <rect x="10.5266" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 10.5266 25.4053)" fill="#FF9500"/>
          <rect x="10.5266" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 10.5266 24.3765)" fill="#FF9500"/>
          <rect x="9.4978" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 9.4978 24.3765)" fill="#FF9500"/>
          <rect x="8.46887" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 8.46887 24.3765)" fill="#FF9500"/>
          <rect x="8.46887" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 8.46887 23.3479)" fill="#FF9500"/>
          <rect x="7.43994" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 7.43994 23.3479)" fill="#FF9500"/>
          <rect x="7.43994" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 7.43994 22.3191)" fill="#FF9500"/>
          <rect x="7.43994" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 7.43994 21.2903)" fill="#FF9500"/>
          <rect x="6.41101" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 6.41101 21.2903)" fill="#FF9500"/>
          <rect x="5.38208" y="21.2903" width="1.02891" height="1.02872" transform="rotate(180 5.38208 21.2903)" fill="#FF9500"/>
          <rect x="5.38208" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 5.38208 22.3191)" fill="#FF9500"/>
          <rect x="5.38208" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 5.38208 23.3479)" fill="#FF9500"/>
          <rect x="6.41101" y="22.3191" width="1.02891" height="1.02872" transform="rotate(180 6.41101 22.3191)" fill="#FF9500"/>
          <rect x="6.41101" y="23.3479" width="1.02891" height="1.02872" transform="rotate(180 6.41101 23.3479)" fill="#FF9500"/>
          <rect x="6.41101" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 6.41101 24.3765)" fill="#FF9500"/>
          <rect x="7.43994" y="24.3765" width="1.02891" height="1.02872" transform="rotate(180 7.43994 24.3765)" fill="#FF9500"/>
          <rect x="7.43994" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 7.43994 25.4053)" fill="#FF9500"/>
          <rect x="8.46887" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 8.46887 25.4053)" fill="#FF9500"/>
          <rect x="9.4978" y="25.4053" width="1.02891" height="1.02872" transform="rotate(180 9.4978 25.4053)" fill="#FF9500"/>
          <rect x="9.4978" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 9.4978 26.4338)" fill="#FF9500"/>
          <rect x="10.5266" y="26.4338" width="1.02891" height="1.02872" transform="rotate(180 10.5266 26.4338)" fill="#FF9500"/>
          <rect x="11.5555" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 11.5555 27.4626)" fill="#FF9500"/>
          <rect x="12.5845" y="27.4626" width="1.02891" height="1.02872" transform="rotate(180 12.5845 27.4626)" fill="#FF9500"/>
          <rect x="12.5845" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 12.5845 28.4915)" fill="#FF9500"/>
          <rect x="13.6134" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 13.6134 28.4915)" fill="#FF9500"/>
          <rect x="14.6423" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 14.6423 28.4915)" fill="#FF9500"/>
          <rect x="14.6423" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 14.6423 29.5203)" fill="#FF9500"/>
          <rect x="15.6711" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 15.6711 28.4915)" fill="#FF9500"/>
          <rect x="15.6711" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 15.6711 29.5203)" fill="#FF9500"/>
          <rect x="16.7001" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 16.7001 28.4915)" fill="#FF9500"/>
          <rect x="16.7001" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 16.7001 29.5203)" fill="#FF9500"/>
          <rect x="17.729" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 17.729 28.4915)" fill="#FF9500"/>
          <rect x="17.729" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 17.729 29.5203)" fill="#FF9500"/>
          <rect x="18.7579" y="28.4915" width="1.02891" height="1.02872" transform="rotate(180 18.7579 28.4915)" fill="#FF9500"/>
          <rect x="18.7579" y="29.5203" width="1.02891" height="1.02872" transform="rotate(180 18.7579 29.5203)" fill="#FF9500"/>
          <rect x="5.14453" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="5.14453" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="5.14453" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="3.08679" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="2.05786" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="1.02893" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="6.17346" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="6.17346" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="4.11572" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="4.11572" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="7.20239" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="7.20239" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="8.23132" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="8.23132" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="9.26025" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="9.26025" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="11.318" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="11.318" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="0.397461" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="10.2891" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="12.3469" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="1.42603" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="2.45459" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="13.3759" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="3.4834" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="4.51221" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="14.4048" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="15.4336" y="5.54102" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="15.4336" y="6.56982" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 5.14453 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 3.08679 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 2.05786 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 1.02893 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 0 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 0 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 6.17346 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 6.17346 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 4.11572 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 4.11572 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 7.20239 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 7.20239 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 8.23132 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 8.23132 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 9.26025 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 9.26025 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 11.318 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 11.318 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 14.7996)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 10.2891 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 12.3469 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 13.7708)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 12.7422)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 13.3759 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 11.7131)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 10.6846)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 14.4048 8.62695)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 15.4336 9.65576)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 15.4336 8.62695)" fill="#FF9500"/>
          <rect x="24.4149" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="24.4149" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="26.4728" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="27.5016" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="28.5305" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="30.5884" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="32.6461" y="13.7708" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="9.65576" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="29.5594" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="10.6846" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="31.6173" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="11.7134" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="33.675" y="13.7708" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="34.704" y="12.7419" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="23.386" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="23.386" y="8.6272" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="24.4149" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect x="25.4438" y="7.59839" width="1.02891" height="1.02872" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 26.4728 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 27.5016 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 28.5305 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 30.5884 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 32.6461 1.42603)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 5.54102)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 29.5594 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 4.51221)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 31.6173 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 3.48364)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 33.675 1.42603)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 34.704 2.45483)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.386 7.59839)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 23.386 6.56958)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 24.4149 7.59839)" fill="#FF9500"/>
          <rect width="1.02891" height="1.02872" transform="matrix(1 0 0 -1 25.4438 7.59839)" fill="#FF9500"/>
          <path d="M283.31 7.01611L288.142 20.7833L293.106 7.01611H295.787L289.035 24.7878C287.679 28.3619 286.752 29.5202 283.873 29.5202H281.986V27.3691H283.31C285.163 27.3691 285.759 27.0051 286.884 23.8942L280.497 7.01611H283.31Z" fill="white"/>
          <path d="M279.684 18.3673C278.824 22.107 276.21 24.2912 272.337 24.2912C267.44 24.2912 264.196 20.5516 264.196 15.455C264.196 10.4247 267.406 6.68506 272.304 6.68506C276.21 6.68506 278.824 8.90238 279.684 12.6089H276.938C276.342 10.16 274.786 8.83619 272.304 8.83619C268.929 8.83619 266.976 11.6161 266.976 15.455C266.976 19.3271 268.962 22.1401 272.337 22.1401C274.952 22.1401 276.342 20.6509 276.938 18.3673H279.684Z" fill="white"/>
          <path d="M247.478 7.016H250.06V9.86211C250.887 8.24049 252.542 6.68506 255.619 6.68506C259.26 6.68506 261.179 8.77 261.179 12.0794V23.8941H258.598V12.5097C258.598 10.1931 257.506 8.83619 254.726 8.83619C252.145 8.83619 250.06 10.8218 250.06 14.0651V23.8941H247.478V7.016Z" fill="white"/>
          <path d="M228.29 15.455C228.29 10.4247 231.434 6.68506 236.398 6.68506C241.528 6.68506 244.606 10.888 244.374 15.9846H231.07C231.202 19.658 233.122 22.1401 236.531 22.1401C239.211 22.1401 240.634 20.5185 241.296 18.5328H244.043C243.083 21.9084 240.436 24.2912 236.531 24.2912C231.533 24.2912 228.29 20.5516 228.29 15.455ZM241.594 13.9327C241.098 10.888 239.31 8.83619 236.398 8.83619C233.453 8.83619 231.633 10.8549 231.169 13.9327H241.594Z" fill="white"/>
          <path d="M217.91 29.9173C213.64 29.9173 211.092 27.733 210.596 24.8869H213.309C213.74 26.6078 215.163 27.8323 217.91 27.8323C221.02 27.8323 222.576 26.2769 222.576 23.0006V20.7501C221.484 22.7027 219.63 23.6955 217.148 23.6955C212.78 23.6955 209.934 20.1213 209.934 15.1572C209.934 10.2592 212.78 6.68506 217.148 6.68506C219.63 6.68506 221.484 7.81027 222.576 9.76283V7.016H225.157V22.471C225.157 27.1704 222.973 29.9173 217.91 29.9173ZM217.678 21.5444C220.855 21.5444 222.642 18.8638 222.642 15.1572C222.642 11.5168 220.855 8.83619 217.678 8.83619C214.501 8.83619 212.714 11.5168 212.714 15.1572C212.714 18.8638 214.501 21.5444 217.678 21.5444Z" fill="white"/>
          <path d="M206.066 23.8942L203.782 17.3746H193.49L191.174 23.8942H188.261L196.866 0.397217H200.506L209.111 23.8942H206.066ZM194.317 14.9587H202.922L198.62 2.78001L194.317 14.9587Z" fill="white"/>
          <path d="M183.076 19.9951V23.8942H179.149V19.9951H183.076Z" fill="white"/>
          <path d="M175.871 7.01611H177.029V10.7889H175.407C172.594 10.7889 171.072 11.881 171.039 15.3228V23.8942H166.869V7.01611H170.94V10.1601C171.568 8.47226 173.157 7.01611 175.871 7.01611Z" fill="white"/>
          <path d="M147.458 15.4548C147.458 10.4245 150.867 6.68481 156.029 6.68481C161.325 6.68481 164.601 10.8216 164.402 16.3814H151.76C151.926 19.4592 153.514 21.3125 156.129 21.3125C158.214 21.3125 159.372 20.088 159.901 18.5326H164.071C163.145 21.8089 160.398 24.291 156.096 24.291C150.933 24.291 147.458 20.5513 147.458 15.4548ZM160.166 13.767C159.769 11.2849 158.346 9.63021 156.029 9.63021C153.713 9.63021 152.257 11.2518 151.893 13.767H160.166Z" fill="white"/>
          <path d="M135.486 24.2913C131.978 24.2913 129.992 22.0409 129.992 18.566V7.01611H134.162V17.6725C134.162 19.7243 135.023 20.9819 137.174 20.9819C139.259 20.9819 140.781 19.2941 140.781 16.6466V7.01611H144.951V23.8942H140.847V21.1805C139.921 22.8352 138.332 24.2913 135.486 24.2913Z" fill="white"/>
          <path d="M122.571 21.2794C121.579 23.1327 119.791 24.291 117.376 24.291C113.073 24.291 110.26 20.5844 110.26 15.4879C110.26 10.3583 113.073 6.68481 117.376 6.68481C119.791 6.68481 121.579 7.87621 122.571 9.6964V7.01576H126.741V29.5199H122.571V21.2794ZM118.699 21.1801C121.248 21.1801 122.671 18.8635 122.671 15.4879C122.671 12.1454 121.248 9.79568 118.699 9.79568C116.151 9.79568 114.728 12.1454 114.728 15.4879C114.728 18.8635 116.151 21.1801 118.699 21.1801Z" fill="white"/>
          <path d="M99.9904 24.291C94.8277 24.291 91.4189 20.5513 91.4189 15.4548C91.4189 10.4245 94.8277 6.68481 99.9904 6.68481C105.153 6.68481 108.562 10.4245 108.562 15.4548C108.562 20.5513 105.153 24.291 99.9904 24.291ZM99.9904 21.2463C102.638 21.2463 104.127 18.8635 104.127 15.4548C104.127 12.0792 102.638 9.72949 99.9904 9.72949C97.3428 9.72949 95.8536 12.0792 95.8536 15.4548C95.8536 18.8635 97.3428 21.2463 99.9904 21.2463Z" fill="white"/>
          <path d="M73.89 0.397217H78.0599V9.76291C78.9534 8.14129 80.6082 6.68513 83.4874 6.68513C87.1277 6.68513 89.0472 8.90246 89.0472 12.3443V23.8942H84.8442V13.2709C84.8442 11.2191 84.0169 9.96147 81.7665 9.96147C79.6153 9.96147 78.0599 11.6493 78.0599 14.2968V23.8942H73.89V0.397217Z" fill="white"/>
          <path d="M61.2166 24.2912C54.2668 24.2912 49.7329 19.294 49.7329 12.1456C49.7329 4.99724 54.2668 0 61.2166 0C66.8758 0 70.5161 3.57419 71.4759 8.1743H66.8096C66.2139 5.65913 64.2613 3.87204 61.2166 3.87204C56.9144 3.87204 54.3992 7.31384 54.3992 12.1456C54.3992 16.9774 56.9144 20.4192 61.2166 20.4192C64.4599 20.4192 66.2139 18.6321 66.8096 16.1169H71.4759C70.5492 20.717 67.0412 24.2912 61.2166 24.2912Z" fill="white"/>
        </svg>
      </div>

      {/* Navigation Steps */}
      <div className="flex-grow space-y-4 lg:space-y-6 overflow-y-auto custom-scrollbar pr-2 mb-6">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isPerspective = step.id === 5;
          const showOrangeCheck = isCompleted || (isPerspective && isActive);
          
          return (
            <React.Fragment key={step.id}>
              {/* Divider before "Our Perspective" */}
              {step.id === 5 && (
                <div className="border-t border-gray-700 my-4" />
              )}
              <div className="flex items-center justify-between group cursor-default">
                <span 
                  className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                    isPerspective && isActive ? 'text-brand-orange' : isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
                
                {showOrangeCheck && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-orange text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {!showOrangeCheck && (
                  <div className={`w-5 h-5 rounded-full border border-gray-700 transition-colors ${isActive ? 'border-brand-orange/50' : ''}`} />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Video Placeholder */}
      <div className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden relative shadow-2xl border border-gray-800/50 flex-shrink-0">
        <video 
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
            controls
            poster="https://picsum.photos/id/4/800/600"
            playsInline
        >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white/90">
             Introduction
        </div>
      </div>
    </div>
  );
};
