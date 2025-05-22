"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { LearningResource } from "../api/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearningResourcesPage() {
  const [resources, setResources] = useState<{ 
    "business-planning": LearningResource[], 
    "marketing": LearningResource[], 
    "operations": LearningResource[] 
  }>({
    "business-planning": [],
    "marketing": [],
    "operations": []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/learning-resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        
        const data: LearningResource[] = await response.json();
        
        // Group resources by category
        const grouped = data.reduce((acc, resource) => {
          if (!acc[resource.category]) {
            acc[resource.category] = [];
          }
          
          acc[resource.category].push(resource);
          return acc;
        }, {} as Record<string, LearningResource[]>);
        
        setResources({
          "business-planning": grouped["business-planning"] || [],
          "marketing": grouped["marketing"] || [],
          "operations": grouped["operations"] || []
        });
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const categoryInfo = {
    "business-planning": {
      title: "Business Planning",
      description: "Essential guides for creating a solid business plan"
    },
    "marketing": {
      title: "Marketing Strategies",
      description: "Effective marketing approaches for new businesses"
    },
    "operations": {
      title: "Operations",
      description: "Guides for efficient business operations"
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-10">Learning Resources</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-card border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></CardTitle>
                <CardDescription className="h-5 w-3/4 mt-2 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-9 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(resources).map(([category, categoryResources]) => (
            <Card key={category} className="bg-card border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{categoryInfo[category as keyof typeof categoryInfo].title}</CardTitle>
                <CardDescription>{categoryInfo[category as keyof typeof categoryInfo].description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  {categoryResources.slice(0, 3).map((resource) => (
                    <Link 
                      key={resource.id} 
                      href={resource.url}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ChevronRight className="h-4 w-4" />
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/resources/${category}`}>
                    View All Resources
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 