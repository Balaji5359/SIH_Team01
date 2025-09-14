import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const InputForm = ({ onSubmit, onBack }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    sector: '',
    location: '',
    remoteOk: false
  });
  const [isListening, setIsListening] = useState(false);

  const skillsOptions = t('skillsOptions', { returnObjects: true });
  const educationOptions = t('educationOptions', { returnObjects: true });
  const sectorOptions = t('sectorOptions', { returnObjects: true });

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, location: transcript }));
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  const isFormValid = formData.education && formData.skills.length > 0 && formData.sector && (formData.location || formData.remoteOk);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen p-4 pt-20"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-500">{t('step', { current: 1, total: 2 })}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full w-1/2"></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Education */}
          <div className="card">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              📚 {t('education')}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(educationOptions).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setFormData(prev => ({ ...prev, education: key }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.education === key
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              💻 {t('skills')}
            </label>
            <div className="flex flex-wrap gap-2">
              {skillsOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`chip transition-all ${
                    formData.skills.includes(skill)
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-primary-200 dark:hover:bg-primary-800'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Sector */}
          <div className="card">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              🎯 {t('sector')}
            </label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select sector...</option>
              {Object.entries(sectorOptions).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="card">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              📍 {t('location')}
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter city..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`p-3 rounded-lg border-2 ${
                  isListening 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-300 hover:border-primary-500'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.remoteOk}
                onChange={(e) => setFormData(prev => ({ ...prev, remoteOk: e.target.checked }))}
                className="w-4 h-4 text-primary-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('remoteOk')}</span>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(formData)}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              isFormValid
                ? 'btn-primary'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('next')} →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default InputForm;