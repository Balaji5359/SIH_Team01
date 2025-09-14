import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './i18n';
import LandingPage from './components/LandingPage';
import InputForm from './components/InputForm';
import RecommendationCards from './components/RecommendationCards';
import ChatAssistant from './components/ChatAssistant';
import Header from './components/Header';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userProfile, setUserProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode class and save preference
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleStart = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData) => {
    setUserProfile(formData);
    setCurrentStep('recommendations');
  };

  const handleBack = () => {
    if (currentStep === 'recommendations') {
      setCurrentStep('form');
    } else if (currentStep === 'form') {
      setCurrentStep('landing');
    }
  };

  return (
    <div className="min-h-screen">
      {currentStep !== 'landing' && (
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      
      <AnimatePresence mode="wait">
        {currentStep === 'landing' && (
          <LandingPage key="landing" onStart={handleStart} />
        )}
        
        {currentStep === 'form' && (
          <InputForm 
            key="form" 
            onSubmit={handleFormSubmit} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'recommendations' && userProfile && (
          <RecommendationCards 
            key="recommendations"
            userProfile={userProfile} 
            onBack={handleBack}
          />
        )}
      </AnimatePresence>

      <ChatAssistant />
    </div>
  );
}

export default App;