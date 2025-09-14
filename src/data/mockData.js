export const mockInternships = [
  {
    id: 1,
    title: "Data Science Intern",
    company: "TechCorp India",
    skills: ["Python", "SQL", "Machine Learning"],
    location: "Bengaluru",
    score: 95,
    description: "Work on real-world ML projects with experienced data scientists",
    matchReason: "Perfect match: Python, SQL skills + Bengaluru location"
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "StartupXYZ",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    location: "Mumbai",
    score: 88,
    description: "Build modern web applications using React and latest technologies",
    matchReason: "Strong match: React, JavaScript skills + Web Development interest"
  },
  {
    id: 3,
    title: "Cloud Engineering Intern",
    company: "CloudTech Solutions",
    skills: ["AWS", "Python", "DevOps"],
    location: "Remote",
    score: 82,
    description: "Learn cloud infrastructure and deployment automation",
    matchReason: "Good match: AWS skills + Remote work preference"
  },
  {
    id: 4,
    title: "Cybersecurity Analyst Intern",
    company: "SecureNet",
    skills: ["Network Security", "Python", "Ethical Hacking"],
    location: "Delhi",
    score: 78,
    description: "Protect digital assets and learn security best practices",
    matchReason: "Match: Python skills + Cybersecurity interest"
  },
  {
    id: 5,
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    skills: ["Figma", "Adobe XD", "User Research"],
    location: "Pune",
    score: 75,
    description: "Create beautiful and user-friendly digital experiences",
    matchReason: "Match: Design interest + Creative skills"
  }
];

export const getRecommendations = (userProfile) => {
  // Simulate API call with filtering logic
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockInternships.filter(internship => {
        let score = 0;
        
        // Skills matching
        const matchingSkills = internship.skills.filter(skill => 
          userProfile.skills.includes(skill)
        );
        score += matchingSkills.length * 20;
        
        // Location matching
        if (userProfile.remoteOk || internship.location === userProfile.location || internship.location === "Remote") {
          score += 15;
        }
        
        // Sector matching (simplified)
        const sectorKeywords = {
          dataScience: ["Data Science", "ML", "Analytics"],
          webDev: ["Frontend", "Backend", "Web"],
          cloud: ["Cloud", "AWS", "DevOps"],
          cybersecurity: ["Security", "Cybersecurity"],
          design: ["Design", "UI", "UX"]
        };
        
        const keywords = sectorKeywords[userProfile.sector] || [];
        if (keywords.some(keyword => internship.title.includes(keyword))) {
          score += 25;
        }
        
        return { ...internship, score: Math.min(score, 100) };
      });
      
      // Sort by score and return top 5
      filtered.sort((a, b) => b.score - a.score);
      resolve(filtered.slice(0, 5));
    }, 1000);
  });
};