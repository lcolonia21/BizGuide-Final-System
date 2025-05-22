import { NextResponse } from "next/server";
import { Article } from "../../types";

// Sample articles data with real content
const articles: Article[] = [
  {
    id: 1,
    title: "Complete Guide to Starting a Tech Retail Business",
    description: "Learn everything about opening and managing a successful tech retail store, from location selection to inventory management.",
    image: "/images/tech-retail-guide.svg",
    category: "Technology",
    tags: ["Computer Shop", "Retail", "Technology Business"],
    author: "Michael Chen",
    date: "March 15, 2023",
    readTime: "12 min read",
    featured: true,
    href: "https://www.shopify.com/blog/ecommerce-business-blueprint?term=&adid=733097829761&campaignid=19685663981&utm_medium=cpc&utm_source=google&gad_source=1&gclid=CjwKCAjw8IfABhBXEiwAxRHlsPT3X8TX8PVZ-AFaBHjaMIg_GqM2BOVu5LYVFO9F8kd9uMaMDffCZBoC4cUQAvD_BwE&cmadid=516585705;cmadvertiserid=10730501;cmcampaignid=26990768;cmplacementid=324494758;cmcreativeid=163722649;cmsiteid=5500011",
  },
  {
    id: 2,
    title: "Digital Marketing Strategies for Small Businesses",
    description: "Discover effective digital marketing techniques to grow your business online and attract more customers.",
    image: "/images/marketing-strategy.svg",
    category: "Marketing",
    tags: ["Digital Marketing", "Social Media", "SEO"],
    author: "Sarah Johnson",
    date: "March 10, 2023",
    readTime: "10 min read",
    featured: false,
    href: "https://www.salesforce.com/ap/small-business/marketing/digital-marketing-smb-guide/",
  },
  {
    id: 3,
    title: "Inventory Management for Tech Retailers",
    description: "Learn effective strategies for managing inventory, reducing costs, and maximizing profits in your tech retail business.",
    image: "/images/tech-retail-guide.svg",
    category: "Technology",
    tags: ["Inventory", "Retail", "Management"],
    author: "David Wilson",
    date: "March 5, 2023",
    readTime: "8 min read",
    featured: false,
    href: "https://www.unleashedsoftware.com/blog/retail-inventory-management/",
  },
  {
    id: 4,
    title: "Customer Service Excellence in Tech Retail",
    description: "How to create exceptional customer experiences that drive loyalty and repeat business in your computer shop.",
    image: "/images/computer-shop-setup.svg",
    category: "Customer Service",
    tags: ["Customer Experience", "Retail", "Service"],
    author: "Emily Rodriguez",
    date: "February 28, 2023",
    readTime: "9 min read",
    featured: false,
    href: "https://yellow.ai/en-ph/blog/retail-customer-service/",
  },
  {
    id: 5,
    title: "Financial Planning for New Tech Businesses",
    description: "Essential financial strategies and planning tips for entrepreneurs starting a technology-focused business.",
    image: "/images/marketing-strategy.svg",
    category: "Finance",
    tags: ["Financial Planning", "Startup", "Budgeting"],
    author: "Robert Chang",
    date: "February 20, 2023",
    readTime: "15 min read",
    featured: false,
    href: "https://upmetrics.co/blog/write-financial-section-startup-business-plan",
  },
  {
    id: 6,
    title: "Hiring and Training Staff for Your Computer Shop",
    description: "Best practices for recruiting, hiring, and training knowledgeable staff for your technology retail business.",
    image: "/images/computer-repair.svg",
    category: "Management",
    tags: ["Hiring", "Training", "Team Building"],
    author: "Jessica Martinez",
    date: "February 15, 2023",
    readTime: "11 min read",
    featured: false,
    href: "https://ph.indeed.com/q-computer-shop-staff-jobs.html?vjk=941c18cb78f3207d",
  },
  {
    id: 7,
    title: "Top Tech Retail Trends for 2023",
    description: "Stay ahead of the competition with these emerging trends in the technology retail industry.",
    image: "/images/tech-retail-guide.svg",
    category: "Technology",
    tags: ["Trends", "Technology Business", "Innovation"],
    author: "Alex Thompson",
    date: "February 10, 2023",
    readTime: "14 min read",
    featured: false,
    href: "https://global.hitachi-solutions.com/blog/top-retail-trends/",
  },
  {
    id: 8,
    title: "Effective Store Layout for Computer Shops",
    description: "Optimize your store layout to enhance customer experience and increase sales in your tech retail business.",
    image: "/images/computer-shop-setup.svg",
    category: "Operations",
    tags: ["Store Design", "Retail", "Customer Experience"],
    author: "Lisa Wang",
    date: "February 5, 2023",
    readTime: "9 min read",
    featured: false,
    href: "https://www.coohom.com/article/computer-shop-floor-plan-layout",
  },
  {
    id: 9,
    title: "How to Start a Successful Tutoring Center in Urban Areas",
    description: "A comprehensive guide to establishing a profitable education center business with practical tips for urban locations.",
    image: "/images/success-story.svg",
    category: "Education",
    tags: ["Education", "Tutoring", "Urban Business"],
    author: "Education Business Expert",
    date: "December 5, 2022",
    readTime: "14 min read",
    featured: false,
    href: "https://tutorcruncher.com/blog/how-to-start-a-tutoring-business",
  },
  {
    id: 10,
    title: "",
    description: "Learn how to optimize your budget when starting an education business, with specific strategies for the ₱100,000 range.",
    image: "/images/marketing-strategy.svg",
    category: "Education",
    tags: ["Financial Planning", "Education", "Startup"],
    author: "Financial Advisor for Education",
    date: "November 28, 2022",
    readTime: "12 min read",
    featured: false,
    href: "https://cgu.org/version-test/business-plans?gad_source=1&gclid=CjwKCAjw8IfABhBXEiwAxRHlsPTZ1t4YdtBeMTedas6nkyf-XAaDayVDwr8n4SHGM9CZs9hZibJgPBoCMW8QAvD_BwE",
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  
  let filteredArticles = [...articles];
  
  // Filter by category
  if (category && category !== "All") {
    filteredArticles = filteredArticles.filter(article => article.category === category);
  }
  
  // Filter by tag
  if (tag) {
    filteredArticles = filteredArticles.filter(article => article.tags.includes(tag));
  }
  
  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) || 
      article.description.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Filter featured articles
  if (featured === "true") {
    filteredArticles = filteredArticles.filter(article => article.featured);
  }
  
  return NextResponse.json(filteredArticles);
} 