import { NextResponse } from "next/server";
import { LearningResource } from "../types";

// Sample learning resources data
const learningResources: LearningResource[] = [
  // Business Planning Resources
  {
    id: "bp-template",
    title: "Business Plan Template",
    category: "business-planning",
    description: "Comprehensive template for creating a professional business plan",
    url: "https://www.business-in-a-box.com/templates/business-plan-kit/?q=business-plan&s=google&c=world2&gad_source=1&gclid=CjwKCAjw8IfABhBXEiwAxRHlsOfB95UUaFVm4Rc0DhZ4C6M69UncmG7DaONGlC2M3qKDoHoc7hydtRoCl7oQAvD_BwE",
    type: "guide"
  },
  {
    id: "financial-projections",
    title: "Creating Financial Projections",
    category: "business-planning",
    description: "Step-by-step guide to creating accurate financial projections",
    url: "/resources/business-planning/financial-projections",
    type: "guide"
  },
  {
    id: "market-analysis",
    title: "Market Analysis Guide",
    category: "business-planning",
    description: "How to conduct effective market research and analysis",
    url: "/resources/business-planning/market-analysis",
    type: "guide"
  },
  
  // Marketing Resources
  {
    id: "digital-marketing",
    title: "Digital Marketing Basics",
    category: "marketing",
    description: "Introduction to digital marketing channels and strategies",
    url: "/resources/marketing/digital-basics",
    type: "guide"
  },
  {
    id: "social-media",
    title: "Social Media Strategy",
    category: "marketing",
    description: "Building an effective social media presence for your business",
    url: "/resources/marketing/social-media",
    type: "guide"
  },
  {
    id: "local-marketing",
    title: "Local Marketing Tactics",
    category: "marketing",
    description: "Strategies for marketing your business locally",
    url: "/resources/marketing/local-tactics",
    type: "guide"
  },
  
  // Operations Resources
  {
    id: "inventory-management",
    title: "Inventory Management",
    category: "operations",
    description: "Best practices for managing inventory efficiently",
    url: "/resources/operations/inventory",
    type: "guide"
  },
  {
    id: "hiring-guide",
    title: "Hiring Your First Employee",
    category: "operations",
    description: "Guide to hiring and onboarding your first team members",
    url: "/resources/operations/hiring",
    type: "guide"
  },
  {
    id: "customer-service",
    title: "Customer Service Excellence",
    category: "operations",
    description: "Building outstanding customer service processes",
    url: "/resources/operations/customer-service",
    type: "guide"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  if (category) {
    const filteredResources = learningResources.filter(
      resource => resource.category === category
    );
    return NextResponse.json(filteredResources);
  }
  
  return NextResponse.json(learningResources);
} 