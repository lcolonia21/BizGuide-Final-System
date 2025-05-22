import { NextResponse } from "next/server";

// Categories for filtering
const categories = ["All", "Technology", "Marketing", "Finance", "Management", "Customer Service", "Operations"];

// Tags for filtering
const tags = [
  "Computer Shop",
  "Retail",
  "Technology Business",
  "Inventory",
  "Management",
  "Digital Marketing",
  "Social Media",
  "SEO",
  "Customer Experience",
  "Service",
  "Financial Planning",
  "Startup",
  "Budgeting",
  "Hiring",
  "Training",
  "Team Building",
  "Trends",
  "Innovation",
  "Store Design"
];

export async function GET() {
  return NextResponse.json({
    categories,
    tags
  });
} 