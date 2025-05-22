import { NextResponse } from "next/server";
import { ResourcesByBusinessType } from "../types";

// Sample business type resources data
const businessResources: ResourcesByBusinessType = {
  "tech-retail": {
    articles: [
      { title: "How to Start a Tech Retail Business", url: "https://www.shopify.com/blog/electronics-store" },
      { title: "Tech Retail Success Factors", url: "https://www.businessnewsdaily.com/10693-start-electronics-business.html" },
    ],
    guides: [
      { title: "Retail Tech Business Plan Template", url: "https://www.template.net/business/plan/electronics-store/" },
      { title: "Sourcing Products for Tech Stores", url: "https://www.shopify.com/blog/product-sourcing" },
    ]
  },
  "computer-shop": {
    articles: [
      { title: "Starting a Computer Shop Business", url: "https://www.entrepreneur.com/business-news/how-to-start-a-computer-repair-service/195668" },
      { title: "Computer Shop Profit Margins", url: "https://smallbusiness.chron.com/profit-margins-computer-industry-21046.html" },
    ],
    guides: [
      { title: "Computer Shop Business Plan", url: "https://www.template.net/business/plan/computer-store/" },
      { title: "IT Service Pricing Guide", url: "https://www.indeed.com/career-advice/finding-a-job/computer-technician-salary" },
    ]
  },
  "coffee-shop": {
    articles: [
      { title: "How to Start a Coffee Shop", url: "https://www.shopify.com/blog/how-to-open-a-coffee-shop" },
      { title: "Coffee Shop Profit Margins", url: "https://pos.toasttab.com/blog/on-the-line/restaurant-profit-margin" },
    ],
    guides: [
      { title: "Coffee Shop Business Plan Template", url: "https://www.template.net/business/plan/coffee-shop/" },
      { title: "Coffee Bean Sourcing Guide", url: "https://www.shopify.com/blog/coffee-beans" },
    ]
  },
  "digital-marketing": {
    articles: [
      { title: "Starting a Digital Marketing Agency", url: "https://blog.hubspot.com/agency/start-a-marketing-agency" },
      { title: "Digital Marketing Agency Models", url: "https://www.wordstream.com/blog/ws/2020/06/11/how-to-start-a-digital-marketing-agency" },
    ],
    guides: [
      { title: "Digital Marketing Agency Business Plan", url: "https://www.template.net/business/plan/digital-marketing-agency/" },
      { title: "Agency Client Acquisition Guide", url: "https://www.semrush.com/blog/client-acquisition-for-digital-marketing-agencies/" },
    ]
  },
  "it-consulting": {
    articles: [
      { title: "How to Start an IT Consulting Business", url: "https://www.indeed.com/career-advice/finding-a-job/how-to-start-it-consulting-business" },
      { title: "IT Consulting Fee Structures", url: "https://www.freshbooks.com/hub/estimates/consultant-fees-hourly" },
    ],
    guides: [
      { title: "IT Consulting Business Plan", url: "https://www.template.net/business/plan/it-consulting/" },
      { title: "Technical Consulting Sales Guide", url: "https://www.indeed.com/career-advice/finding-a-job/it-consultant-skills" },
    ]
  },
  "tech-repair": {
    articles: [
      { title: "Starting a Tech Repair Business", url: "https://www.youtube.com/watch?v=4pKmQpE7vl0" },
      { title: "Tech Repair Pricing Strategy", url: "https://www.businessnewsdaily.com/11095-start-computer-repair-business.html" },
    ],
    guides: [
      { title: "Tech Repair Business Plan", url: "https://www.template.net/business/plan/computer-repair/" },
      { title: "Device Repair Certification Guide", url: "https://www.indeed.com/career-advice/finding-a-job/computer-repair-certification" },
    ]
  },
  "online-education": {
    articles: [
      { title: "How to Start a Tutoring Business or Academic Lessons Service", url: "https://www.ziprecruiter.com/blog/how-to-start-a-tutoring-business/" },
      { title: "Starting a Tutoring Business: The Complete Guide", url: "https://www.youtube.com/watch?v=l_sVKQYWEhs" },
    ],
    guides: [
      { title: "Tutoring Center Business Plan Template", url: "https://www.template.net/business/plan/tutoring-business/" },
      { title: "Education Center Marketing Guide", url: "https://www.indeed.com/career-advice/finding-a-job/how-to-start-tutoring-business" },
    ]
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessType = searchParams.get("type");
  
  if (businessType && businessType in businessResources) {
    return NextResponse.json(businessResources[businessType]);
  }
  
  return NextResponse.json({ message: "Resource not found" }, { status: 404 });
} 