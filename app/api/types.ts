export interface Guide {
  id: string;
  title: string;
  overview: string;
  marketAnalysis?: {
    targetAudience?: string;
    marketSize?: string;
    competitors?: string;
    trends?: string;
  };
  startupRequirements?: {
    legal?: string;
    equipment?: string;
    staffing?: string;
    location?: string;
  };
  financialPlan?: {
    startupCosts?: string;
    monthlyExpenses?: string;
    pricingStrategy?: string;
    breakEvenAnalysis?: string;
    fundingOptions?: string;
  };
  marketingStrategy?: {
    branding?: string;
    onlineMarketing?: string;
    offlineMarketing?: string;
    customerRetention?: string;
  };
}

export interface LearningResource {
  id: string;
  title: string;
  category: "business-planning" | "marketing" | "operations";
  description: string;
  url: string;
  type: "guide" | "article" | "video";
}

export interface ResourcesByBusinessType {
  [businessType: string]: {
    articles?: { title: string; url: string; }[];
    guides?: { title: string; url: string; }[];
  }
}

export interface VideoMapping {
  [searchQuery: string]: string[];
}

export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  href: string;
}

export interface VideoTutorial {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  instructor: string;
  date: string;
  href: string;
} 