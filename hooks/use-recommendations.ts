import { useState, useCallback } from 'react';

export interface BusinessRecommendation {
  title: string;
  match: string;
  description: string;
  startupCost: string;
  profitMargin: string;
  timeToProfit: string;
  riskLevel: string;
  keyRequirements: string[];
  expertAdvice: string;
}

export interface FormData {
  interests: string[];
  skills: string;
  budget: number[];
  location: string;
  experience: string;
  goals: string;
}

export interface RecommendationFilters {
  category?: string;
  maxBudget?: number;
  minMatch?: number;
}

// Complete business recommendations database
const businessRecommendations: BusinessRecommendation[] = [
  {
    title: "Computer Shop",
    match: "95%",
    description:
      "A computer shop business involves selling computer hardware, software, accessories, and providing repair services. This business aligns well with technology enthusiasts and offers both retail and service revenue streams. With the increasing reliance on computers for work, education, and entertainment, computer shops continue to be relevant despite online competition.",
    startupCost: "₱250,000 - ₱500,000",
    profitMargin: "25-35%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Knowledge of computer hardware and software",
      "Retail space in a high-traffic area (50-100 sqm)",
      "Relationships with distributors like MSI, ASUS, or local suppliers",
      "Technical staff for repairs and customer support",
      "Initial inventory worth ₱150,000 - ₱300,000",
      "Point of sale and inventory management systems"
    ],
    expertAdvice:
      "Focus on creating a unique value proposition that differentiates you from big box retailers. Consider specializing in gaming PCs, business solutions, or repair services to create a niche. Offer services like PC building workshops or tech consultations to create additional revenue streams and customer loyalty.",
  },
  {
    title: "IT Consulting",
    match: "88%",
    description:
      "Provide IT solutions, support, and strategic guidance to businesses. This service-based business has lower startup costs and can be scaled gradually as you acquire more clients. IT consulting is in high demand as businesses of all sizes need technology guidance for operations, security, and digital transformation.",
    startupCost: "₱50,000 - ₱150,000",
    profitMargin: "40-60%",
    timeToProfit: "3-6 months",
    riskLevel: "Low",
    keyRequirements: [
      "Strong IT knowledge in specific domains (cloud, security, ERP, etc.)",
      "Business communication and problem-solving skills",
      "Professional certifications (AWS, Microsoft, Cisco, ITIL)",
      "Home office or small commercial space",
      "Project management and consultation tools",
      "Professional website and marketing materials"
    ],
    expertAdvice:
      "Start by focusing on a specific industry or technology stack where you have the strongest expertise. Building long-term relationships with clients will provide stable recurring revenue through maintenance contracts. Consider forming partnerships with complementary service providers to offer comprehensive solutions.",
  },
  {
    title: "Tech Repair Service",
    match: "82%",
    description:
      "Offer repair services for computers, smartphones, tablets, and other electronic devices. This business has moderate startup costs and growing demand due to the increasing cost of electronics and sustainability concerns. With the right tools and expertise, you can generate revenue quickly with minimal inventory.",
    startupCost: "₱100,000 - ₱250,000",
    profitMargin: "30-45%",
    timeToProfit: "6-12 months",
    riskLevel: "Low to Moderate",
    keyRequirements: [
      "Technical repair skills for various devices",
      "Small retail or service location (30-50 sqm)",
      "Diagnostic equipment and specialized repair tools (₱50,000 - ₱100,000)",
      "Inventory of common replacement parts",
      "Customer management system for tracking repairs",
      "Repair certification is beneficial (e.g., Apple certification)"
    ],
    expertAdvice:
      "Consider offering mobile repair services where you go to the customer. Focus on speed and quality of service as key differentiators. Developing relationships with businesses for B2B repairs can provide steady, higher-value contracts. Offer data recovery and security services as premium options.",
  },
  {
    title: "Coffee Shop",
    match: "89%",
    description:
      "A coffee shop offers a cozy atmosphere for customers to enjoy premium coffee, teas, and light food items. This business thrives on building a loyal customer base and creating a unique ambiance. Despite competition, specialized coffee shops with strong concepts continue to attract customers seeking quality and experience.",
    startupCost: "₱500,000 - ₱1,500,000",
    profitMargin: "20-30%",
    timeToProfit: "18-24 months",
    riskLevel: "Moderate to High",
    keyRequirements: [
      "Prime location with good foot traffic",
      "Barista training and specialty coffee knowledge",
      "Quality equipment (espresso machine, grinders) costing ₱250,000+",
      "Relationships with quality bean suppliers",
      "Interior design and comfortable seating (₱150,000+)",
      "Food safety permits and business licenses"
    ],
    expertAdvice:
      "Focus on creating a distinctive atmosphere and consistently high-quality products. Consider offering specialty coffee options and creating a loyalty program to encourage repeat customers. Develop a strong social media presence with Instagram-worthy presentation. Partner with local bakeries or food producers to reduce kitchen costs.",
  },
  {
    title: "Online Education Platform",
    match: "95%",
    description:
      "Create an educational platform or tutoring center providing specialized courses online or in hybrid formats. With the growing demand for flexible learning options and specialized skills training, this business model offers excellent scalability and can target various age groups and professional levels.",
    startupCost: "₱150,000 - ₱500,000",
    profitMargin: "40-70%",
    timeToProfit: "8-16 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Educational expertise in high-demand subjects",
      "Learning Management System (LMS) or educational technology",
      "Content creation capabilities (video, interactive materials)",
      "Marketing strategy for student acquisition",
      "Qualified instructors or teaching staff",
      "Payment processing and student management systems"
    ],
    expertAdvice:
      "Focus on creating specialized courses in areas with high demand and limited competition. Develop a strong curriculum with clear learning outcomes and certification where possible. Consider offering both self-paced and live instruction options to maximize flexibility. Build partnerships with employers or professional organizations for credibility and student referrals.",
  },
  {
    title: "Healthcare Consultancy",
    match: "79%",
    description:
      "Provide specialized consulting services to healthcare providers, focusing on operational efficiency, compliance, technology integration, and patient experience. This business leverages expertise in healthcare systems to help clinics, hospitals, and practitioners optimize their operations.",
    startupCost: "₱100,000 - ₱200,000",
    profitMargin: "45-65%",
    timeToProfit: "8-12 months",
    riskLevel: "Low to Moderate",
    keyRequirements: [
      "Experience in healthcare administration or clinical practice",
      "Knowledge of healthcare regulations and compliance standards",
      "Strong network of industry contacts",
      "Problem-solving and analytical skills",
      "Professional services agreements and legal templates",
      "Project management and reporting tools"
    ],
    expertAdvice:
      "Build credibility through case studies and testimonials. Consider obtaining relevant healthcare management certifications. Focus on a specific healthcare segment initially (e.g., dental practices, outpatient clinics) to build specialized expertise. Create packaged service offerings with clear ROI for clients.",
  },
  {
    title: "Food Truck",
    match: "85%",
    description:
      "A mobile food business offering specialized cuisine. Food trucks combine lower overhead than restaurants with the flexibility to test different locations and events. This model allows for creative culinary concepts with lower risk and the ability to follow customer demand to different areas.",
    startupCost: "₱450,000 - ₱1,200,000",
    profitMargin: "20-40%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Culinary skills and food preparation knowledge",
      "Food truck vehicle and equipment (₱350,000 - ₱800,000)",
      "Permits and licenses for mobile food service",
      "Commissary kitchen for preparation (owned or rented)",
      "Food safety certification",
      "Social media marketing skills for location announcements"
    ],
    expertAdvice:
      "Develop a signature dish or concept that stands out in a crowded market. Research high-traffic locations and events carefully before committing. Consider seasonal menu rotations to keep customers interested. Build a strong social media presence for communicating your location and specials. Partner with breweries, office complexes, or events that don't offer food services.",
  },
  {
    title: "Digital Marketing Agency",
    match: "91%",
    description:
      "Help businesses improve their online presence through SEO, social media management, content creation, and paid advertising campaigns. With businesses increasingly shifting marketing budgets to digital channels, this service business has high demand across industries and company sizes.",
    startupCost: "₱50,000 - ₱200,000",
    profitMargin: "40-65%",
    timeToProfit: "3-8 months",
    riskLevel: "Low",
    keyRequirements: [
      "Digital marketing knowledge across multiple platforms",
      "Understanding of analytics and performance optimization",
      "Content creation and copywriting abilities",
      "Client management and communication skills",
      "Project management and reporting tools",
      "Portfolio of successful campaigns (can be built through initial discounted work)"
    ],
    expertAdvice:
      "Specialize in a specific industry or service to differentiate yourself in a competitive market. Document your successes with case studies and tangible metrics. Consider a retainer model for stable monthly income. Stay current with platform changes and algorithm updates through continuous learning.",
  },
  {
    title: "Personal Fitness Training",
    match: "78%",
    description:
      "Offer personalized fitness training services either online or in-person. This business can start small and scale based on client demand and your availability. The growing health consciousness and interest in personalized fitness solutions make this a viable business with minimal startup requirements.",
    startupCost: "₱30,000 - ₱100,000",
    profitMargin: "70-90%",
    timeToProfit: "1-3 months",
    riskLevel: "Very Low",
    keyRequirements: [
      "Fitness knowledge and certified training credentials",
      "Communication and motivational skills",
      "Basic fitness equipment for demonstrations",
      "Client management and scheduling system",
      "Liability insurance",
      "Physical space or arrangements with existing gyms"
    ],
    expertAdvice:
      "Consider specializing in a particular demographic or fitness goal (weight loss, strength training, senior fitness). Creating online programs and group sessions can help scale beyond one-on-one training limitations. Building before-and-after case studies will help attract new clients. Partner with nutrition experts to offer comprehensive wellness packages.",
  },
  {
    title: "Sustainable Retail Store",
    match: "83%",
    description:
      "A retail business focusing on environmentally friendly and sustainable products across categories like home goods, personal care, fashion, and gifts. This business caters to the growing market of eco-conscious consumers seeking alternatives to conventional products with environmental impacts.",
    startupCost: "₱300,000 - ₱600,000",
    profitMargin: "35-50%",
    timeToProfit: "12-24 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Knowledge of sustainable products, materials, and certifications",
      "Retail space in an area with environmentally conscious demographics",
      "Relationships with ethical and sustainable suppliers",
      "Inventory management system for product tracking",
      "Strong brand identity aligned with sustainability values",
      "Online presence for education and e-commerce"
    ],
    expertAdvice:
      "Educate customers about the benefits and impact of sustainable products through in-store displays, workshops, and digital content. Verify supplier claims about sustainability to maintain credibility. Consider a hybrid model with both physical and online presence to reach more customers. Create a community around your brand through events and partnerships with environmental initiatives.",
  },
];

// Map of business categories to relevant business types
const categoryToBusinessMap: Record<string, string[]> = {
  "Technology": ["Computer Shop", "IT Consulting", "Tech Repair Service", "Online Education Platform"],
  "Food & Beverage": ["Coffee Shop", "Food Truck"],
  "Retail": ["Computer Shop", "Sustainable Retail Store"],
  "Professional Services": ["IT Consulting", "Healthcare Consultancy", "Digital Marketing Agency"],
  "Health & Wellness": ["Personal Fitness Training", "Healthcare Consultancy"],
  "Education": ["Online Education Platform"],
  "Entertainment": [],
  "Manufacturing": [],
  "Construction": [],
  "Transportation": [],
};

// Map of experience levels to numeric values
const experienceValues: Record<string, number> = {
  "none": 0,
  "some": 1,
  "moderate": 2,
  "experienced": 3,
};

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>([]);
  const [filters, setFilters] = useState<RecommendationFilters>({});

  const getRecommendations = useCallback((formData: FormData) => {
    // Extract budget value
    const budget = formData.budget[0];
    
    // Get all business titles that match selected categories
    const relevantBusinessTitles = new Set<string>();
    formData.interests.forEach(interest => {
      categoryToBusinessMap[interest]?.forEach(business => {
        relevantBusinessTitles.add(business);
      });
    });
    
    // Score each business
    const scoredRecommendations = businessRecommendations.map(business => {
      let score = 0;
      
      // Category match (0-40 points)
      if (relevantBusinessTitles.has(business.title)) {
        score += 40;
      }
      
      // Budget match (0-30 points)
      const costRange = business.startupCost.replace(/[₱,]/g, '').split(' - ');
      const minCost = parseInt(costRange[0]);
      const maxCost = parseInt(costRange[1]);
      
      if (budget >= minCost && (budget >= maxCost || budget >= minCost * 1.5)) {
        score += 30;
      } else if (budget >= minCost) {
        score += 20;
      } else if (budget >= minCost * 0.7) {
        score += 10;
      }
      
      // Location match (0-15 points)
      if (formData.location) {
        const lowRiskBusinesses = ["IT Consulting", "Online Education Platform", "Digital Marketing Agency", "Personal Fitness Training"];
        const onlineBusinesses = ["Online Education Platform", "Digital Marketing Agency"];
        
        if (formData.location === "Online Only" && onlineBusinesses.includes(business.title)) {
          score += 15;
        } else if (formData.location === "Urban" && business.title !== "Online Education Platform") {
          score += 15;
        } else if (formData.location === "Suburban" && !onlineBusinesses.includes(business.title)) {
          score += 10;
        } else if (formData.location === "Rural" && lowRiskBusinesses.includes(business.title)) {
          score += 5;
        }
      }
      
      // Experience match (0-15 points)
      if (formData.experience) {
        const experienceLevel = experienceValues[formData.experience];
        const riskLevels: Record<string, number> = {
          "Very Low": 0,
          "Low": 1,
          "Low to Moderate": 2,
          "Moderate": 3,
          "Moderate to High": 4,
          "High": 5,
        };
        
        const businessRisk = riskLevels[business.riskLevel] || 3;
        
        // Higher experience = more points for higher risk businesses
        if (experienceLevel >= businessRisk) {
          score += 15;
        } else if (experienceLevel + 1 >= businessRisk) {
          score += 10;
        } else {
          score += 5;
        }
      }
      
      // Convert score to match percentage (max score is 100)
      const matchPercentage = `${Math.min(Math.round(score), 98)}%`;
      
      return {
        ...business,
        match: matchPercentage,
        score: score
      };
    });
    
    // Sort by score (highest first) and remove the score property
    const sortedRecommendations = scoredRecommendations
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map(({ score, ...rest }) => rest);
    
    // Apply any filters
    let filteredRecommendations = sortedRecommendations;
    
    if (filters.category) {
      filteredRecommendations = filteredRecommendations.filter(business => 
        categoryToBusinessMap[filters.category!]?.includes(business.title)
      );
    }
    
    if (filters.maxBudget) {
      filteredRecommendations = filteredRecommendations.filter(business => {
        const costRange = business.startupCost.replace(/[₱,]/g, '').split(' - ');
        const minCost = parseInt(costRange[0]);
        return minCost <= filters.maxBudget!;
      });
    }
    
    if (filters.minMatch) {
      filteredRecommendations = filteredRecommendations.filter(business => {
        const matchPercent = parseInt(business.match.replace('%', ''));
        return matchPercent >= filters.minMatch!;
      });
    }
    
    // Return the top recommendations
    setRecommendations(filteredRecommendations);
    return filteredRecommendations;
  }, [filters]);

  const updateFilters = useCallback((newFilters: RecommendationFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    recommendations,
    getRecommendations,
    filters,
    updateFilters
  };
} 