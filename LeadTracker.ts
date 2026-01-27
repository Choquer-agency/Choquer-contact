import { useEffect, useRef, useCallback } from 'react';
import { FormData, StepId } from './types';

const STORAGE_KEY = 'choquer_lead_session';
const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const SYNC_DEBOUNCE = 5000; // 5 seconds

interface LeadSession {
  sessionId: string;
  formData: FormData;
  currentStep: StepId;
  lastActivity: number;
  emailSent: boolean;
}

// Generate a UUID for session tracking
function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get or create session from localStorage
function getOrCreateSession(initialFormData: FormData): LeadSession {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const session = JSON.parse(stored) as LeadSession;
      // Validate the session has required fields
      if (session.sessionId && session.formData) {
        return {
          ...session,
          lastActivity: Date.now(),
        };
      }
    }
  } catch (e) {
    console.warn('Failed to parse stored session:', e);
  }

  // Create new session
  return {
    sessionId: generateSessionId(),
    formData: initialFormData,
    currentStep: 0,
    lastActivity: Date.now(),
    emailSent: false,
  };
}

// Save session to localStorage
function saveSession(session: LeadSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('Failed to save session:', e);
  }
}

// Sync session to backend
async function syncToBackend(
  session: LeadSession,
  trigger?: 'abandoned' | 'completed'
): Promise<boolean> {
  try {
    // Use relative URL - works in both dev (via Vite proxy) and production
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: session.sessionId,
        formData: session.formData,
        currentStep: session.currentStep,
        trigger,
      }),
    });

    if (!response.ok) {
      console.error('Failed to sync lead:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to sync lead to backend:', error);
    return false;
  }
}

interface UseLeadTrackerOptions {
  initialFormData: FormData;
  onRestoreSession?: (data: FormData, step: StepId) => void;
}

interface UseLeadTrackerReturn {
  saveFormData: (data: FormData, step: StepId) => void;
  submitLead: (trigger: 'abandoned' | 'completed') => Promise<void>;
  resetSession: () => void;
  sessionId: string;
}

export function useLeadTracker({
  initialFormData,
  onRestoreSession,
}: UseLeadTrackerOptions): UseLeadTrackerReturn {
  const sessionRef = useRef<LeadSession | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSyncRef = useRef<boolean>(false);
  const isSubmittedRef = useRef<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    const session = getOrCreateSession(initialFormData);
    sessionRef.current = session;
    
    // If we restored a session with data, notify the parent
    if (onRestoreSession && session.formData.email) {
      // Only restore if there's meaningful data (at least email filled)
      onRestoreSession(session.formData, session.currentStep);
    }
    
    // Start inactivity timer
    resetInactivityTimer();

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden && sessionRef.current && !isSubmittedRef.current) {
        // Page is being hidden - sync immediately
        syncToBackend(sessionRef.current);
      }
    };

    // Handle beforeunload - last chance to sync
    const handleBeforeUnload = () => {
      if (sessionRef.current && !isSubmittedRef.current) {
        // Use sendBeacon for reliable delivery on page close
        const blob = new Blob([JSON.stringify({
          sessionId: sessionRef.current.sessionId,
          formData: sessionRef.current.formData,
          currentStep: sessionRef.current.currentStep,
        })], { type: 'application/json' });
        
        navigator.sendBeacon('/api/lead', blob);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, []); // Only run on mount

  const resetInactivityTimer = useCallback(() => {
    if (isSubmittedRef.current) return;

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(async () => {
      if (sessionRef.current && !isSubmittedRef.current && !sessionRef.current.emailSent) {
        // Check if there's any meaningful data to send
        const hasData = sessionRef.current.formData.fullName || 
                       sessionRef.current.formData.email || 
                       sessionRef.current.formData.companyName;
        
        if (hasData) {
          console.log('[LeadTracker] Inactivity timeout - marking as abandoned');
          isSubmittedRef.current = true;
          sessionRef.current.emailSent = true;
          saveSession(sessionRef.current);
          await syncToBackend(sessionRef.current, 'abandoned');
        }
      }
    }, INACTIVITY_TIMEOUT);
  }, []);

  const scheduleDebouncedSync = useCallback(() => {
    if (isSubmittedRef.current) return;

    pendingSyncRef.current = true;

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = setTimeout(async () => {
      if (sessionRef.current && pendingSyncRef.current && !isSubmittedRef.current) {
        pendingSyncRef.current = false;
        await syncToBackend(sessionRef.current);
      }
    }, SYNC_DEBOUNCE);
  }, []);

  const saveFormData = useCallback((data: FormData, step: StepId) => {
    if (!sessionRef.current || isSubmittedRef.current) return;

    // Update session
    sessionRef.current = {
      ...sessionRef.current,
      formData: data,
      currentStep: step,
      lastActivity: Date.now(),
    };

    // Save to localStorage immediately
    saveSession(sessionRef.current);

    // Reset inactivity timer
    resetInactivityTimer();

    // Schedule debounced backend sync
    scheduleDebouncedSync();
  }, [resetInactivityTimer, scheduleDebouncedSync]);

  const submitLead = useCallback(async (trigger: 'abandoned' | 'completed') => {
    if (!sessionRef.current || isSubmittedRef.current) return;

    // Clear timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    isSubmittedRef.current = true;
    sessionRef.current.emailSent = true;
    saveSession(sessionRef.current);

    console.log(`[LeadTracker] Submitting lead as: ${trigger}`);
    await syncToBackend(sessionRef.current, trigger);
  }, []);

  const resetSession = useCallback(() => {
    // Clear the stored session
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove session:', e);
    }

    // Reset refs
    isSubmittedRef.current = false;
    sessionRef.current = {
      sessionId: generateSessionId(),
      formData: initialFormData,
      currentStep: 0,
      lastActivity: Date.now(),
      emailSent: false,
    };

    saveSession(sessionRef.current);
  }, [initialFormData]);

  return {
    saveFormData,
    submitLead,
    resetSession,
    sessionId: sessionRef.current?.sessionId || '',
  };
}
