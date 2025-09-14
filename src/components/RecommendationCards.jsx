import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getRecommendations } from '../data/mockData';

const RecommendationCards = ({ userProfile, onBack }) => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const results = await getRecommendations(userProfile);
        setRecommendations(results);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userProfile]);

  const handleSwipe = (direction) => {
    if (direction === 'next' && currentIndex < recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getScoreStars = (score) => {
    const stars = Math.round(score / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

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
            <span className="text-sm text-gray-500">{t('step', { current: 2, total: 2 })}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full w-full"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          🎉 {t('recommendations')}
        </h2>

        {recommendations.length > 0 && (
          <div className="relative">
            {/* Card Navigation */}
            <div className="flex justify-center mb-4 space-x-2">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Cards Container */}
            <div className="relative h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="card h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                            {recommendations[currentIndex].title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {recommendations[currentIndex].company}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(recommendations[currentIndex].score)}`}>
                            {recommendations[currentIndex].score}%
                          </div>
                          <div className="text-yellow-400 text-sm">
                            {getScoreStars(recommendations[currentIndex].score)}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">📍 {recommendations[currentIndex].location}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          {recommendations[currentIndex].description}
                        </p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {recommendations[currentIndex].skills.map(skill => (
                            <span key={skill} className="chip text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                          💡 {t('whyRecommended')}:
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {recommendations[currentIndex].matchReason}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full mt-4"
                      onClick={() => window.open('https://pminternship.gov.in', '_blank')}
                    >
                      {t('applyNow')} 🚀
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe Controls */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleSwipe('prev')}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full ${
                  currentIndex === 0
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                } transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                {currentIndex + 1} of {recommendations.length}
              </span>
              
              <button
                onClick={() => handleSwipe('next')}
                disabled={currentIndex === recommendations.length - 1}
                className={`p-3 rounded-full ${
                  currentIndex === recommendations.length - 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                } transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecommendationCards;