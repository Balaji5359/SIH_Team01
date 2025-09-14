import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "PM Internship Recommendation",
      subtitle: "Get your top 3–5 internship matches instantly.",
      startNow: "Start Now",
      education: "Education Level",
      skills: "Your Skills",
      sector: "Sector Interest",
      location: "Location Preference",
      remoteOk: "Remote OK",
      next: "Next",
      back: "Back",
      recommendations: "Your Recommendations",
      applyNow: "Apply on PM Internship Portal",
      whyRecommended: "Why recommended",
      needHelp: "Need help? Ask me.",
      darkMode: "Dark Mode",
      language: "Language",
      step: "Step {{current}} of {{total}}",
      educationOptions: {
        undergraduate: "Undergraduate",
        graduate: "Graduate", 
        diploma: "Diploma"
      },
      skillsOptions: ["Python", "HTML", "CSS", "JavaScript", "SQL", "AWS", "React", "Node.js", "Java", "C++"],
      sectorOptions: {
        dataScience: "Data Science",
        webDev: "Web Development",
        cloud: "Cloud Computing",
        cybersecurity: "Cybersecurity",
        content: "Content Writing",
        design: "UI/UX Design"
      }
    }
  },
  hi: {
    translation: {
      title: "पीएम इंटर्नशिप सिफारिश",
      subtitle: "तुरंत अपने टॉप 3-5 इंटर्नशिप मैच पाएं।",
      startNow: "शुरू करें",
      education: "शिक्षा स्तर",
      skills: "आपके कौशल",
      sector: "क्षेत्र रुचि",
      location: "स्थान प्राथमिकता",
      remoteOk: "रिमोट ठीक है",
      next: "आगे",
      back: "पीछे",
      recommendations: "आपकी सिफारिशें",
      applyNow: "पीएम इंटर्नशिप पोर्टल पर आवेदन करें",
      whyRecommended: "क्यों सिफारिश की गई",
      needHelp: "मदद चाहिए? मुझसे पूछें।",
      darkMode: "डार्क मोड",
      language: "भाषा",
      step: "चरण {{current}} का {{total}}",
      educationOptions: {
        undergraduate: "स्नातक",
        graduate: "स्नातकोत्तर",
        diploma: "डिप्लोमा"
      },
      skillsOptions: ["Python", "HTML", "CSS", "JavaScript", "SQL", "AWS", "React", "Node.js", "Java", "C++"],
      sectorOptions: {
        dataScience: "डेटा साइंस",
        webDev: "वेब डेवलपमेंट",
        cloud: "क्लाउड कंप्यूटिंग",
        cybersecurity: "साइबर सिक्यूरिटी",
        content: "कंटेंट राइटिंग",
        design: "UI/UX डिज़ाइन"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;