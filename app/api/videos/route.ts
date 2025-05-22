import { NextResponse } from "next/server";
import { VideoMapping } from "../types";

// Sample YouTube video data
const videoMappings: VideoMapping = {
  "how to start tech retail store business": [
    "TXKc-_BATUE", // How to Start a Tech Retail Store
    "kTbYBnXQjIU"  // Tech Retail Business Tips
  ],
  "how to start computer shop business": [
    "pPBdvpx9hhw", // Computer Shop Business Guide
    "jLfEnL_fTG4"  // Starting a Computer Shop Business
  ],
  "how to start coffee shop business": [
    "Rr8JydYF5qo", // Coffee Shop Startup Guide
    "j1ZBQvpNu2c"  // How to Start a Coffee Shop
  ],
  "how to start digital marketing agency": [
    "S96Kq6YF0Xg", // Digital Marketing Agency Guide
    "Ap5tX1xZS9Y"  // Building a Digital Marketing Agency
  ],
  "how to start IT consulting business": [
    "VaGfYSEAUEg", // IT Consulting Startup Guide
    "2KtE1EXnz4g"  // Growing Your IT Consulting
  ],
  "how to start tech repair business": [
    "4pKmQpE7vl0", // Tech Repair Business Guide
    "wBmXJ5lKKLU"  // Phone Repair Shop Setup Guide
  ],
  "how to start education center business": [
    "OEjj0UyCjz8", // Start a Tutoring Business Guide
    "GdMUqvQv8bU"  // Education Business Setup
  ],
  "how to start tutoring center": [
    "t_LmgXA8xOA", // Starting a Tutoring Center
    "7MHX2TuHbFk"  // Tutoring Company Business Guide
  ]
};

// Default video IDs in case the search query doesn't match
const defaultVideos = [
  "NrU_xJZGnEk", 
  "z3PCCeTHZJo", 
  "WbVP9X1h8aA"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const indexParam = searchParams.get("index") || "0";
  const index = parseInt(indexParam, 10);
  
  // In a real application, this would connect to the YouTube API
  // For now, we're using the mock data
  
  if (query) {
    const videos = videoMappings[query] || defaultVideos;
    const videoId = videos[index % videos.length];
    
    return NextResponse.json({ videoId });
  }
  
  return NextResponse.json({ videoId: defaultVideos[0] });
} 