import { NextResponse } from "next/server";
import { VideoTutorial } from "../../types";

// Sample video tutorials data with real YouTube videos
const videoTutorials: VideoTutorial[] = [
  {
    id: 1,
    title: "Setting Up Your Computer Shop: Location, Layout, and Equipment",
    description: "A comprehensive guide to planning and setting up your computer shop for maximum efficiency and customer appeal.",
    thumbnail: "/images/computer-shop-setup.svg",
    duration: "25:14",
    instructor: "Mark Johnson",
    date: "March 12, 2023",
    href: "https://www.youtube.com/watch?v=RnM3u99xIf4&pp=ygU-U2V0dGluZyBVcCBZb3VyIENvbXB1dGVyIFNob3A6IExvY2F0aW9uLCBMYXlvdXQsIGFuZCBFcXVpcG1lbnQ%3D",
  },
  {
    id: 2,
    title: "Computer Repair Basics: Skills Every Shop Owner Should Know",
    description: "Essential computer repair skills and diagnostics that will help you provide better service to your customers.",
    thumbnail: "/images/computer-repair.svg",
    duration: "32:45",
    instructor: "Tech with Tim",
    date: "March 5, 2023",
    href: "https://www.youtube.com/watch?v=HB4I2CgkcCo&pp=ygU7Q29tcHV0ZXIgUmVwYWlyIEJhc2ljczogU2tpbGxzIEV2ZXJ5IFNob3AgT3duZXIgU2hvdWxkIEtub3fSBwkJfgkBhyohjO8%3D",
  },
  {
    id: 3,
    title: "Pricing Strategies for Computer Products and Services",
    description: "How to develop effective pricing strategies that maximize profits while remaining competitive in your market.",
    thumbnail: "/images/marketing-strategy.svg",
    duration: "18:30",
    instructor: "Business Insights",
    date: "February 28, 2023",
    href: "https://www.youtube.com/watch?v=Esqu08CSOwE&pp=ygU1UHJpY2luZyBTdHJhdGVnaWVzIGZvciBDb21wdXRlciBQcm9kdWN0cyBhbmQgU2VydmljZXPSBwkJfgkBhyohjO8%3D",
  },
  {
    id: 4,
    title: "Building Supplier Relationships in the Tech Industry",
    description: "Tips for establishing strong relationships with suppliers to secure better prices and reliable inventory.",
    thumbnail: "/images/tech-retail-guide.svg",
    duration: "22:10",
    instructor: "Supply Chain Experts",
    date: "February 20, 2023",
    href: "https://www.youtube.com/watch?v=XibS0susCP8&pp=ygU0QnVpbGRpbmcgU3VwcGxpZXIgUmVsYXRpb25zaGlwcyBpbiB0aGUgVGVjaCBJbmR1c3RyeQ%3D%3D",
  },
  {
    id: 5,
    title: "Tech Retail Marketing Tactics",
    description: "Effective marketing strategies specifically designed for computer shops and tech retail businesses.",
    thumbnail: "/images/marketing-strategy.svg",
    duration: "27:45",
    instructor: "Marketing Pro",
    date: "February 15, 2023",
    href: "https://www.youtube.com/watch?v=Ktoon-r7JAw&pp=ygUdVGVjaCBSZXRhaWwgTWFya2V0aW5nIFRhY3RpY3PSBwkJfgkBhyohjO8%3D",
  },
  {
    id: 6,
    title: "Customer Service Training for Tech Staff",
    description: "How to train your technical staff to provide excellent customer service while solving technical problems.",
    thumbnail: "/images/computer-repair.svg",
    duration: "19:22",
    instructor: "Service Excellence",
    date: "February 10, 2023",
    href: "https://www.youtube.com/watch?v=SdCTWL-Vr8A&pp=ygUoQ3VzdG9tZXIgU2VydmljZSBUcmFpbmluZyBmb3IgVGVjaCBTdGFmZg%3D%3D",
  },
  {
    id: 7,
    title: "How to Start a Tutoring Business",
    description: "Learn the essential steps to start and grow a successful tutoring business, from defining your niche to marketing your services.",
    thumbnail: "/images/success-story.svg",
    duration: "21:36",
    instructor: "Education Entrepreneurs",
    date: "January 15, 2023",
    href: "https://www.youtube.com/watch?v=J667w0KE9wU&pp=ygUgSG93IHRvIFN0YXJ0IGEgVHV0b3JpbmcgQnVzaW5lc3M%3D",
  },
  {
    id: 8,
    title: "Starting an Education Center: Complete Business Guide",
    description: "A comprehensive overview of what it takes to open and operate a successful education center in an urban location.",
    thumbnail: "/images/computer-shop-setup.svg",
    duration: "26:42",
    instructor: "Business Education Channel",
    date: "January 5, 2023",
    href: "https://www.youtube.com/watch?v=HCi8lZSiVtM&pp=ygU1U3RhcnRpbmcgYW4gRWR1Y2F0aW9uIENlbnRlcjogQ29tcGxldGUgQnVzaW5lc3MgR3VpZGU%3D",
  },
  {
    id: 9,
    title: "Marketing Strategies for Education Businesses",
    description: "Effective marketing tactics specifically designed for tutoring centers and educational businesses to attract more students.",
    thumbnail: "/images/marketing-strategy.svg",
    duration: "18:15",
    instructor: "Education Marketing Pro",
    date: "December 12, 2022",
    href: "https://www.youtube.com/watch?v=amvQWl--uJw&pp=ygUtTWFya2V0aW5nIFN0cmF0ZWdpZXMgZm9yIEVkdWNhdGlvbiBCdXNpbmVzc2Vz",
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  
  let filteredVideos = [...videoTutorials];
  
  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredVideos = filteredVideos.filter(video => 
      video.title.toLowerCase().includes(searchTerm) || 
      video.description.toLowerCase().includes(searchTerm) ||
      video.instructor.toLowerCase().includes(searchTerm)
    );
  }
  
  return NextResponse.json(filteredVideos);
} 